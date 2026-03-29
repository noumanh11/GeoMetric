"""Lightweight tests for map utilities (no GeoJSON required)."""

import geopandas as gpd
from shapely.geometry import Point

from scripts.utils.map_utils import reproject_gdf
from scripts.utils.config import PROJECTIONS


def test_reproject_gdf_wgs84():
    gdf = gpd.GeoDataFrame(
        {"name": ["a"]},
        geometry=[Point(0, 0)],
        crs="EPSG:4326",
    )
    out = reproject_gdf(gdf, "EPSG:3857")
    assert out.crs.to_string() == "EPSG:3857"


def test_reproject_named_projection():
    gdf = gpd.GeoDataFrame(
        {"name": ["a"]},
        geometry=[Point(10, 50)],
        crs="EPSG:4326",
    )
    out = reproject_gdf(gdf, "robinson")
    assert out.crs is not None
