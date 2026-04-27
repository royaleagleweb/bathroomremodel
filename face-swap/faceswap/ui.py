"""Gradio web UI.

Run with:

    python -m faceswap.ui

Opens a browser tab with two tabs: image swap and video swap.
"""
from __future__ import annotations

import tempfile
from pathlib import Path
from typing import List, Optional

import cv2
import gradio as gr

from .core import load_source_faces
from .pipeline import SwapConfig, swap_image_array, swap_video_file


CONSENT_NOTICE = (
    "**Use responsibly.** Only swap faces of people who have given informed "
    "consent. Do not use this tool to harass, defame, or impersonate."
)


def _cfg(mode: str, enhance: bool, cpu: bool, similarity: float, fallback: bool) -> SwapConfig:
    return SwapConfig(
        mode=mode,
        enhance=enhance,
        prefer_gpu=not cpu,
        similarity_threshold=similarity,
        fallback_to_first=fallback,
    )


def _run_image(
    target_image,
    source_files: List[gr.utils.NamedString],
    mode: str,
    enhance: bool,
    cpu: bool,
    similarity: float,
    fallback: bool,
):
    if target_image is None:
        raise gr.Error("Upload a target image.")
    if not source_files:
        raise gr.Error("Upload at least one source face.")

    source_paths = [Path(f.name) for f in source_files]
    sources = load_source_faces(source_paths, prefer_gpu=not cpu)
    cfg = _cfg(mode, enhance, cpu, similarity, fallback)

    bgr = cv2.cvtColor(target_image, cv2.COLOR_RGB2BGR)
    out_bgr = swap_image_array(bgr, sources, cfg)
    return cv2.cvtColor(out_bgr, cv2.COLOR_BGR2RGB)


def _run_video(
    target_video: Optional[str],
    source_files: List[gr.utils.NamedString],
    mode: str,
    enhance: bool,
    cpu: bool,
    similarity: float,
    fallback: bool,
    keep_audio: bool,
):
    if not target_video:
        raise gr.Error("Upload a target video.")
    if not source_files:
        raise gr.Error("Upload at least one source face.")

    source_paths = [Path(f.name) for f in source_files]
    cfg = _cfg(mode, enhance, cpu, similarity, fallback)
    out_path = Path(tempfile.mkstemp(suffix=".mp4", prefix="faceswap_out_")[1])
    swap_video_file(
        Path(target_video),
        source_paths,
        out_path,
        cfg,
        keep_audio=keep_audio,
        progress=False,
    )
    return str(out_path)


def build_app() -> gr.Blocks:
    with gr.Blocks(title="Face Swap") as app:
        gr.Markdown("# Multi-Face Video Swap")
        gr.Markdown(CONSENT_NOTICE)

        with gr.Tabs():
            with gr.Tab("Image"):
                with gr.Row():
                    with gr.Column():
                        img_target = gr.Image(label="Target image", type="numpy")
                        img_sources = gr.File(
                            label="Source face(s)",
                            file_count="multiple",
                            file_types=["image"],
                        )
                        img_mode = gr.Radio(
                            ["all", "position", "reference"],
                            value="reference",
                            label="Match mode",
                        )
                        img_enhance = gr.Checkbox(label="GFPGAN enhance", value=False)
                        img_cpu = gr.Checkbox(label="Force CPU", value=False)
                        img_sim = gr.Slider(0.0, 1.0, value=0.35, step=0.01, label="Similarity threshold")
                        img_fallback = gr.Checkbox(
                            label="Fallback unmatched to first source", value=False
                        )
                        img_btn = gr.Button("Swap faces", variant="primary")
                    with gr.Column():
                        img_out = gr.Image(label="Result")

                img_btn.click(
                    _run_image,
                    inputs=[
                        img_target,
                        img_sources,
                        img_mode,
                        img_enhance,
                        img_cpu,
                        img_sim,
                        img_fallback,
                    ],
                    outputs=img_out,
                )

            with gr.Tab("Video"):
                with gr.Row():
                    with gr.Column():
                        vid_target = gr.Video(label="Target video")
                        vid_sources = gr.File(
                            label="Source face(s)",
                            file_count="multiple",
                            file_types=["image"],
                        )
                        vid_mode = gr.Radio(
                            ["all", "position", "reference"],
                            value="reference",
                            label="Match mode",
                        )
                        vid_enhance = gr.Checkbox(label="GFPGAN enhance", value=False)
                        vid_cpu = gr.Checkbox(label="Force CPU", value=False)
                        vid_sim = gr.Slider(0.0, 1.0, value=0.35, step=0.01, label="Similarity threshold")
                        vid_fallback = gr.Checkbox(
                            label="Fallback unmatched to first source", value=False
                        )
                        vid_audio = gr.Checkbox(label="Keep original audio", value=True)
                        vid_btn = gr.Button("Swap faces", variant="primary")
                    with gr.Column():
                        vid_out = gr.Video(label="Result")

                vid_btn.click(
                    _run_video,
                    inputs=[
                        vid_target,
                        vid_sources,
                        vid_mode,
                        vid_enhance,
                        vid_cpu,
                        vid_sim,
                        vid_fallback,
                        vid_audio,
                    ],
                    outputs=vid_out,
                )

    return app


def main() -> None:
    build_app().launch()


if __name__ == "__main__":
    main()
