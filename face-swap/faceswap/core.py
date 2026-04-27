"""Thin wrappers around the InsightFace analyzer/swapper and the optional enhancer."""
from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, Optional, Sequence

import cv2
import numpy as np

from . import models


@dataclass
class SourceFace:
    """A face cut out of a reference image. Carries the embedding used for matching."""

    label: str
    image_path: Path
    face: object  # insightface Face — kept opaque to avoid a hard import

    @property
    def embedding(self) -> np.ndarray:
        return self.face.normed_embedding


def load_source_faces(paths: Sequence[Path], prefer_gpu: bool = True) -> list[SourceFace]:
    """Load each path, detect the largest face, return a SourceFace per input."""
    analyzer = models.get_face_analyzer(prefer_gpu=prefer_gpu)
    out: list[SourceFace] = []
    for p in paths:
        img = cv2.imread(str(p))
        if img is None:
            raise ValueError(f"Could not read source image: {p}")
        faces = analyzer.get(img)
        if not faces:
            raise ValueError(f"No face detected in source image: {p}")
        # Pick the largest face — most reliable when the source is a portrait.
        face = max(faces, key=_face_area)
        out.append(SourceFace(label=p.stem, image_path=Path(p), face=face))
    return out


def detect_faces(image: np.ndarray, prefer_gpu: bool = True) -> list:
    analyzer = models.get_face_analyzer(prefer_gpu=prefer_gpu)
    return analyzer.get(image)


def swap_one(
    image: np.ndarray,
    target_face,
    source_face: SourceFace,
    prefer_gpu: bool = True,
) -> np.ndarray:
    swapper = models.get_swapper(prefer_gpu=prefer_gpu)
    return swapper.get(image, target_face, source_face.face, paste_back=True)


def enhance_face_regions(
    image: np.ndarray,
    target_faces: Iterable,
    prefer_gpu: bool = True,
    only_center_face: bool = False,
) -> np.ndarray:
    """Run GFPGAN over the image to clean up blurred swapped faces.

    GFPGAN works on the whole image and re-runs its own face detector, so we
    don't need to crop manually. Returns the original image unchanged if the
    enhancer model isn't present.
    """
    enhancer = models.get_enhancer(prefer_gpu=prefer_gpu)
    if enhancer is None:
        return image
    _, _, restored = enhancer.enhance(
        image,
        has_aligned=False,
        only_center_face=only_center_face,
        paste_back=True,
    )
    return restored if restored is not None else image


def _face_area(face) -> float:
    x1, y1, x2, y2 = face.bbox
    return float(max(0.0, x2 - x1) * max(0.0, y2 - y1))


def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b) + 1e-8))
