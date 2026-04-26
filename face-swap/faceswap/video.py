"""ffmpeg helpers — frame extraction, reassembly, audio mux."""
from __future__ import annotations

import json
import shutil
import subprocess
from dataclasses import dataclass
from pathlib import Path
from typing import Optional


class FFmpegError(RuntimeError):
    pass


def _require_ffmpeg() -> str:
    exe = shutil.which("ffmpeg")
    if not exe:
        raise FFmpegError("ffmpeg not found on PATH. Install ffmpeg first.")
    return exe


def _require_ffprobe() -> str:
    exe = shutil.which("ffprobe")
    if not exe:
        raise FFmpegError("ffprobe not found on PATH. Install ffmpeg first.")
    return exe


@dataclass
class VideoInfo:
    fps: float
    frame_count: int
    width: int
    height: int
    has_audio: bool


def probe(video: Path) -> VideoInfo:
    ffprobe = _require_ffprobe()
    proc = subprocess.run(
        [
            ffprobe,
            "-v", "error",
            "-print_format", "json",
            "-show_streams",
            str(video),
        ],
        capture_output=True,
        text=True,
        check=False,
    )
    if proc.returncode != 0:
        raise FFmpegError(f"ffprobe failed: {proc.stderr.strip()}")
    data = json.loads(proc.stdout)
    streams = data.get("streams", [])
    video_stream = next((s for s in streams if s.get("codec_type") == "video"), None)
    if video_stream is None:
        raise FFmpegError(f"No video stream found in {video}")
    has_audio = any(s.get("codec_type") == "audio" for s in streams)

    num, den = (video_stream.get("avg_frame_rate") or "0/1").split("/")
    fps = float(num) / float(den) if float(den) else 0.0
    frame_count = int(video_stream.get("nb_frames") or 0)
    if frame_count == 0:
        # Fall back to duration * fps for containers that don't report nb_frames.
        duration = float(video_stream.get("duration") or 0.0)
        frame_count = int(duration * fps) if fps else 0
    return VideoInfo(
        fps=fps,
        frame_count=frame_count,
        width=int(video_stream["width"]),
        height=int(video_stream["height"]),
        has_audio=has_audio,
    )


def extract_frames(video: Path, frames_dir: Path) -> None:
    ffmpeg = _require_ffmpeg()
    frames_dir.mkdir(parents=True, exist_ok=True)
    proc = subprocess.run(
        [
            ffmpeg,
            "-y",
            "-i", str(video),
            "-vsync", "0",
            "-q:v", "1",
            str(frames_dir / "frame_%08d.png"),
        ],
        capture_output=True,
        text=True,
        check=False,
    )
    if proc.returncode != 0:
        raise FFmpegError(f"frame extraction failed: {proc.stderr.strip()[-500:]}")


def assemble_video(
    frames_dir: Path,
    fps: float,
    output: Path,
    audio_source: Optional[Path] = None,
    crf: int = 18,
) -> None:
    """Encode the swapped frames back to H.264. Mux audio from the original if asked."""
    ffmpeg = _require_ffmpeg()
    output.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        ffmpeg,
        "-y",
        "-framerate", f"{fps}",
        "-i", str(frames_dir / "frame_%08d.png"),
    ]
    if audio_source is not None:
        cmd += ["-i", str(audio_source)]
    cmd += [
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-crf", str(crf),
        "-preset", "medium",
    ]
    if audio_source is not None:
        cmd += ["-map", "0:v:0", "-map", "1:a:0?", "-c:a", "aac", "-shortest"]
    cmd.append(str(output))

    proc = subprocess.run(cmd, capture_output=True, text=True, check=False)
    if proc.returncode != 0:
        raise FFmpegError(f"video assembly failed: {proc.stderr.strip()[-500:]}")
