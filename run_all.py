#!/usr/bin/env python3
"""
GeoMetric — master pipeline runner.

Runs data download (optional), preprocessing (optional), part scripts 1–7,
and optional batch bonus exports (HTML), matching the Makefile targets.

Usage:
  python run_all.py
  python run_all.py --draft
  python run_all.py --skip-download --skip-preprocess
  python run_all.py --parts 1 2
  python run_all.py --bonus --skip-download --skip-preprocess   # bonus batch only
"""

from __future__ import annotations

import argparse
import importlib
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

PART_MODULES = [
    "part1_projections",
    "part2_choropleth",
    "part3_proportional",
    "part4_flow",
    "part5_contour",
    "part6_cartogram",
    "part7_scenarios",
]

BONUS_MODULES = [
    "scripts.bonus.bonus_animation",
    "scripts.bonus.bonus_morans_i",
]


def _apply_draft_mode() -> None:
    from scripts.utils import config

    config.STYLE["dpi_final"] = config.STYLE["dpi_draft"]
    print(" Draft mode: figures saved at", config.STYLE["dpi_final"], "DPI")


def _run_download() -> None:
    from scripts.utils.data_loader import download_all

    print("=" * 60)
    print("  Downloading raw datasets")
    print("=" * 60)
    download_all(force=False)


def _run_preprocess() -> None:
    from scripts.utils import preprocess

    preprocess.run()


def _run_part(name: str) -> None:
    mod = importlib.import_module(f"scripts.parts.{name}")
    mod.run()


def _run_bonus_batch() -> None:
    for mod_path in BONUS_MODULES:
        print("\n" + "=" * 60)
        print(f"  {mod_path}")
        print("=" * 60)
        mod = importlib.import_module(mod_path)
        mod.run()


def main() -> int:
    parser = argparse.ArgumentParser(description="GeoMetric pipeline runner")
    parser.add_argument(
        "--draft",
        action="store_true",
        help="Save figures at draft DPI (150) instead of 300",
    )
    parser.add_argument(
        "--skip-download",
        action="store_true",
        help="Skip data_loader (raw data must already exist)",
    )
    parser.add_argument(
        "--skip-preprocess",
        action="store_true",
        help="Skip preprocess (processed files must already exist)",
    )
    parser.add_argument(
        "--bonus",
        action="store_true",
        help="After parts (or alone with skips): run batch bonus HTML exports",
    )
    parser.add_argument(
        "--parts",
        nargs="*",
        type=int,
        metavar="N",
        help="Run only these part numbers (1–7). Default: all parts.",
    )
    args = parser.parse_args()

    if args.draft:
        _apply_draft_mode()

    # Bonus-only mode (Makefile: run-bonus)
    if args.bonus and args.skip_download and args.skip_preprocess:
        only_bonus = not args.parts
        if only_bonus:
            _run_bonus_batch()
            return 0

    if not args.skip_download:
        _run_download()
    else:
        print(" Skipping download (--skip-download).")

    if not args.skip_preprocess:
        _run_preprocess()
    else:
        print(" Skipping preprocess (--skip-preprocess).")

    from scripts.utils.config import ensure_dirs

    ensure_dirs()

    selected = args.parts
    if selected:
        for n in selected:
            if n < 1 or n > 7:
                print(f"Invalid part number: {n} (use 1–7)", file=sys.stderr)
                return 1
        to_run = [PART_MODULES[n - 1] for n in sorted(set(selected))]
    else:
        to_run = PART_MODULES

    for name in to_run:
        print("\n" + "=" * 60)
        print(f"  {name}")
        print("=" * 60)
        _run_part(name)

    if args.bonus:
        _run_bonus_batch()

    print("\n Pipeline finished.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
