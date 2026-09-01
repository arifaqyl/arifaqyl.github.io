#!/usr/bin/env python3
"""Convert screenshot captures to WebP at a sane resolution.

The two PNG screenshots were 1,021 KB of a 1,233 KB page — 83% of the whole
weight for two images. They were also 2240px wide while the card that shows
them renders at roughly 590px on desktop, so most of those pixels were never
visible.

1600px wide at q86 is still sharp at 2x on any realistic viewport and costs
about 79 KB each, an 85% saving.

Run after recapturing, then scripts/hash_assets.py to fingerprint the output.

    python3 scripts/optimize_shots.py
"""
from __future__ import annotations

import pathlib
import sys

try:
    from PIL import Image
except ImportError:
    print("needs Pillow: pip install Pillow", file=sys.stderr)
    raise SystemExit(1)

ROOT = pathlib.Path(__file__).resolve().parent.parent
MAX_WIDTH = 1600
QUALITY = 86
STEMS = ["trafficmy", "sahbukti"]


def main() -> int:
    total_before = total_after = 0
    for stem in STEMS:
        # accept a bare capture or an already-fingerprinted file
        srcs = sorted(
            [p for p in ROOT.glob(f"{stem}*.png") if p.is_file()],
            key=lambda p: p.stat().st_mtime, reverse=True,
        )
        if not srcs:
            print(f"  !! no source png for {stem}, skipped")
            continue
        src = srcs[0]
        out = ROOT / f"{stem}.webp"

        im = Image.open(src)
        before = src.stat().st_size
        if im.width > MAX_WIDTH:
            im.thumbnail((MAX_WIDTH, MAX_WIDTH * 4), Image.LANCZOS)
        im.convert("RGB").save(out, "WEBP", quality=QUALITY, method=6)
        after = out.stat().st_size

        total_before += before
        total_after += after
        print(f"  {src.name:26} {before/1024:6.0f} KB  ->  "
              f"{out.name:16} {after/1024:5.0f} KB   ({im.width}x{im.height})")

        for p in srcs:      # the pngs are superseded once the webp exists
            p.unlink()

    if total_before:
        pct = 100 * (1 - total_after / total_before)
        print(f"\n  {total_before/1024:.0f} KB -> {total_after/1024:.0f} KB  ({pct:.0f}% smaller)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
