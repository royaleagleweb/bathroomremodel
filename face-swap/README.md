# Face Swap (FaceFusion-style multi-face video swap)

Standalone Python tool — independent of the bathroom-remodel site at the repo root.

Detects every face in a target image or video and replaces faces by **identity** (embedding match), **position** (left-to-right), or **all-with-one** mode. Audio is preserved on video output. Optional GFPGAN pass cleans up the swapped faces.

## Use responsibly

This tool generates synthetic media. Only swap faces of people who have given informed consent for the specific use you have in mind. Do not use it to harass, defame, or impersonate. Many jurisdictions criminalise non-consensual deepfakes — check your local law before publishing anything you make with it.

## Requirements

- Python 3.10+
- `ffmpeg` and `ffprobe` on `PATH`
- An NVIDIA GPU is strongly recommended for video; CPU works but is slow

## Install

```bash
cd face-swap
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
# For CUDA: pip uninstall onnxruntime && pip install onnxruntime-gpu
```

## Models

Weights are not committed. Place them under `face-swap/models/`:

| File | Purpose | Notes |
| --- | --- | --- |
| `inswapper_128.onnx` | Face swap | The InsightFace swap model. The original was distributed by InsightFace and has since been pulled from official channels; supply your own copy. |
| `GFPGANv1.4.pth` | Optional enhancer | Released by TencentARC under Apache-2.0. |

The `buffalo_l` detection + embedding pack is fetched automatically by `insightface` to `~/.insightface/` on first run.

```
face-swap/
└── models/
    ├── inswapper_128.onnx
    └── GFPGANv1.4.pth   # optional
```

## CLI

```bash
# One source face onto every face in a video
python -m faceswap video --target in.mp4 --source me.jpg --mode all -o out.mp4

# Two source faces, identity-matched onto a video with two people
python -m faceswap video \
    --target couple.mp4 \
    --source alice.jpg bob.jpg \
    --mode reference \
    --enhance \
    -o out.mp4

# Single image
python -m faceswap image --target group.jpg --source me.jpg --mode all -o out.jpg
```

### Match modes

| Mode | What it does | Use when |
| --- | --- | --- |
| `all` | Replace every detected face with the first source. | One target person, or you want everyone to become the same face. |
| `position` | Sort target faces left-to-right, zip with sources in order. | Static group photo with predictable layout. |
| `reference` | For each source, find the most similar face in the frame by embedding and replace that one. | Video with multiple people you want to keep distinct identities for. **(default)** |

In `reference` mode, identity tracking is per-frame and embedding-based, so the same source keeps landing on the same person across cuts and motion — this is the FaceFusion-equivalent behaviour.

### Useful flags

| Flag | Meaning |
| --- | --- |
| `--enhance` | Run GFPGAN over the result. Needs `GFPGANv1.4.pth`. |
| `--cpu` | Skip GPU even if one is detected. |
| `--similarity` | Cosine threshold for `reference` mode (default `0.35`). Raise it (e.g. `0.5`) if the wrong face is being replaced. |
| `--fallback-to-first` | In `reference` mode, swap unmatched faces with the first source instead of leaving them alone. |
| `--no-audio` | Drop audio from the output. |
| `--workdir DIR` | Keep extracted frames here for debugging. |

## Web UI

```bash
python -m faceswap.ui
```

Opens a Gradio app with separate Image and Video tabs.

## Layout

```
face-swap/
├── faceswap/
│   ├── __main__.py     # python -m faceswap ...
│   ├── cli.py          # argparse CLI
│   ├── core.py         # model wrappers, embeddings
│   ├── matching.py     # all / position / reference matchers
│   ├── models.py       # lazy ONNX/torch model loading
│   ├── pipeline.py     # image + video pipelines
│   ├── ui.py           # Gradio web UI
│   └── video.py        # ffmpeg helpers
├── models/             # user-supplied weights (gitignored)
├── requirements.txt
└── README.md
```

## Troubleshooting

- **`Missing face-swap model at .../inswapper_128.onnx`** — download `inswapper_128.onnx` and drop it in `face-swap/models/`.
- **`No face detected in source image`** — pick a clearer portrait. The largest detected face wins, so avoid backgrounds with people.
- **Wrong person gets swapped in reference mode** — raise `--similarity` (try `0.5`–`0.6`).
- **Output looks blurry** — pass `--enhance` to enable GFPGAN.
- **Slow on CPU** — expected; 30s of 1080p video can take 10+ minutes without a GPU.
