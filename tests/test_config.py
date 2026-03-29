"""Tests for central configuration (no raw data required)."""

from pathlib import Path

import pytest

from scripts.utils.config import PATHS, ROOT, STYLE, ensure_dirs, PROJECTIONS


def test_root_exists():
    assert ROOT.is_dir()
    assert (ROOT / "scripts" / "utils" / "config.py").is_file()


def test_paths_are_under_root():
    for key, p in PATHS.items():
        assert isinstance(p, Path), key
        try:
            p.relative_to(ROOT)
        except ValueError:
            pytest.fail(f"{key} not under ROOT: {p}")


def test_style_has_dpi():
    assert STYLE["dpi_final"] >= STYLE["dpi_draft"]


def test_projections_non_empty():
    assert "wgs84" in PROJECTIONS
    assert "albers_equal_area" in PROJECTIONS


def test_ensure_dirs_runs(tmp_path, monkeypatch):
    """ensure_dirs should not raise; redirect PATHS to temp for speed."""
    fake = {k: tmp_path / k for k in ("fig_part1", "processed", "cache")}
    monkeypatch.setattr("scripts.utils.config.PATHS", fake)
    ensure_dirs()
    for p in fake.values():
        assert p.is_dir()
