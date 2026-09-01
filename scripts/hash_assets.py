#!/usr/bin/env python3
"""Give screenshots content-hashed filenames so caches can never serve a stale one.

Images sit behind Cloudflare with max-age=14400. Replacing trafficmy.png with a
new capture under the same name left the old July screenshot being served for
hours: cf-cache-status HIT, last-modified 24 Jul, while the Pi had the new file.
The portfolio was showing a UI that no longer existed.

Renaming by content hash means a changed image is a different URL, so it is
never a cache hit. Re-run after recapturing screenshots; it rewrites the
references in index.html and reports which old files are now unreferenced.

    python3 scripts/hash_assets.py
"""
from __future__ import annotations

import hashlib
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
HTML = ROOT / "index.html"
ASSETS = ["trafficmy.webp", "sahbukti.webp"]
HASHED = re.compile(r"^(?P<stem>[a-z0-9_-]+)\.(?P<hash>[0-9a-f]{8})\.(?P<ext>png|jpg|webp)$")


def short_hash(p: pathlib.Path) -> str:
    return hashlib.sha256(p.read_bytes()).hexdigest()[:8]


def main() -> int:
    html = HTML.read_text(encoding="utf-8")
    renamed, unreferenced = [], []

    for name in ASSETS:
        stem, ext = name.rsplit(".", 1)
        # the current source file: either the bare name or an already-hashed one
        candidates = sorted(
            [p for p in ROOT.glob(f"{stem}.*.{ext}") if HASHED.match(p.name)],
            key=lambda p: p.stat().st_mtime,
            reverse=True,
        )
        bare = ROOT / name
        src = bare if bare.exists() else (candidates[0] if candidates else None)
        if src is None:
            print(f"  !! missing: {name}")
            continue

        h = short_hash(src)
        target = ROOT / f"{stem}.{h}.{ext}"
        if src != target:
            target.write_bytes(src.read_bytes())
            if src.name != name:
                src.unlink()
        renamed.append((name, target.name))

        # point every reference at the hashed name
        html = re.sub(rf'(?<=["\'/]){re.escape(stem)}(?:\.[0-9a-f]{{8}})?\.{ext}',
                      target.name, html)

        # any other hashed copies of this asset are now dead weight
        for p in ROOT.glob(f"{stem}.*.{ext}"):
            if HASHED.match(p.name) and p != target:
                unreferenced.append(p.name)
                p.unlink()
        if bare.exists() and bare != target:
            unreferenced.append(bare.name)
            bare.unlink()

    HTML.write_text(html, encoding="utf-8")

    print("hashed assets:")
    for old, new in renamed:
        print(f"   {old:18} -> {new}")
    if unreferenced:
        print("removed stale copies:")
        for n in sorted(set(unreferenced)):
            print(f"   {n}")

    # fail loudly if a reference was missed
    leftover = re.findall(r'["\'/](?:trafficmy|sahbukti)\.(?:png|jpg)', html)
    if leftover:
        print(f"  !! unhashed references remain: {leftover}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
