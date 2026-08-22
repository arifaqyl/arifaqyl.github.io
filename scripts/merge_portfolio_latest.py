"""Merge Live Apps into committed HEAD portfolio (Canvas2D + project-shell)."""
from __future__ import annotations

import subprocess
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
HEAD = REPO / "index.head.html"
CURRENT = REPO / "index.html"
OUT = REPO / "index.html"
LEGACY = REPO / "public" / "legacy" / "index.html"

LIVE_CSS_MARKER = "    .live-apps-grid {"
LIVE_CSS_END = "    .live-btn-ghost:hover {"
LIVE_HTML_START = "<!-- ─── LIVE APPS ─────────────────────────────────────────────── -->"
LIVE_HTML_END = "<!-- ─── WORK ──────────────────────────────────────────────────── -->"


def git_head_index() -> str:
    result = subprocess.run(
        ["git", "-C", str(REPO), "show", "HEAD:index.html"],
        capture_output=True,
        check=True,
    )
    return result.stdout.decode("utf-8")


def extract_block(text: str, start: str, end: str) -> str:
    i = text.index(start)
    j = text.index(end, i)
    return text[i:j]


def main() -> None:
    base = git_head_index()
    current = CURRENT.read_text(encoding="utf-8")

    live_css = extract_block(current, LIVE_CSS_MARKER, LIVE_CSS_END) + "\n"
    live_html = extract_block(current, LIVE_HTML_START, LIVE_HTML_END)

    if "#live::before" not in base:
        base = base.replace(
            "    #work::before {",
            "    #live::before {\n"
            "      background: radial-gradient(84.6% 73.49% at 50% 0%, rgba(204,255,0,0.08), transparent);\n"
            "    }\n\n"
            "    #work::before {",
            1,
        )

    if LIVE_CSS_MARKER not in base:
        base = base.replace("    /* Filter chips */", live_css + "\n    /* Filter chips */", 1)
        if "    /* Filter chips */" not in base:
            base = base.replace("    .filter-row {", live_css + "\n    .filter-row {", 1)

    if "live-apps-grid { grid-template-columns: 1fr; }" not in base:
        base = base.replace(
            "      .pf-content { grid-template-columns: 1fr; }",
            "      .pf-content { grid-template-columns: 1fr; }\n\n"
            "      .live-apps-grid { grid-template-columns: 1fr; }\n"
            "      .live-app-signals { grid-template-columns: 1fr; }",
            1,
        )

    if LIVE_HTML_START not in base:
        base = base.replace(
            LIVE_HTML_END,
            live_html + LIVE_HTML_END,
            1,
        )

    base = base.replace(
        "      <li><a href=\"#work\">work</a></li>\n"
        "      <li><a href=\"#projects\">projects</a></li>",
        "      <li><a href=\"#live\">live</a></li>\n"
        "      <li><a href=\"#work\">work</a></li>\n"
        "      <li><a href=\"#projects\">projects</a></li>",
        1,
    )

    base = base.replace(
        "    <p class=\"hero-desc\">\n"
        "      I build practical tools outside of class — AI video editors, audio analysis pipelines, and automation scripts. Most of my work is open source on GitHub.\n"
        "    </p>\n"
        "    <a href=\"#work\" class=\"hero-cta\">\n"
        "      View work\n"
        "      <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n"
        "        <path d=\"M5 12h14M12 5l7 7-7 7\"/>\n"
        "      </svg>\n"
        "    </a>",
        "    <p class=\"hero-desc\">\n"
        "      I ship live apps, automation systems, and data products — mostly open source, all built to solve real friction. Start with the live lane, then explore work and the project index.\n"
        "    </p>\n"
        "    <a href=\"#live\" class=\"hero-cta\">\n"
        "      View live apps\n"
        "      <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n"
        "        <path d=\"M5 12h14M12 5l7 7-7 7\"/>\n"
        "      </svg>\n"
        "    </a>\n"
        "    <a href=\"#projects\" class=\"hero-cta\">Project index</a>",
        1,
    )

    base = base.replace(
        "  const text = '> building systems that run themselves_';",
        "  const text = '> shipping sahbukti · trafficmy · automation systems_';",
        1,
    )

    base = base.replace(
        "    'Python','Java','C++','HTML/CSS/JS','ffmpeg','SQLite','Canvas2D',",
        "    'Sah.Bukti','TrafficMY','FastAPI','GTFS-RT','Python','Canvas2D',",
        1,
    )

    OUT.write_text(base, encoding="utf-8")
    LEGACY.write_text(base, encoding="utf-8")
    print(f"Wrote merged portfolio ({len(base)} chars) to index.html + public/legacy/")


if __name__ == "__main__":
    main()
