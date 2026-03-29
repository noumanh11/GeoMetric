"""
part2_choropleth.py
===================
Part 2 – Choropleth Map and Its Pitfalls

Creates choropleths of CO₂ per capita using quantiles, natural breaks,
and equal interval; includes raw vs rate comparison, large-area bias,
and a four-scheme panel; writes classification metrics and critique text.

Produces:
  - map_quantiles.png, map_natural_breaks.png, map_equal_interval.png
  - raw_vs_normalised_comparison.png, large_area_bias_annotated.png
  - four_classification_schemes.png
  - classification_comparison.csv
  - part2_critique.txt

Usage:
    python scripts/parts/part2_choropleth.py
"""

import sys
import warnings

warnings.filterwarnings("ignore")
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
import geopandas as gpd
import pandas as pd
import numpy as np
import mapclassify as mc

from scripts.utils.config import PATHS, STYLE, PROJECTION_LABELS
from scripts.utils.map_utils import save_figure, add_map_annotations, reproject_gdf

VARIABLE = "co2_per_capita"
VAR_LABEL = "CO₂ Emissions per Capita (tonnes)"
PROJ_KEY = "albers_equal_area"
N_CLASSES = 5
YEAR = 2020


def load_data() -> gpd.GeoDataFrame:
    """
    Load the master processed global dataset for choropleth mapping.

    Returns:
        gpd.GeoDataFrame: Geospatial database containing 2020 emissions metrics.
    """
    return gpd.read_file(PATHS["processed"] / "master_world.gpkg")


def plot_choropleth(
    gdf: gpd.GeoDataFrame,
    scheme: str,
    scheme_label: str,
    filename: str,
):
    """
    Generate and save a single choropleth map using a specified MapClassify scheme.

    Args:
        gdf (gpd.GeoDataFrame): Master spatial database.
        scheme (str): The pysal classification scheme name (e.g., 'quantiles', 'natural_breaks').
        scheme_label (str): Human-readable label for the scheme in the plot title.
        filename (str): Output physical filename for the map graphic.
    """
    gdf_proj = reproject_gdf(gdf.copy(), PROJ_KEY)

    fig, ax = plt.subplots(1, 1, figsize=STYLE["fig_size_world"])
    fig.patch.set_facecolor("white")
    ax.set_facecolor(STYLE["ocean_color"])

    # No-data countries
    gdf_proj[gdf_proj[VARIABLE].isna()].plot(
        ax=ax,
        color=STYLE["missing_data_color"],
        linewidth=0.3,
        edgecolor=STYLE["boundary_color"],
    )

    # Choropleth
    gdf_proj.dropna(subset=[VARIABLE]).plot(
        column=VARIABLE,
        ax=ax,
        scheme=scheme,
        k=N_CLASSES,
        cmap=STYLE["sequential_palette"],
        legend=True,
        legend_kwds={
            "title": VAR_LABEL,
            "fontsize": STYLE["legend_fontsize"],
            "loc": "lower left",
            "framealpha": 0.85,
            "fmt": "{:.1f}",
        },
        linewidth=STYLE["boundary_linewidth"],
        edgecolor=STYLE["boundary_color"],
        missing_kwds={"color": STYLE["missing_data_color"], "label": "No data"},
    )

    ax.set_axis_off()
    add_map_annotations(
        ax,
        title=f"CO₂ Emissions per Capita, {YEAR}  [{scheme_label}]",
        subtitle="Normalised by population — equal area projection",
        source="Our World in Data (OWID), 2020",
        projection_name=PROJ_KEY,
        year=YEAR,
    )

    save_figure(fig, PATHS["fig_part2"] / filename)
    plt.close(fig)


def plot_raw_vs_normalised_comparison(gdf: gpd.GeoDataFrame) -> None:
    """Side-by-side raw totals vs per-capita (assignment: why rates matter)."""
    world_proj = reproject_gdf(gdf.copy(), PROJ_KEY)
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(20, 7))
    fig.patch.set_facecolor("white")
    fig.suptitle(
        "Raw counts vs per-capita: why normalisation matters",
        fontsize=15,
        fontweight="bold",
    )
    world_proj[world_proj["co2_total"].isna()].plot(
        ax=ax1, color="#ddd", linewidth=0.3, edgecolor="#aaa"
    )
    world_proj.dropna(subset=["co2_total"]).plot(
        column="co2_total",
        ax=ax1,
        scheme="Quantiles",
        k=N_CLASSES,
        cmap=STYLE["sequential_palette"],
        legend=True,
        legend_kwds={
            "title": "Total CO₂ (Mt)",
            "loc": "lower left",
            "fontsize": 8,
        },
        linewidth=0.3,
        edgecolor="#555",
        missing_kwds={"color": "#ddd"},
    )
    ax1.set_axis_off()
    ax1.set_title(
        "Misleading: raw total CO₂\n(large countries dominate by area/mass)",
        color="#b91c1c",
        fontsize=11,
        fontweight="bold",
    )
    world_proj[world_proj[VARIABLE].isna()].plot(
        ax=ax2, color="#ddd", linewidth=0.3, edgecolor="#aaa"
    )
    world_proj.dropna(subset=[VARIABLE]).plot(
        column=VARIABLE,
        ax=ax2,
        scheme="Quantiles",
        k=N_CLASSES,
        cmap=STYLE["sequential_palette"],
        legend=True,
        legend_kwds={
            "title": "CO₂ per capita (t)",
            "loc": "lower left",
            "fontsize": 8,
        },
        linewidth=0.3,
        edgecolor="#555",
        missing_kwds={"color": "#ddd"},
    )
    ax2.set_axis_off()
    ax2.set_title(
        "Preferred: CO₂ per capita\n(intensity per person)",
        color="#15803d",
        fontsize=11,
        fontweight="bold",
    )
    plt.tight_layout()
    save_figure(fig, PATHS["fig_part2"] / "raw_vs_normalised_comparison.png")
    plt.close(fig)


def plot_large_area_bias(gdf: gpd.GeoDataFrame) -> None:
    """Annotated map discussing large-polygon visual bias."""
    world_proj = reproject_gdf(gdf.copy(), PROJ_KEY)
    fig, ax = plt.subplots(figsize=(18, 9))
    fig.patch.set_facecolor("white")
    ax.set_facecolor(STYLE["ocean_color"])
    world_proj.dropna(subset=[VARIABLE]).plot(
        column=VARIABLE,
        ax=ax,
        scheme="Quantiles",
        k=N_CLASSES,
        cmap=STYLE["sequential_palette"],
        legend=True,
        legend_kwds={
            "title": "CO₂/capita (t)",
            "loc": "lower left",
            "fontsize": 9,
        },
        linewidth=0.3,
        edgecolor="#666",
        missing_kwds={"color": "#ddd"},
    )
    annotations = {
        "Russia\n(large area, medium intensity)": (7_500_000, 7_000_000),
        "Canada\n(large area, high intensity)": (-8_500_000, 6_500_000),
        "Qatar\n(tiny, high intensity)": (5_700_000, 2_800_000),
        "Gulf states\n(small polygons)": (5_200_000, 2_200_000),
    }
    for text, xy in annotations.items():
        ax.annotate(
            text,
            xy=xy,
            fontsize=8,
            color="#222",
            bbox=dict(boxstyle="round,pad=0.3", fc="lightyellow", ec="orange", alpha=0.9),
        )
    ax.set_axis_off()
    add_map_annotations(
        ax,
        title="Large-area visual bias in standard choropleths",
        subtitle="Large regions draw the eye; small high-intensity areas are easy to miss",
        source="Our World in Data (OWID), 2020",
        projection_name=PROJ_KEY,
        year=YEAR,
    )
    save_figure(fig, PATHS["fig_part2"] / "large_area_bias_annotated.png")
    plt.close(fig)


def plot_four_classification_schemes(gdf: gpd.GeoDataFrame) -> None:
    """2×2 panel comparing four classifiers (matches web gallery + assignment table)."""
    world_proj = reproject_gdf(gdf.copy(), PROJ_KEY)
    schemes = [
        ("Quantiles", "Quantiles"),
        ("NaturalBreaks", "Natural breaks (Jenks)"),
        ("EqualInterval", "Equal interval"),
        ("JenksCaspall", "Jenks Caspall"),
    ]
    fig, axes = plt.subplots(2, 2, figsize=(18, 12))
    fig.patch.set_facecolor("white")
    axes = axes.ravel()
    for ax, (scheme, label) in zip(axes, schemes):
        ax.set_facecolor(STYLE["ocean_color"])
        world_proj[world_proj[VARIABLE].isna()].plot(
            ax=ax,
            color=STYLE["missing_data_color"],
            linewidth=0.2,
            edgecolor=STYLE["boundary_color"],
        )
        world_proj.dropna(subset=[VARIABLE]).plot(
            column=VARIABLE,
            ax=ax,
            scheme=scheme,
            k=N_CLASSES,
            cmap=STYLE["sequential_palette"],
            legend=True,
            legend_kwds={
                "title": VAR_LABEL,
                "fontsize": 6,
                "loc": "lower left",
                "fmt": "{:.1f}",
            },
            linewidth=0.25,
            edgecolor=STYLE["boundary_color"],
            missing_kwds={"color": STYLE["missing_data_color"]},
        )
        ax.set_axis_off()
        ax.set_title(label, fontsize=11)
    fig.suptitle(
        f"Classification schemes compared — CO₂ per capita ({YEAR})",
        fontsize=14,
        fontweight="bold",
    )
    plt.tight_layout()
    save_figure(fig, PATHS["fig_part2"] / "four_classification_schemes.png")
    plt.close(fig)


def save_classification_comparison(gdf: gpd.GeoDataFrame):
    """
    Build and save a statistical table comparing classification bin thresholds.

    Calculates Quantiles, Natural Breaks, Equal Interval, and Jenks Caspall 
    boundaries, appending statistical variance metrics (ADCM, GVF).

    Args:
        gdf (gpd.GeoDataFrame): Input spatial database.

    Returns:
        pd.DataFrame: A formatted pandas DataFrame containing the statistical comparison.
    """
    data = gdf[VARIABLE].dropna()

    schemes = {
        "Quantiles": mc.Quantiles(data, k=N_CLASSES),
        "Natural Breaks": mc.NaturalBreaks(data, k=N_CLASSES),
        "Equal Interval": mc.EqualInterval(data, k=N_CLASSES),
        "Jenks Caspall": mc.JenksCaspall(data, k=N_CLASSES),
    }

    rows = []
    for name, classifier in schemes.items():
        bins = [round(b, 2) for b in classifier.bins]
        rows.append(
            {
                "Method": name,
                "Bin boundaries": " | ".join(map(str, bins)),
                "ADCM": round(
                    classifier.adcm, 3
                ),  # absolute deviation around class means
                "GVF": (
                    round(
                        1 - classifier.adcm / mc.MaximumBreaks(data, k=N_CLASSES).adcm,
                        3,
                    )
                    if name != "Equal Interval"
                    else "—"
                ),
            }
        )

    df = pd.DataFrame(rows)
    out = PATHS["fig_part2"] / "classification_comparison.csv"
    df.to_csv(out, index=False)
    print(f"   Classification comparison saved: {out.name}")
    print(df.to_string(index=False))
    return df


CRITIQUE = """
PART 2 – CHOROPLETH CRITIQUE
==============================

WHY RATIO / RATE DATA MUST BE USED INSTEAD OF RAW COUNTS
---------------------------------------------------------
A choropleth encodes a variable as a fill colour covering the entire area of
a region. If raw counts (e.g. total tonnes of CO₂) are mapped, larger countries
will always appear darker simply because they contain more people, industry, and
land — not because they are more intensive emitters per capita. China's total
emissions dwarf Luxembourg's, but Luxembourg's per-capita emissions exceed many
industrialised countries. Mapping raw counts would systematically mislead the
reader. Normalisation by population (producing per-capita rates) or area
(producing density values) is therefore mandatory for choropleth maps.

HOW REGION SIZE AFFECTS INTERPRETATION
---------------------------------------
Even with normalised data, large low-population-density regions (Russia, Canada,
Australia, the Sahara states) dominate the visual field simply because of their
physical size. The reader's eye is drawn to large coloured polygons, causing
visual over-weighting of large-but-sparse regions and under-weighting of small
but populous or intensive regions (the Netherlands, South Korea, Singapore).
This is the "large area bias" inherent to standard geographic choropleths and
motivates the use of cartograms (Part 6).

CLASSIFICATION METHOD EFFECTS
-------------------------------
Quantiles: Forces equal numbers of countries into each bin. Maximises colour
contrast and readability but can place countries with very different values into
the same class, or split a natural cluster across classes.

Natural Breaks (Jenks): Minimises within-class variance. Bins reflect natural
data clusters, making statistical sense — but bin boundaries shift with every
new dataset, making cross-map comparison harder.

Equal Interval: Divides the data range into equal-width bins. Intuitive and
comparable across years, but highly sensitive to outliers: if Qatar emits 30
t/capita while most countries emit 1–5, the top bin spans a huge range that
captures only a handful of outliers.

WHEN CHOROPLETHS MISLEAD
--------------------------
1. Raw count data mapped directly (see above).
2. Highly skewed distributions where most countries cluster in one bin.
3. Comparing regions of radically different geographic sizes.
4. Categorical data (e.g. political party) mapped with sequential colour ramps
   implying order or magnitude where none exists.
5. Missing data countries coloured with a colour from the main ramp rather
   than a distinct neutral grey.
"""


def run():
    print("=" * 60)
    print("  Part 2 — Choropleth Map")
    print("=" * 60)
    PATHS["fig_part2"].mkdir(parents=True, exist_ok=True)

    gdf = load_data()

    print("\n[1/6] Quantiles choropleth...")
    plot_choropleth(gdf, "Quantiles", "Quantiles", "map_quantiles.png")

    print("\n[2/6] Natural Breaks choropleth...")
    plot_choropleth(
        gdf, "NaturalBreaks", "Natural Breaks (Jenks)", "map_natural_breaks.png"
    )

    print("\n[3/6] Equal Interval choropleth...")
    plot_choropleth(
        gdf, "EqualInterval", "Equal Interval", "map_equal_interval.png"
    )

    print("\n[4/6] Raw vs normalised + large-area bias + 4-way comparison...")
    plot_raw_vs_normalised_comparison(gdf)
    plot_large_area_bias(gdf)
    plot_four_classification_schemes(gdf)

    print("\n[5/6] Saving classification comparison table...")
    save_classification_comparison(gdf)

    out = PATHS["fig_part2"] / "part2_critique.txt"
    out.write_text(CRITIQUE.strip(), encoding="utf-8")
    print(f"   Critique saved: {out.name}")

    print("\n[6/6] Part 2 complete.")


if __name__ == "__main__":
    run()
