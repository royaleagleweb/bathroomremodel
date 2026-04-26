"""Model resolution and lazy loading.

Models are NOT bundled with this repo. Users must place files in `models/`:

    models/inswapper_128.onnx    # the face-swap model
    models/GFPGANv1.4.pth        # (optional) face enhancer

InsightFace's `buffalo_l` detection/embedding pack is downloaded automatically
to `~/.insightface/` on first use.
"""
from __future__ import annotations

import os
from functools import lru_cache
from pathlib import Path
from typing import Optional


REPO_ROOT = Path(__file__).resolve().parent.parent
MODELS_DIR = REPO_ROOT / "models"

INSWAPPER_FILENAME = "inswapper_128.onnx"
GFPGAN_FILENAME = "GFPGANv1.4.pth"


def _providers(prefer_gpu: bool) -> list[str]:
    if not prefer_gpu:
        return ["CPUExecutionProvider"]
    try:
        import onnxruntime as ort

        available = ort.get_available_providers()
    except ImportError:
        return ["CPUExecutionProvider"]
    chosen: list[str] = []
    for p in ("CUDAExecutionProvider", "CoreMLExecutionProvider", "ROCMExecutionProvider"):
        if p in available:
            chosen.append(p)
    chosen.append("CPUExecutionProvider")
    return chosen


def inswapper_path() -> Path:
    p = MODELS_DIR / INSWAPPER_FILENAME
    if not p.exists():
        raise FileNotFoundError(
            f"Missing face-swap model at {p}.\n"
            f"Place `{INSWAPPER_FILENAME}` in {MODELS_DIR}.\n"
            "See face-swap/README.md for sourcing instructions."
        )
    return p


def gfpgan_path() -> Optional[Path]:
    p = MODELS_DIR / GFPGAN_FILENAME
    return p if p.exists() else None


@lru_cache(maxsize=1)
def get_face_analyzer(prefer_gpu: bool = True, det_size: int = 640):
    """Return an InsightFace FaceAnalysis app with detection + embedding heads."""
    from insightface.app import FaceAnalysis

    app = FaceAnalysis(name="buffalo_l", providers=_providers(prefer_gpu))
    app.prepare(ctx_id=0 if prefer_gpu else -1, det_size=(det_size, det_size))
    return app


@lru_cache(maxsize=1)
def get_swapper(prefer_gpu: bool = True):
    """Return the InsightFace inswapper_128 model."""
    import insightface

    return insightface.model_zoo.get_model(
        str(inswapper_path()),
        providers=_providers(prefer_gpu),
    )


@lru_cache(maxsize=1)
def get_enhancer(prefer_gpu: bool = True):
    """Return a GFPGAN face enhancer, or None if the weights aren't present."""
    weights = gfpgan_path()
    if weights is None:
        return None
    from gfpgan import GFPGANer

    return GFPGANer(
        model_path=str(weights),
        upscale=1,
        arch="clean",
        channel_multiplier=2,
        bg_upsampler=None,
        device="cuda" if prefer_gpu and _has_cuda() else "cpu",
    )


def _has_cuda() -> bool:
    try:
        import torch

        return torch.cuda.is_available()
    except ImportError:
        return False


def reset_caches() -> None:
    """Drop cached models — useful when toggling GPU or re-downloading weights."""
    get_face_analyzer.cache_clear()
    get_swapper.cache_clear()
    get_enhancer.cache_clear()
