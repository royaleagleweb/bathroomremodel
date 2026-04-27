"""High-level image and video swap pipelines."""
from __future__ import annotations

import shutil
import tempfile
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, Optional, Sequence

import cv2
import numpy as np
from tqdm import tqdm

from . import core, matching, video
from .core import SourceFace


MatchMode = str  # "all" | "position" | "reference"


@dataclass
class SwapConfig:
    mode: MatchMode = "reference"
    enhance: bool = False
    prefer_gpu: bool = True
    similarity_threshold: float = 0.35
    # When True, an unmatched target face is swapped with the first source as a fallback.
    fallback_to_first: bool = False


def _build_pairs(target_faces, sources: Sequence[SourceFace], cfg: SwapConfig):
    if not target_faces or not sources:
        return []
    if cfg.mode == "all":
        return matching.match_all_to_one(target_faces, sources[0])
    if cfg.mode == "position":
        return matching.match_by_position(target_faces, sources)
    if cfg.mode == "reference":
        refs = [(s, s) for s in sources]
        pairs = matching.match_by_reference(target_faces, refs, threshold=cfg.similarity_threshold)
        if cfg.fallback_to_first:
            matched = {id(tf) for tf, _ in pairs}
            for tf in target_faces:
                if id(tf) not in matched:
                    pairs.append((tf, sources[0]))
        return pairs
    raise ValueError(f"unknown match mode: {cfg.mode}")


def swap_image_array(
    target: np.ndarray,
    sources: Sequence[SourceFace],
    cfg: SwapConfig,
) -> np.ndarray:
    target_faces = core.detect_faces(target, prefer_gpu=cfg.prefer_gpu)
    pairs = _build_pairs(target_faces, sources, cfg)
    result = target
    for tf, src in pairs:
        result = core.swap_one(result, tf, src, prefer_gpu=cfg.prefer_gpu)
    if cfg.enhance and pairs:
        result = core.enhance_face_regions(result, [p[0] for p in pairs], prefer_gpu=cfg.prefer_gpu)
    return result


def swap_image_file(
    target_path: Path,
    source_paths: Sequence[Path],
    output_path: Path,
    cfg: SwapConfig,
) -> Path:
    img = cv2.imread(str(target_path))
    if img is None:
        raise ValueError(f"could not read target image: {target_path}")
    sources = core.load_source_faces(list(source_paths), prefer_gpu=cfg.prefer_gpu)
    out = swap_image_array(img, sources, cfg)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    cv2.imwrite(str(output_path), out)
    return output_path


def swap_video_file(
    target_video: Path,
    source_paths: Sequence[Path],
    output_path: Path,
    cfg: SwapConfig,
    keep_audio: bool = True,
    workdir: Optional[Path] = None,
    progress: bool = True,
) -> Path:
    """Extract frames, swap each, reassemble. Identity is matched per-frame
    by embedding similarity (in `reference` mode) so the same source keeps
    landing on the same person across cuts."""
    info = video.probe(target_video)
    if info.fps <= 0:
        raise ValueError(f"could not read fps from {target_video}")

    sources = core.load_source_faces(list(source_paths), prefer_gpu=cfg.prefer_gpu)

    cleanup = workdir is None
    workdir = Path(workdir) if workdir else Path(tempfile.mkdtemp(prefix="faceswap_"))
    in_dir = workdir / "in"
    out_dir = workdir / "out"
    in_dir.mkdir(parents=True, exist_ok=True)
    out_dir.mkdir(parents=True, exist_ok=True)

    try:
        video.extract_frames(target_video, in_dir)
        frames = sorted(in_dir.glob("frame_*.png"))
        iterator: Iterable[Path] = frames
        if progress:
            iterator = tqdm(frames, desc="swapping", unit="frame")

        for frame_path in iterator:
            img = cv2.imread(str(frame_path))
            if img is None:
                continue
            swapped = swap_image_array(img, sources, cfg)
            cv2.imwrite(str(out_dir / frame_path.name), swapped)

        audio_source = target_video if (keep_audio and info.has_audio) else None
        video.assemble_video(out_dir, info.fps, output_path, audio_source=audio_source)
    finally:
        if cleanup:
            shutil.rmtree(workdir, ignore_errors=True)

    return output_path
