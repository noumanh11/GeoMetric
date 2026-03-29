# Workflow — GeoMetric

End-to-end flow from downloads to figures and optional bonus HTML exports. Configuration lives in `scripts/utils/config.py`; do not hardcode paths or DPI in part scripts.

## Data flow (Mermaid)

The diagram below renders on GitHub (and in most Markdown viewers that support Mermaid).

```mermaid
flowchart TB
  subgraph sources["External sources"]
    NE["Natural Earth GeoJSON"]
    OWID["OWID CO₂ CSV"]
    WB["World Bank / population CSVs"]
    OF["OpenFlights airports + routes"]
    TMP["Temperature stations CSV"]
  end

  DL["data_loader.py\n→ data/raw/"]

  subgraph raw["data/raw/"]
    R1["shapefiles/ / GeoJSON markers"]
    R2["emissions/"]
    R3["population/"]
    R4["airports/"]
    R5["temperature/"]
    R6["gdp/ · migration/"]
  end

  PP["preprocess.py\n→ data/processed/"]

  subgraph proc["data/processed/"]
    P1["world_countries.gpkg"]
    P2["master_world.gpkg"]
    P3["airports_clean.csv · routes_clean.csv"]
    P4["temperature_stations.csv"]
  end

  subgraph parts["scripts/parts/ (1–7)"]
    P1s["part1_projections.py"]
    P2s["part2_choropleth.py"]
    P3s["part3_proportional.py"]
    P4s["part4_flow.py"]
    P5s["part5_contour.py"]
    P6s["part6_cartogram.py"]
    P7s["part7_scenarios.py"]
  end

  subgraph out["outputs/"]
    FIG["figures/part*/\nPNG maps"]
    INT["interactive/\nFolium · Plotly HTML"]
  end

  subgraph bonus["scripts/bonus/ (optional)"]
    B1["bonus_animation.py"]
    B2["bonus_morans_i.py"]
    BD["bonus_dashboard.py\n(live server, not batch)"]
  end

  NE --> DL
  OWID --> DL
  WB --> DL
  OF --> DL
  TMP --> DL

  DL --> raw
  raw --> PP
  PP --> proc

  proc --> parts
  parts --> FIG
  parts --> INT

  proc --> bonus
  bonus --> INT

  FIG --> REP["report/report.pdf\n(manual compile)"]
```

## Orchestration

| Command | Purpose |
|--------|---------|
| `python scripts/utils/data_loader.py` | Download raw files |
| `python scripts/utils/preprocess.py` | Build `data/processed/` |
| `python run_all.py` | Full pipeline (parts 1–7) |
| `python run_all.py --draft` | Same, 150 DPI |
| `python run_all.py --skip-download --skip-preprocess` | Regenerate figures only |
| `python run_all.py --bonus --skip-download --skip-preprocess` | Batch bonus HTML only (animation + Moran) |
| `make` | See `Makefile` for venv-based shortcuts |

## Config system

- **PATHS** — directories and output roots  
- **PROJECTIONS** — CRS strings for all maps  
- **STYLE** — figure size, DPI, palettes  
- **DATASETS** — download URLs  

Use `map_utils.save_figure()` and `map_utils.reproject_gdf()` consistently.

## Testing

```bash
pytest tests/ -v
```

## Conventions

- Static maps: `outputs/figures/partN_*/` at 300 DPI (`save_figure`, final mode).  
- Interactive: `outputs/interactive/` (Folium / Plotly `write_html`).  
- Dash app (`bonus_dashboard.py`) runs interactively; it is not invoked by `run_all.py` (no blocking server).
