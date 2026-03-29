# Dataset inventory (Assignment — Part 0)

Minimum four dataset categories are covered: **polygons**, **points**, **flows**, and a **continuous field** (temperature stations). Sources align with the assignment brief (Natural Earth, Our World in Data, World Bank, OpenFlights, project temperature extract).

| Dataset | Source | Type | Geometry | Extent | Variables used | Why selected |
|--------|--------|------|----------|--------|----------------|--------------|
| Natural Earth 110m admin countries | Natural Earth (via GeoJSON) | GeoJSON / GPKG | Polygon | Global | `geometry`, ISO, names, population | World choropleths, joins, projections |
| OWID CO₂ and greenhouse gas series | Our World in Data | CSV | — (joined to polygons) | Global countries | `co2_per_capita`, `co2_total`, `population` | Thematic maps, normalisation critique |
| World Bank population | datasets/population on GitHub | CSV | — | Global | Population totals | Choropleth denominators, cartogram weights |
| OpenFlights airports & routes | OpenFlights (airports.dat, routes.dat) | DAT / CSV | Points (airports), OD pairs (routes) | Global sample | IATA, coords, route counts | Proportional symbols, flow map, network metrics |
| Temperature stations | Berkeley-style / project CSV in `data/raw/temperature` | CSV | Point | Global sample | `lat`, `lon`, mean temperature | Interpolation, contours (continuous field) |
| World Bank GDP / migration (optional layers) | World Bank API exports | CSV / ZIP | — | Global | GDP, net migration | Scenario maps, dashboard attributes |

Joins are documented in `scripts/utils/preprocess.py` (e.g. world + emissions + population → `master_world.gpkg`). Assumptions and limitations for each analytical part are in the generated `part*_*.txt` files under `outputs/figures/`.
