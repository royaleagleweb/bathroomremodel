"""Decide which target face in a frame should receive which source face.

Three strategies are exposed:

- "all"        replace every detected face with one source.
- "position"   sort by left-to-right bbox order and zip with the source list.
               Cheap, but breaks the moment people cross paths in a video.
- "reference"  match each source to its nearest target face by embedding
               cosine similarity. Tracks identity across cuts and motion.
"""
from __future__ import annotations

from typing import List, Sequence, Tuple

from .core import SourceFace, cosine_similarity


Pair = Tuple[object, SourceFace]  # (target_face, source_face)


def match_all_to_one(target_faces: Sequence, source: SourceFace) -> List[Pair]:
    return [(tf, source) for tf in target_faces]


def match_by_position(target_faces: Sequence, sources: Sequence[SourceFace]) -> List[Pair]:
    if not sources:
        return []
    targets_sorted = sorted(target_faces, key=lambda f: f.bbox[0])
    pairs: List[Pair] = []
    for i, tf in enumerate(targets_sorted):
        if i >= len(sources):
            break
        pairs.append((tf, sources[i]))
    return pairs


def match_by_reference(
    target_faces: Sequence,
    references: Sequence[Tuple[SourceFace, SourceFace]],
    threshold: float = 0.35,
) -> List[Pair]:
    """Each reference is (anchor_face, replacement_face).

    The anchor's embedding identifies the person to look for in the frame; the
    replacement is whose face gets pasted on. For the simple case where the
    source image already shows the person you want to overwrite, pass
    `(src, src)` as the pair.

    A target face is assigned to at most one reference (greedy by similarity)
    so two references can't both clobber the same person.
    """
    if not target_faces or not references:
        return []

    # similarity[i][j] = sim(target_faces[i], references[j].anchor)
    sims = [
        [cosine_similarity(tf.normed_embedding, anchor.embedding) for anchor, _ in references]
        for tf in target_faces
    ]

    used_targets: set[int] = set()
    used_refs: set[int] = set()
    pairs: List[Pair] = []

    flat = [
        (sims[i][j], i, j)
        for i in range(len(target_faces))
        for j in range(len(references))
    ]
    flat.sort(reverse=True, key=lambda x: x[0])

    for sim, i, j in flat:
        if sim < threshold:
            break
        if i in used_targets or j in used_refs:
            continue
        used_targets.add(i)
        used_refs.add(j)
        pairs.append((target_faces[i], references[j][1]))

    return pairs
