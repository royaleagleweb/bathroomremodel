"""Command-line interface.

Examples
--------
    # one source face → every face in a video
    python -m faceswap video --target in.mp4 --source me.jpg --mode all -o out.mp4

    # two source faces → reference-matched onto a video with two people
    python -m faceswap video --target couple.mp4 --source alice.jpg bob.jpg \\
        --mode reference -o out.mp4 --enhance

    # single image swap
    python -m faceswap image --target photo.jpg --source me.jpg -o out.jpg
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

from .pipeline import SwapConfig, swap_image_file, swap_video_file


CONSENT_NOTICE = (
    "[notice] Only swap faces of people who have given informed consent for "
    "this specific use. Don't use this tool to harass, defame, or impersonate."
)


def _add_common(p: argparse.ArgumentParser) -> None:
    p.add_argument("--target", required=True, type=Path, help="Target image or video.")
    p.add_argument(
        "--source",
        required=True,
        nargs="+",
        type=Path,
        help="One or more source face images. With --mode reference, each is treated as a separate identity.",
    )
    p.add_argument("-o", "--output", required=True, type=Path, help="Output file path.")
    p.add_argument(
        "--mode",
        choices=("all", "position", "reference"),
        default="reference",
        help="all=replace every face with first source; position=zip left-to-right; reference=embedding-match.",
    )
    p.add_argument("--enhance", action="store_true", help="Run GFPGAN over swapped faces (needs weights).")
    p.add_argument("--cpu", action="store_true", help="Force CPU even if a GPU is available.")
    p.add_argument(
        "--similarity",
        type=float,
        default=0.35,
        help="Min cosine similarity for reference matching (0..1, higher = stricter).",
    )
    p.add_argument(
        "--fallback-to-first",
        action="store_true",
        help="In reference mode, swap unmatched faces with the first source instead of leaving them.",
    )


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="faceswap",
        description="Multi-face video swap tool (FaceFusion-style).",
    )
    sub = parser.add_subparsers(dest="command", required=True)

    img = sub.add_parser("image", help="Swap faces in a single image.")
    _add_common(img)

    vid = sub.add_parser("video", help="Swap faces in a video, preserving audio.")
    _add_common(vid)
    vid.add_argument("--no-audio", action="store_true", help="Drop audio in the output.")
    vid.add_argument("--workdir", type=Path, default=None, help="Keep intermediate frames here for debugging.")
    vid.add_argument("--quiet", action="store_true", help="Hide the per-frame progress bar.")

    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)

    print(CONSENT_NOTICE, file=sys.stderr)

    cfg = SwapConfig(
        mode=args.mode,
        enhance=args.enhance,
        prefer_gpu=not args.cpu,
        similarity_threshold=args.similarity,
        fallback_to_first=args.fallback_to_first,
    )

    if args.command == "image":
        out = swap_image_file(args.target, args.source, args.output, cfg)
        print(f"wrote {out}")
        return 0

    if args.command == "video":
        out = swap_video_file(
            args.target,
            args.source,
            args.output,
            cfg,
            keep_audio=not args.no_audio,
            workdir=args.workdir,
            progress=not args.quiet,
        )
        print(f"wrote {out}")
        return 0

    parser.error(f"unknown command: {args.command}")
    return 2
