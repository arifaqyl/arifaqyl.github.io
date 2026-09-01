#!/usr/bin/env python3
"""Generate stats.json for the portfolio so its numbers stop going stale.

The site previously hardcoded "246 tests passing". By 2026-09-02 the real
figure was 488 and drifting further every week. A portfolio that overstates is
bad; one that understates its own work by half is just as wrong, and it quietly
tells a reader the numbers are decoration.

Split by where each fact actually lives:

  apps_live, public_repos   measured live, on every run. These change without
                            anyone deploying, so the Pi checks them hourly.

  test counts               read from a baseline file written at deploy time
                            from the real repos. The Pi only holds deployment
                            files, not full test suites, so counting there
                            would report 118 instead of 488. Test counts only
                            change when code ships, which is exactly when the
                            baseline is rewritten.

Never guesses. A figure it cannot verify is omitted, and the page keeps the
last value in its markup rather than showing a blank or a zero.

  # on the Pi, hourly
  python3 build_stats.py --out stats.json --baseline test-counts.json

  # on the dev machine, at deploy time
  python3 build_stats.py --write-baseline test-counts.json
"""
from __future__ import annotations

import argparse
import json
import pathlib
import re
import sys
import urllib.request
from datetime import datetime, timezone

# Where the real repos live on the development machine. Only used by
# --write-baseline; the Pi never reads these.
SOURCE_REPOS = {
    "trafficmy": "D:/aduanmy",
    "sahbukti": "D:/kedai-ops",
    "studentbot": "D:/student-bot",
}

# Public endpoints that must answer to count as "live".
LIVE_APPS = {
    "trafficmy": "https://arifaqyl.me/traffic/",
    "sahbukti": "https://arifaqyl.me/sahbukti/",
    "opsconsole": "https://arifaqyl.me/ops-console/",
}

GITHUB_USER = "arifaqyl"
TEST_DEF = re.compile(rb"^\s*(?:async\s+)?def test_", re.M)


def count_tests(repo: str) -> int:
    root = pathlib.Path(repo) / "tests"
    if not root.is_dir():
        return 0
    total = 0
    for f in root.rglob("test_*.py"):
        try:
            total += len(TEST_DEF.findall(f.read_bytes()))
        except OSError:
            continue
    return total


def is_up(url: str, timeout: int = 8) -> bool:
    req = urllib.request.Request(url, headers={"User-Agent": "arifaqyl-stats/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.status < 400
    except Exception:
        return False


def public_repos(user: str) -> int | None:
    req = urllib.request.Request(
        f"https://api.github.com/users/{user}",
        headers={"User-Agent": "arifaqyl-stats/1.0", "Accept": "application/vnd.github+json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as r:
            return int(json.load(r).get("public_repos") or 0)
    except Exception:
        return None


def write_baseline(path: str) -> int:
    counts = {name: count_tests(repo) for name, repo in SOURCE_REPOS.items()}
    missing = [n for n, c in counts.items() if c == 0]
    if missing:
        print(f"refusing to write baseline: no tests found for {', '.join(missing)}", file=sys.stderr)
        print("(run this on the machine holding the real repos)", file=sys.stderr)
        return 1
    payload = {
        "generated_at": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "tests": counts,
        "total": sum(counts.values()),
    }
    pathlib.Path(path).write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(json.dumps(payload, indent=2))
    return 0


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out")
    ap.add_argument("--baseline", help="test-counts.json written at deploy time")
    ap.add_argument("--write-baseline", help="scan SOURCE_REPOS and write the baseline")
    ap.add_argument("--pretty", action="store_true")
    args = ap.parse_args()

    if args.write_baseline:
        return write_baseline(args.write_baseline)
    if not args.out:
        ap.error("--out is required unless --write-baseline is used")

    payload: dict = {
        "generated_at": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "apps_live": sum(1 for u in LIVE_APPS.values() if is_up(u)),
        "refresh_minutes": 15,
    }

    repos = public_repos(GITHUB_USER)
    if repos is not None:
        payload["public_repos"] = repos   # omitted if rate-limited, page keeps its value

    if args.baseline:
        try:
            base = json.loads(pathlib.Path(args.baseline).read_text(encoding="utf-8"))
            tests = base.get("tests", {})
            payload["tests_passing"] = base.get("total") or sum(tests.values())
            payload["tests_as_of"] = base.get("generated_at")
            payload["projects"] = {
                k: {"tests": v, "live": is_up(LIVE_APPS[k]) if k in LIVE_APPS else None}
                for k, v in tests.items()
            }
        except Exception as exc:
            print(f"baseline unreadable ({exc}); omitting test figures", file=sys.stderr)

    out = pathlib.Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    tmp = out.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(payload, indent=2 if args.pretty else None), encoding="utf-8")
    tmp.replace(out)  # atomic: never serve a half-written file

    print(json.dumps(payload, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
