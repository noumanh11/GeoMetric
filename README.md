# GeoMetric

Multi-map spatial analytics portfolio in Python: projections, choropleths, proportional symbols, flows, continuous-field mapping, cartograms, and scenario-based map design, with optional interactive exports (Folium, Plotly, Dash) and spatial statistics (Moran’s I, LISA).

## Requirements

- Python 3.10+ (3.11–3.12 recommended; see `requirements.txt` for optional notes on Python 3.13).
- Install: `pip install -r requirements.txt`  
  On Windows, if `cartopy` fails via pip, install it from conda-forge first, then re-run pip for the rest.

## Quick start

1. Create and activate a virtual environment.
2. `pip install -r requirements.txt`
3. Download raw data: `python scripts/utils/data_loader.py`
4. Preprocess: `python scripts/utils/preprocess.py`
5. Generate all maps: `python run_all.py`  
   - Draft (150 DPI): `python run_all.py --draft`  
   - Selected parts: `python run_all.py --parts 1 2 3`  
   - Skip download/preprocess if data already built: `--skip-download` / `--skip-preprocess`
6. Optional batch bonus HTML (animation + Moran figures):  
   `python run_all.py --bonus --skip-download --skip-preprocess`  
   The Plotly Dash dashboard is started separately: `python scripts/bonus/bonus_dashboard.py` (opens port 8050).

Alternatively use `make` targets if you use the bundled `.geovenv` layout (see `Makefile`).

## Repository layout

```
GeoMetric/
├── data/                 # raw/ + processed/ (generated; see .gitignore)
├── notebooks/            # One notebook per part + setup
├── scripts/
│   ├── utils/            # config, data_loader, preprocess, map_utils
│   ├── parts/            # part1_projections … part7_scenarios
│   └── bonus/            # dashboard, animation, Moran's I
├── outputs/
│   ├── figures/          # PNG maps (300 DPI by default)
│   └── interactive/      # HTML (Folium, Plotly, static dashboard export)
├── webapp/               # Optional static gallery + Leaflet explorer (serve repo root)
├── docs/                 # WORKFLOW.md, dataset_inventory.md, assignment notes
├── report/               # GeoMetric_Report.tex; build PDF via online Overleaf-Latex
├── tests/                # pytest
├── run_all.py            # Pipeline entrypoint
├── requirements.txt
└── README.md
```

### Report (PDF)

- Manuscript: [`report/GeoMetric_Report.md`](report/GeoMetric_Report.md) (8–12 pages when exported; trim figures if needed).
- Build instructions: [`report/BUILD_PDF.md`](report/BUILD_PDF.md).
- After maps exist: `python scripts/build_report_pdf.py` (needs [Pandoc](https://pandoc.org/) + LaTeX), or `python scripts/build_report_pdf.py --html` then print the HTML to PDF.

## Documentation

- **Workflow and data-flow diagram (Mermaid):** [`docs/WORKFLOW.md`](docs/WORKFLOW.md)  
- **Dataset inventory (Part 0 table):** [`docs/dataset_inventory.md`](docs/dataset_inventory.md)  
- **Assignment text:** `docs/assignment_requirements.txt`

## Assignment alignment (summary)

- **Part 0:** Multiple dataset categories documented; see `docs/dataset_inventory.md`.  
- **Parts 1–7:** Implemented in `scripts/parts/` with narratives and CSV/table outputs under `outputs/figures/`.  
- **Deliverables:** Python scripts + notebooks, PNG figures, at least one interactive HTML map (e.g. Folium/Plotly under `outputs/interactive/`), plus the separate PDF report.  
- **Stack:** pandas, GeoPandas, Matplotlib, mapclassify, Folium, Plotly, SciPy, NetworkX, contextily (available for basemaps where used), optional PySAL stack for bonus Moran/LISA.

## Testing

```bash
pytest tests/ -v
```

## Web gallery (optional)

From the repository root: `python -m http.server 8765` and open `http://localhost:8765/webapp/` so paths to `/outputs/` and `/asset/` resolve.

## Data sources (licences)

Natural Earth (public domain); Our World in Data (CC BY 4.0); World Bank (CC BY 4.0); OpenFlights (ODbL); temperature source as documented in preprocessing. See figure captions and text outputs for citations.

## Author

Muhammad Nouman Hafeez — FAST-NUCES, Islamabad.
