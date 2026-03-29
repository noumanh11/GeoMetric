/**
 * GeoMetric unified gallery + Leaflet explorer.
 * Serve repo root:  python -m http.server 8765
 * Open: http://localhost:8765/webapp/
 */

const BASE = "";

const NE_GEOJSON =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson";

const MANIFEST = {
  story: {
    logo: `${BASE}/asset/geo_metric_logo_transparent.png`,
    pics: [
      {
        src: `${BASE}/asset/pic1.png`,
        title: "Data & geography",
        body: "Multiple open datasets—boundaries, emissions, mobility, and climate stations—are joined into one analytical view.",
      },
      {
        src: `${BASE}/asset/pic2.png`,
        title: "Cartographic methods",
        body: "From projections and choropleths to flow lines and cartograms, each technique highlights different truths in the same numbers.",
      },
      {
        src: `${BASE}/asset/pic3.png`,
        title: "Interactive analysis",
        body: "Explore layers on the map, open CSV tables, and embed prior Plotly / Folium / animation exports in one place.",
      },
    ],
  },
  parts: [
    {
      id: "part1",
      title: "Part 1 — Projections",
      blurb: "Thematic CO₂ per capita in Albers, Lambert Conformal, and Winkel Tripel. Includes projection comparison table and discussion.",
      figures: [
        { file: "map_albers_equal_area.png", alt: "CO₂ per capita — Albers equal-area" },
        { file: "map_lambert_conformal.png", alt: "CO₂ per capita — Lambert conformal" },
        { file: "map_lambert_conformal_conic.png", alt: "CO₂ per capita — Lambert (alternate export)" },
        { file: "map_winkel_tripel.png", alt: "CO₂ per capita — Winkel Tripel" },
        { file: "all_three_projections_comparison.png", alt: "Combined three-map comparison layout" },
        { file: "tissot_indicatrix.png", alt: "Tissot indicatrix / distortion readout" },
      ],
      altFigures: ["map_albers.png", "map_lambert.png", "map_winkel.png"],
      folder: "part1_projections",
      csv: [`${BASE}/outputs/figures/part1_projections/projection_comparison_table.csv`],
      texts: [`${BASE}/outputs/figures/part1_projections/part1_discussion.txt`],
    },
    {
      id: "part2",
      title: "Part 2 — Choropleth classification",
      blurb: "Quantiles vs natural breaks (Jenks) for the same variable—classification changes the story on the map.",
      figures: [
        { file: "map_quantiles.png", alt: "Choropleth — quantiles" },
        { file: "map_natural_breaks.png", alt: "Choropleth — natural breaks" },
        { file: "map_equal_interval.png", alt: "Choropleth — equal interval" },
        { file: "four_classification_schemes.png", alt: "Four classification schemes compared" },
        { file: "raw_vs_normalised_comparison.png", alt: "Raw vs normalised data comparison" },
        { file: "large_area_bias_annotated.png", alt: "Large-area bias annotation" },
      ],
      folder: "part2_choropleth",
      csv: [`${BASE}/outputs/figures/part2_choropleth/classification_comparison.csv`],
      texts: [`${BASE}/outputs/figures/part2_choropleth/part2_critique.txt`],
    },
    {
      id: "part3",
      title: "Part 3 — Proportional symbols",
      blurb: "Static matplotlib map plus an interactive Folium proportional-symbol export.",
      figures: [
        { file: "map_proportional_static.png", alt: "Proportional symbol map (static)" },
        { file: "radius_vs_area_scaling.png", alt: "Radius vs area symbol scaling" },
      ],
      folder: "part3_proportional",
      csv: [],
      texts: [`${BASE}/outputs/figures/part3_proportional/part3_comparison.txt`],
      embeds: [
        {
          title: "Folium — airport traffic (interactive)",
          src: `${BASE}/outputs/interactive/folium_maps/airports_proportional.html`,
          height: 560,
        },
      ],
    },
    {
      id: "part4",
      title: "Part 4 — Flow map",
      blurb: "Dominant airline routes drawn as flows; network summary in CSV.",
      figures: [
        { file: "map_flow_routes.png", alt: "Airline route flow map" },
        { file: "network_graph.png", alt: "Network graph view" },
      ],
      folder: "part4_flow",
      csv: [`${BASE}/outputs/figures/part4_flow/network_summary_table.csv`],
      texts: [`${BASE}/outputs/figures/part4_flow/part4_interpretation.txt`],
    },
    {
      id: "part5",
      title: "Part 5 — Temperature & contours",
      blurb: "Station points and interpolated isopleths.",
      figures: [
        { file: "map_temperature_points.png", alt: "Temperature stations" },
        { file: "map_temperature_contour.png", alt: "Temperature contours" },
        { file: "rbf_vs_idw_comparison.png", alt: "RBF vs IDW interpolation comparison" },
      ],
      folder: "part5_contour",
      csv: [],
      texts: [`${BASE}/outputs/figures/part5_contour/part5_interpretation.txt`],
    },
    {
      id: "part6",
      title: "Part 6 — Cartogram",
      blurb: "Geographic basemap vs Dorling-style density cartogram.",
      figures: [
        { file: "map_standard_geographic.png", alt: "Standard geographic map" },
        { file: "map_dorling_cartogram.png", alt: "Dorling cartogram" },
        { file: "geographic_vs_cartogram_comparison.png", alt: "Geographic vs cartogram side-by-side" },
      ],
      folder: "part6_cartogram",
      csv: [],
      texts: [`${BASE}/outputs/figures/part6_cartogram/part6_critique.txt`],
    },
    {
      id: "part7",
      title: "Part 7 — Scenarios",
      blurb: "Three designed scenarios (public health, urban services, climate risk).",
      figures: [
        { file: "scenario_a_public_health.png", alt: "Scenario A — public health" },
        { file: "scenario_b_urban_services.png", alt: "Scenario B — urban services" },
        { file: "scenario_c_climate_risk.png", alt: "Scenario C — climate risk" },
      ],
      folder: "part7_scenarios",
      csv: [],
      texts: [`${BASE}/outputs/figures/part7_scenarios/part7_design_decisions.txt`],
    },
  ],
  bonus: {
    title: "Bonus — Spatial statistics",
    blurb: "LISA cluster map and Moran scatter; results summary as text.",
    figures: [
      { file: "map_lisa_clusters.png", alt: "LISA clusters" },
      { file: "morans_i_scatter.png", alt: "Moran scatter plot" },
    ],
    folder: "bonus",
    texts: [`${BASE}/outputs/figures/bonus/morans_i_results.txt`],
  },
  interactive: [
    {
      title: "Plotly static dashboard (previous export)",
      src: `${BASE}/outputs/interactive/dashboards/geometric_dashboard.html`,
      height: 920,
    },
    {
      title: "Temporal CO₂ choropleth animation",
      src: `${BASE}/outputs/interactive/animations/co2_animation.html`,
      height: 640,
    },
  ],
};

const SQUARE_ASPECT_FIGURES = new Set([
  "all_three_projections_comparison.png",
  "tissot_indicatrix.png",
  "raw_vs_normalised_comparison.png",
  "radius_vs_area_scaling.png",
  "rbf_vs_idw_comparison.png",
  "geographic_vs_cartogram_comparison.png",
  "map_lisa_clusters.png",
]);

function prefersSquareFigure(filename) {
  return SQUARE_ASPECT_FIGURES.has(filename);
}

function updateFigureGridToggleState(gridEl) {
  gridEl.querySelectorAll(".fig-card").forEach((figure) => {
    const btn = figure.querySelector(".fig-card-btn--toggle");
    if (!btn) return;
    const c = figure.classList.contains("fig-card--collapsed");
    btn.textContent = c ? "Show" : "Hide";
    btn.setAttribute("aria-expanded", c ? "false" : "true");
  });
}

function buildFigureGridControls(gridEl) {
  const bar = el("div", "figure-grid-controls");
  const label = el("span", "figure-grid-controls-label", "Figures");
  const expandAll = el("button", "fig-grid-btn", "Show all");
  const collapseAll = el("button", "fig-grid-btn", "Hide all");
  expandAll.type = "button";
  collapseAll.type = "button";
  expandAll.addEventListener("click", () => {
    gridEl.querySelectorAll(".fig-card").forEach((f) => f.classList.remove("fig-card--collapsed"));
    updateFigureGridToggleState(gridEl);
  });
  collapseAll.addEventListener("click", () => {
    gridEl.querySelectorAll(".fig-card").forEach((f) => f.classList.add("fig-card--collapsed"));
    updateFigureGridToggleState(gridEl);
  });
  bar.appendChild(label);
  bar.appendChild(expandAll);
  bar.appendChild(collapseAll);
  return bar;
}

function openFigureLightbox(src, caption) {
  const lb = document.getElementById("figure-lightbox");
  if (!lb || !src) return;
  const img = lb.querySelector(".figure-lightbox-imgwrap img");
  const cap = lb.querySelector(".figure-lightbox-caption");
  if (img) {
    img.src = src;
    img.alt = caption || "";
  }
  if (cap) cap.textContent = caption || "";
  lb.classList.add("is-open");
  lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeFigureLightbox() {
  const lb = document.getElementById("figure-lightbox");
  if (!lb || !lb.classList.contains("is-open")) return;
  lb.classList.remove("is-open");
  lb.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function initFigureLightbox() {
  const lb = document.getElementById("figure-lightbox");
  if (!lb) return;
  const backdrop = lb.querySelector(".figure-lightbox-backdrop");
  const closeBtn = lb.querySelector(".figure-lightbox-close");
  const close = () => closeFigureLightbox();
  if (backdrop) backdrop.addEventListener("click", close);
  if (closeBtn) closeBtn.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lb.classList.contains("is-open")) close();
  });
}

function el(tag, cls, html) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
}

function missingNote(label) {
  const d = el("div", "missing-asset");
  d.textContent = `Asset missing (${label}). Run the pipeline to generate outputs, then refresh.`;
  return d;
}

function buildFigureCard(folder, item, altNames, idx) {
  const wrap = el("div", "fig-card-wrap");
  const figure = el("figure", "fig-card");
  const toolbar = el("div", "fig-card-toolbar");
  const zoomBtn = el("button", "fig-card-btn fig-card-btn--zoom", "Enlarge");
  zoomBtn.type = "button";
  zoomBtn.setAttribute("aria-label", "Open figure at full size");
  const collapseBtn = el("button", "fig-card-btn fig-card-btn--toggle", "Hide");
  collapseBtn.type = "button";
  collapseBtn.setAttribute("aria-expanded", "true");
  collapseBtn.setAttribute("aria-label", "Hide or show this figure in the grid");
  toolbar.appendChild(zoomBtn);
  toolbar.appendChild(collapseBtn);

  const media = el("div", "fig-card-media");
  if (prefersSquareFigure(item.file)) media.classList.add("fig-card-media--square");

  const img = document.createElement("img");
  const primary = `${BASE}/outputs/figures/${folder}/${item.file}`;
  img.src = primary;
  img.alt = item.alt;
  img.loading = "lazy";
  img.decoding = "async";
  img.title = "Click to enlarge";
  img.onerror = () => {
    const fallback = altNames && altNames[idx];
    if (fallback && img.dataset.tried !== "1") {
      img.dataset.tried = "1";
      img.src = `${BASE}/outputs/figures/${folder}/${fallback}`;
      return;
    }
    img.replaceWith(missingNote(item.file));
    zoomBtn.disabled = true;
    zoomBtn.classList.add("is-disabled");
  };
  media.appendChild(img);

  const cap = el("figcaption", null, item.alt);

  const syncGrid = () => {
    const grid = wrap.closest(".figure-grid");
    if (grid) updateFigureGridToggleState(grid);
  };

  const openLb = () => {
    const i = media.querySelector("img");
    if (!i || !i.getAttribute("src")) return;
    openFigureLightbox(i.currentSrc || i.src, item.alt);
  };

  zoomBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openLb();
  });
  img.addEventListener("click", openLb);
  collapseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    figure.classList.toggle("fig-card--collapsed");
    syncGrid();
  });
  cap.addEventListener("click", () => {
    if (figure.classList.contains("fig-card--collapsed")) {
      figure.classList.remove("fig-card--collapsed");
      syncGrid();
    }
  });

  figure.appendChild(toolbar);
  figure.appendChild(media);
  figure.appendChild(cap);
  wrap.appendChild(figure);
  return wrap;
}

function renderStory() {
  const logo = document.getElementById("story-logo");
  if (logo) {
    logo.src = MANIFEST.story.logo;
    logo.onerror = () => logo.classList.add("hidden");
  }
  const grid = document.getElementById("story-grid");
  if (!grid) return;
  grid.innerHTML = "";
  MANIFEST.story.pics.forEach((p) => {
    const card = el("article", "story-card");
    const img = document.createElement("img");
    img.src = p.src;
    img.alt = p.title;
    img.loading = "lazy";
    img.onerror = () => img.replaceWith(missingNote(p.src.split("/").pop()));
    const body = el("div", "body");
    body.appendChild(el("h4", null, p.title));
    body.appendChild(el("p", null, p.body));
    card.appendChild(img);
    card.appendChild(body);
    grid.appendChild(card);
  });
}

function renderPartSections() {
  MANIFEST.parts.forEach((part) => {
    const host = document.getElementById(`figures-${part.id}`);
    if (!host) return;
    host.innerHTML = "";
    host.appendChild(buildFigureGridControls(host));
    part.figures.forEach((fig, i) => {
      host.appendChild(
        buildFigureCard(part.folder, fig, part.altFigures || null, i)
      );
    });

    const csvHost = document.getElementById(`csv-${part.id}`);
    if (csvHost) {
      csvHost.innerHTML = "";
      (part.csv || []).forEach((url) => loadCsvInto(url, csvHost));
    }

    const txtHost = document.getElementById(`text-${part.id}`);
    if (txtHost) {
      txtHost.innerHTML = "";
      (part.texts || []).forEach((url) => loadTextInto(url, txtHost));
    }

    const embHost = document.getElementById(`embed-${part.id}`);
    if (embHost && part.embeds) {
      embHost.innerHTML = "";
      part.embeds.forEach((e) => embHost.appendChild(makeEmbed(e)));
    }
  });

  const b = MANIFEST.bonus;
  const bf = document.getElementById("figures-bonus");
  if (bf) {
    bf.innerHTML = "";
    bf.appendChild(buildFigureGridControls(bf));
    b.figures.forEach((fig, i) =>
      bf.appendChild(buildFigureCard(b.folder, fig, null, i))
    );
  }
  const bt = document.getElementById("text-bonus");
  if (bt) {
    bt.innerHTML = "";
    (b.texts || []).forEach((url) => loadTextInto(url, bt));
  }

  const ih = document.getElementById("interactive-host");
  if (ih) {
    ih.innerHTML = "";
    MANIFEST.interactive.forEach((e) => ih.appendChild(makeEmbed(e)));
  }
}

function makeEmbed({ title, src, height }) {
  const wrap = el("div", "embed-wrap");
  wrap.appendChild(el("div", "embed-header", title));
  const iframe = document.createElement("iframe");
  iframe.title = title;
  iframe.src = src;
  iframe.style.height = `${height}px`;
  iframe.loading = "lazy";
  wrap.appendChild(iframe);
  const actions = el("div", "embed-actions");
  const a = document.createElement("a");
  a.href = src;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.textContent = "Open full page in new tab →";
  actions.appendChild(a);
  wrap.appendChild(actions);
  return wrap;
}

function escapeHtml(str) {
  const d = document.createElement("div");
  d.textContent = str == null ? "" : String(str);
  return d.innerHTML;
}

function parseCellNumber(val) {
  if (val === "" || val == null) return null;
  const n = Number(val);
  return Number.isFinite(n) ? n : null;
}

function columnNumericStats(rows, col) {
  const vals = [];
  rows.forEach((row) => {
    const n = parseCellNumber(row[col]);
    if (n != null) vals.push(n);
  });
  if (!vals.length) return null;
  return { min: Math.min(...vals), max: Math.max(...vals) };
}

function isMostlyNumericColumn(rows, col) {
  let num = 0;
  let tot = 0;
  rows.forEach((row) => {
    const v = row[col];
    if (v === "" || v == null) return;
    tot++;
    if (parseCellNumber(v) != null) num++;
  });
  return tot > 0 && num / tot >= 0.75;
}

function formatNumericDisplay(val, colName) {
  const n = parseCellNumber(val);
  if (n == null) return val === "" || val == null ? "—" : String(val);
  const c = (colName || "").toLowerCase();
  if (c.includes("degree") || c.includes("weighted"))
    return Math.round(n).toLocaleString();
  if (Math.abs(n) < 0.0001 && n !== 0) return n.toExponential(2);
  if (Math.abs(n) >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 1 });
  if (Math.abs(n) < 1 && Math.abs(n) > 0) return n.toFixed(4).replace(/\.?0+$/, "");
  return n.toLocaleString(undefined, { maximumFractionDigits: 3 });
}

function heatStyleADCM(val, min, max) {
  if (typeof chroma === "undefined" || val == null) return {};
  if (min === max) {
    const bg = "#115e59";
    return { background: bg, color: "#ccfbf1" };
  }
  const t = (val - min) / (max - min);
  const bg = chroma.scale(["#115e59", "#0d9488", "#5eead4", "#fde047", "#fb7185", "#7f1d1d"]).mode("lch")(t).hex();
  const fg = chroma(bg).luminance() > 0.4 ? "#1e2630" : "#f8fafc";
  return { background: bg, color: fg };
}

function heatStyleMetric(val, min, max) {
  if (typeof chroma === "undefined" || val == null) return {};
  if (min === max) {
    const bg = "rgba(94, 234, 212, 0.15)";
    return { background: bg, color: "var(--text)" };
  }
  const t = (val - min) / (max - min);
  const bg = chroma.scale(["#115e59", "#0d9488", "#5eead4", "#fbbf24", "#ea580c"]).mode("lch")(t).hex();
  const fg = chroma(bg).luminance() > 0.42 ? "#1e2630" : "#f8fafc";
  return { background: bg, color: fg };
}

function formatBinChips(text) {
  if (!text || text === "—") return "—";
  const parts = String(text).split(/\s*\|\s*/);
  return parts
    .map((p) => `<span class="bin-chip">${escapeHtml(p.trim())}</span>`)
    .join(" ");
}

function tableProfileFromFilename(filename) {
  const f = filename.toLowerCase();
  if (f.includes("classification_comparison")) return "classification";
  if (f.includes("network_summary")) return "network";
  if (f.includes("projection_comparison")) return "projection";
  return "default";
}

function buildVizTable(parsed, filename) {
  const rows = parsed.data.slice(0, 500);
  const cols = parsed.meta.fields || Object.keys(rows[0] || {});
  const profile = tableProfileFromFilename(filename);

  const shell = el("div", "viz-table-shell");
  const hint = el("div", "table-hint");
  if (profile === "classification") {
    hint.innerHTML =
      "<strong>Class breaks vs fit.</strong> Bin boundaries split CO₂ per capita (t). " +
      "<strong>ADCM</strong> (absolute deviation from class medians): <em>lower is better</em> — teal = stronger fit, red = poorer.";
  } else if (profile === "network") {
    hint.innerHTML =
      "<strong>Country centrality</strong> in the airline-route network. " +
      "Shading is <em>per column</em> (darker/cool = lower, brighter/warm = higher). " +
      "Betweenness = bridging role; eigenvector = connections to influential hubs.";
  } else if (profile === "projection") {
    hint.innerHTML =
      "<strong>Projection choice guide:</strong> what each preserves, distorts, and typical use cases.";
  } else {
    hint.innerHTML =
      "Numeric columns use a <strong>colour scale</strong> for quick comparison (within each column).";
  }
  shell.appendChild(hint);

  const twrap = el("div", "viz-table-wrap");
  let tableClass = "viz-table";
  if (profile === "classification") tableClass += " viz-table--classification";
  if (profile === "network") tableClass += " viz-table--network";
  if (profile === "projection") tableClass += " viz-table--projection";

  const table = el("table", tableClass);
  const thead = document.createElement("thead");
  const trh = document.createElement("tr");

  const headers = profile === "network" ? ["#", ...cols] : cols;
  headers.forEach((c) => {
    const th = document.createElement("th");
    th.textContent = c === "#" ? "Rank" : c;
    if (c === "#") th.classList.add("cell-rank-head");
    if (c !== "#" && cols.includes(c) && isMostlyNumericColumn(rows, c)) th.classList.add("col-heat");
    trh.appendChild(th);
  });
  thead.appendChild(trh);
  table.appendChild(thead);

  const heatStats = {};
  cols.forEach((c) => {
    if (isMostlyNumericColumn(rows, c)) {
      const s = columnNumericStats(rows, c);
      if (s) heatStats[c] = s;
    }
  });

  const tbody = document.createElement("tbody");
  rows.forEach((row, ri) => {
    const tr = document.createElement("tr");
    if (profile === "projection") tr.classList.add(`row-proj-${ri % 3}`);

    if (profile === "network") {
      const tdR = document.createElement("td");
      tdR.className = "cell-rank";
      tdR.textContent = String(ri + 1);
      tr.appendChild(tdR);
    }

    cols.forEach((c) => {
      const td = document.createElement("td");
      const raw = row[c];
      const isNum = isMostlyNumericColumn(rows, c);
      const n = parseCellNumber(raw);

      if (profile === "network" && c === "country") {
        td.className = "cell-country";
        td.textContent = raw === "" || raw == null ? "—" : String(raw);
      } else if (profile === "classification" && c === cols[0]) {
        td.className = "cell-method";
        td.innerHTML = `<span class="method-label">${escapeHtml(raw || "—")}</span>`;
      } else if (profile === "classification" && /bin/i.test(c)) {
        td.className = "cell-bins";
        td.innerHTML = formatBinChips(raw == null ? "" : String(raw));
      } else if (profile === "classification" && /adcm/i.test(c) && n != null) {
        td.className = "cell-num cell-heat";
        td.textContent = formatNumericDisplay(raw, c);
        const st = heatStyleADCM(n, heatStats[c].min, heatStats[c].max);
        Object.assign(td.style, st);
      } else if (profile === "classification" && /description/i.test(c)) {
        td.className = "cell-desc";
        td.textContent = raw === "" || raw == null ? "—" : String(raw);
      } else if (isNum && n != null && heatStats[c]) {
        td.className = "cell-num cell-heat";
        td.textContent = formatNumericDisplay(raw, c);
        const st = heatStyleMetric(n, heatStats[c].min, heatStats[c].max);
        Object.assign(td.style, st);
      } else if (profile === "projection") {
        td.className = "proj-cell";
        td.textContent = raw === "" || raw == null ? "—" : String(raw);
      } else {
        td.textContent = raw === "" || raw == null ? "—" : String(raw);
        if (isNum && n != null) td.classList.add("cell-num");
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  twrap.appendChild(table);
  shell.appendChild(twrap);
  return shell;
}

function loadCsvInto(url, container) {
  const block = el("div", "data-block");
  const h = el("h4", null, url.split("/").pop());
  block.appendChild(h);
  const slot = el("div", "csv-slot");
  block.appendChild(slot);

  const fname = url.split("/").pop() || "";

  fetch(url)
    .then((r) => {
      if (!r.ok) throw new Error(r.status);
      return r.text();
    })
    .then((text) => {
      const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
      if (!parsed.data.length) {
        slot.appendChild(missingNote("empty CSV"));
        return;
      }
      slot.appendChild(buildVizTable(parsed, fname));
    })
    .catch(() => {
      slot.appendChild(missingNote(fname));
    });

  container.appendChild(block);
}

function isStoryUnderline(line) {
  return /^[=\-]{4,}\s*$/.test(line || "");
}

function isShoutyHeader(line) {
  const t = (line || "").trim();
  if (t.length < 6 || t.length > 130) return false;
  const norm = t.replace(/\bvs\.?\b/gi, "");
  const letters = norm.replace(/[^A-Za-z]/g, "");
  if (letters.length < 4) return false;
  const up = norm.replace(/[^A-Z]/g, "").length;
  return up / letters.length >= 0.82;
}

function parseGenericNarrativeBody(raw) {
  const lines = raw.split(/\r?\n/);
  const out = [];
  let paragraph = [];
  let i = 0;

  function flushPara() {
    if (paragraph.length) {
      out.push({ type: "p", text: paragraph.join(" ") });
      paragraph = [];
    }
  }

  while (i < lines.length) {
    const L = lines[i];
    const t = L.trim();
    if (!t) {
      flushPara();
      i++;
      continue;
    }
    if (isStoryUnderline(L)) {
      i++;
      continue;
    }

    if (isShoutyHeader(L) && i + 1 < lines.length && isStoryUnderline(lines[i + 1])) {
      flushPara();
      out.push({ type: "h2", text: t });
      i += 2;
      continue;
    }

    const numItem = /^(\d+)\.\s+(.+)$/.exec(t);
    if (numItem) {
      const rest = numItem[2];
      const isShortAllCapsSection =
        rest.length > 3 &&
        rest.length < 72 &&
        rest === rest.toUpperCase() &&
        /^[A-Z0-9]/.test(rest);

      if (isShortAllCapsSection) {
        flushPara();
        out.push({ type: "h3", text: rest });
        i++;
        continue;
      }

      flushPara();
      const items = [];
      let j = i;
      while (j < lines.length) {
        const tx = lines[j].trim();
        const mi = /^(\d+)\.\s+(.+)$/.exec(tx);
        if (!mi) break;
        const r = mi[2];
        if (
          r.length < 72 &&
          r === r.toUpperCase() &&
          /^[A-Z0-9]/.test(r) &&
          items.length > 0
        )
          break;
        if (
          r.length < 72 &&
          r === r.toUpperCase() &&
          /^[A-Z0-9]/.test(r) &&
          items.length === 0 &&
          j > i
        )
          break;
        items.push(mi[2]);
        j++;
      }
      if (items.length) {
        out.push({ type: "ol", items });
        i = j;
        continue;
      }
    }

    if (/^\-\s+/.test(L) && !/^\s{3,}/.test(L)) {
      flushPara();
      const items = [];
      while (i < lines.length && /^\s*\-\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\-\s+/, "").trim());
        i++;
      }
      out.push({ type: "ul", items });
      continue;
    }

    if (/^\s{2,}\-\s+/.test(L)) {
      flushPara();
      const items = [];
      while (i < lines.length && /^\s{2,}\-\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\-\s+/, "").trim());
        i++;
      }
      out.push({ type: "ul", items });
      continue;
    }

    paragraph.push(t);
    i++;
  }
  flushPara();
  return out;
}

function parseGenericNarrative(raw) {
  const lines = raw.split(/\r?\n/);
  let i = 0;
  const title = [];
  while (i < lines.length) {
    if (isStoryUnderline(lines[i])) {
      i++;
      break;
    }
    if (lines[i].trim()) title.push(lines[i].trim());
    i++;
  }
  const rest = lines.slice(i).join("\n");
  const body = parseGenericNarrativeBody(rest);
  if (title.length) return [{ type: "h1", text: title.join(" ") }, ...body];
  return body;
}

function parseMoransNarrative(raw) {
  const lines = raw.split(/\r?\n/);
  let i = 0;
  const title = [];
  while (i < lines.length && !isStoryUnderline(lines[i])) {
    if (lines[i].trim()) title.push(lines[i].trim());
    i++;
  }
  if (isStoryUnderline(lines[i])) i++;

  const out = [{ type: "h1", text: title.join(" ") }];
  const stats = [];
  while (i < lines.length) {
    const t = lines[i].trim();
    if (!t) {
      i++;
      continue;
    }
    if (isShoutyHeader(lines[i]) && i + 1 < lines.length && isStoryUnderline(lines[i + 1]))
      break;
    const m = /^(.+?)\s*:\s*(.+)$/.exec(t);
    if (m && m[1].length < 65) {
      stats.push([m[1].trim(), m[2].trim()]);
      i++;
    } else break;
  }
  if (stats.length) out.push({ type: "stats", pairs: stats });
  while (i < lines.length && !lines[i].trim()) i++;
  out.push(...parseGenericNarrativeBody(lines.slice(i).join("\n")));
  return out;
}

function parseStoryText(raw, filename) {
  const fn = (filename || "").toLowerCase();
  if (fn.includes("morans")) return parseMoransNarrative(raw);
  return parseGenericNarrative(raw);
}

function storySvgProfile(filename) {
  const f = (filename || "").toLowerCase();
  if (f.includes("part1")) return "part1";
  if (f.includes("part2")) return "part2";
  if (f.includes("part3")) return "part3";
  if (f.includes("part4")) return "part4";
  if (f.includes("part5")) return "part5";
  if (f.includes("part6")) return "part6";
  if (f.includes("part7")) return "part7";
  if (f.includes("morans")) return "morans";
  return "default";
}

function storyKickerForProfile(prof) {
  const k = {
    part1: "Why the same numbers look different on three world projections.",
    part2: "Choropleths reward careful data choice — rates, bins, and bias.",
    part3: "Points, not polygons, for phenomena that live at airports.",
    part4: "Hubs, corridors, and how line width tells the strength of flows.",
    part5: "From scattered stations to a smooth field — and where it lies.",
    part6: "When land area steals attention, circles can show who matters.",
    part7: "Matching map type to the policy question in three scenarios.",
    morans: "Testing whether similar emissions cluster in geographic space.",
    default: "Narrative notes from the GeoMetric pipeline.",
  };
  return k[prof] || k.default;
}

function storyHeroSvg(prof) {
  const common =
    'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 140" fill="none" role="img" aria-hidden="true"';
  const S = {
    part1: `<svg ${common}><defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#5eead4"/><stop offset="100%" stop-color="#c4b5fd"/></linearGradient></defs><rect width="220" height="140" rx="16" fill="#2a3340"/><ellipse cx="110" cy="78" rx="72" ry="38" stroke="url(#g1)" stroke-width="2" fill="rgba(74,222,128,0.08)"/><path d="M52 72 Q110 52 168 72" stroke="#64748b" stroke-width="1.2" stroke-dasharray="4 3"/><path d="M58 88 Q110 68 162 88" stroke="#94a3b8" stroke-width="1"/><rect x="36" y="24" width="44" height="30" rx="4" stroke="#5eead4" stroke-width="1.5" fill="rgba(74,222,128,0.12)"/><rect x="88" y="20" width="44" height="30" rx="4" stroke="#c4b5fd" stroke-width="1.5" fill="rgba(134,239,172,0.1)"/><rect x="140" y="26" width="44" height="30" rx="4" stroke="#f472b6" stroke-width="1.5" fill="rgba(244,114,182,0.1)"/><text x="110" y="128" text-anchor="middle" fill="#64748b" font-size="9" font-family="system-ui,sans-serif">projections · area · shape · compromise</text></svg>`,
    part2: `<svg ${common}><rect width="220" height="140" rx="16" fill="#2a3340"/><path d="M40 100 L50 55 L75 75 L95 42 L120 88 L145 50 L170 95 L190 45 L195 100 Z" fill="rgba(74,222,128,0.25)" stroke="#5eead4" stroke-width="1.5"/><rect x="150" y="22" width="56" height="40" rx="6" fill="rgba(251,191,36,0.15)" stroke="#fbbf24" stroke-width="1.2"/><path d="M165 34 L168 42 L175 38 Z" fill="#fbbf24"/><text x="158" y="58" fill="#fde68a" font-size="8">rates</text><rect x="32" y="28" width="36" height="8" rx="2" fill="#334155"/><rect x="32" y="40" width="28" height="8" rx="2" fill="#475569"/><rect x="32" y="52" width="40" height="8" rx="2" fill="#64748b"/><text x="110" y="128" text-anchor="middle" fill="#64748b" font-size="9" font-family="system-ui,sans-serif">classification · normalisation · bias</text></svg>`,
    part3: `<svg ${common}><rect width="220" height="140" rx="16" fill="#2a3340"/><circle cx="78" cy="62" r="22" fill="rgba(74,222,128,0.35)" stroke="#5eead4" stroke-width="2"/><circle cx="148" cy="62" r="11" fill="rgba(134,239,172,0.35)" stroke="#c4b5fd" stroke-width="2"/><text x="78" y="102" text-anchor="middle" fill="#94a3b8" font-size="8">area ∝ data</text><text x="148" y="102" text-anchor="middle" fill="#94a3b8" font-size="8">radius only ≠ area</text><path d="M32 118 H188" stroke="#334155" stroke-width="1"/><text x="110" y="132" text-anchor="middle" fill="#64748b" font-size="9" font-family="system-ui,sans-serif">proportional symbols at true locations</text></svg>`,
    part4: `<svg ${common}><rect width="220" height="140" rx="16" fill="#2a3340"/><circle cx="110" cy="70" r="14" fill="rgba(251,191,36,0.5)" stroke="#fbbf24" stroke-width="2"/><circle cx="60" cy="48" r="6" fill="#5eead4" opacity="0.9"/><circle cx="155" cy="52" r="6" fill="#5eead4" opacity="0.9"/><circle cx="45" cy="92" r="5" fill="#c4b5fd" opacity="0.85"/><circle cx="175" cy="88" r="5" fill="#c4b5fd" opacity="0.85"/><path d="M60 48 Q85 58 110 70" stroke="#5eead4" stroke-width="2" opacity="0.6"/><path d="M155 52 Q135 62 110 70" stroke="#5eead4" stroke-width="2" opacity="0.6"/><path d="M110 70 Q78 78 45 92" stroke="#c4b5fd" stroke-width="1.5" opacity="0.5"/><path d="M110 70 Q142 80 175 88" stroke="#c4b5fd" stroke-width="1.5" opacity="0.5"/><text x="110" y="128" text-anchor="middle" fill="#64748b" font-size="9" font-family="system-ui,sans-serif">hubs · corridors · flow strength</text></svg>`,
    part5: `<svg ${common}><rect width="220" height="140" rx="16" fill="#2a3340"/><path d="M35 95 Q70 45 105 70 T165 55 Q185 80 195 95" fill="none" stroke="#5eead4" stroke-width="2" opacity="0.7"/><path d="M35 102 Q75 60 115 78 T175 65 Q190 88 198 102" fill="none" stroke="#c4b5fd" stroke-width="1.5" opacity="0.5"/><circle cx="70" cy="52" r="4" fill="#fbbf24"/><circle cx="115" cy="68" r="4" fill="#fbbf24"/><circle cx="155" cy="58" r="4" fill="#fbbf24"/><circle cx="92" cy="88" r="3" fill="#fb923c"/><text x="110" y="128" text-anchor="middle" fill="#64748b" font-size="9" font-family="system-ui,sans-serif">stations · contours · smooth field</text></svg>`,
    part6: `<svg ${common}><rect width="220" height="140" rx="16" fill="#2a3340"/><path d="M42 38 H175 V98 H42 Z" fill="rgba(51,65,85,0.4)" stroke="#64748b" stroke-width="1.5"/><text x="108" y="32" text-anchor="middle" fill="#94a3b8" font-size="8">geographic map</text><circle cx="75" cy="72" r="22" fill="rgba(74,222,128,0.3)" stroke="#5eead4"/><circle cx="125" cy="62" r="18" fill="rgba(134,239,172,0.3)" stroke="#c4b5fd"/><circle cx="155" cy="82" r="10" fill="rgba(244,114,182,0.35)" stroke="#f472b6"/><text x="110" y="128" text-anchor="middle" fill="#64748b" font-size="9" font-family="system-ui,sans-serif">population-sized circles vs land area</text></svg>`,
    part7: `<svg ${common}><rect width="220" height="140" rx="16" fill="#2a3340"/><rect x="28" y="28" width="52" height="72" rx="8" fill="rgba(74,222,128,0.12)" stroke="#5eead4"/><rect x="84" y="36" width="52" height="72" rx="8" fill="rgba(134,239,172,0.12)" stroke="#c4b5fd"/><rect x="140" y="32" width="52" height="72" rx="8" fill="rgba(244,114,182,0.12)" stroke="#f472b6"/><text x="54" y="52" text-anchor="middle" fill="#c4b5fd" font-size="9" font-weight="700">A</text><text x="110" y="52" text-anchor="middle" fill="#bbf7d0" font-size="9" font-weight="700">B</text><text x="166" y="52" text-anchor="middle" fill="#f9a8d4" font-size="9" font-weight="700">C</text><circle cx="54" cy="78" r="14" fill="rgba(74,222,128,0.35)"/><path d="M110 70 L98 88 L122 88 Z" fill="rgba(134,239,172,0.4)"/><rect x="154" y="68" width="24" height="24" rx="2" fill="rgba(244,114,182,0.35)"/><text x="110" y="128" text-anchor="middle" fill="#64748b" font-size="9" font-family="system-ui,sans-serif">scenario-fit · choropleth · symbols · bivariate</text></svg>`,
    morans: `<svg ${common}><rect width="220" height="140" rx="16" fill="#2a3340"/><g stroke="#334155" stroke-width="1"><path d="M48 40h18v18H48z M72 40h18v18H72z M96 40h18v18H96z M120 40h18v18H120z"/><path d="M48 64h18v18H48z M72 64h18v18H72z M96 64h18v18H96z M120 64h18v18H120z"/><path d="M48 88h18v18H48z M72 88h18v18H72z M96 88h18v18H96z M120 88h18v18H120z"/></g><rect x="70" y="62" width="46" height="46" rx="4" fill="rgba(251,191,36,0.35)" stroke="#fbbf24" stroke-width="1.5"/><text x="164" y="58" fill="#e2e8f0" font-size="22" font-weight="800" font-family="Georgia,serif">I</text><text x="152" y="78" fill="#94a3b8" font-size="9">Moran</text><text x="110" y="128" text-anchor="middle" fill="#64748b" font-size="9" font-family="system-ui,sans-serif">spatial autocorrelation · clusters</text></svg>`,
    default: `<svg ${common}><rect width="220" height="140" rx="16" fill="#2a3340"/><circle cx="110" cy="70" r="48" stroke="url(#gd)" stroke-width="2" fill="rgba(74,222,128,0.1)"/><defs><linearGradient id="gd" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#5eead4"/><stop offset="100%" stop-color="#c4b5fd"/></linearGradient></defs><text x="110" y="128" text-anchor="middle" fill="#64748b" font-size="9" font-family="system-ui,sans-serif">GeoMetric narrative</text></svg>`,
  };
  return S[prof] || S.default;
}

function astToStoryFragment(nodes) {
  const frag = document.createDocumentFragment();
  let currentSection = null;
  let firstSection = true;

  function newSection(extra) {
    currentSection = el("section", "story-section" + (extra ? ` ${extra}` : ""));
    frag.appendChild(currentSection);
  }

  function ensureSection(isLead) {
    if (!currentSection) newSection(isLead ? "story-section--lead" : "");
  }

  for (const n of nodes) {
    if (n.type === "stats") {
      const wrap = el("div", "story-stats-wrap");
      wrap.appendChild(el("h3", "story-stats-heading", "Key results"));
      const grid = el("div", "story-stats-grid");
      n.pairs.forEach(([k, v]) => {
        const card = el("div", "story-stat-card");
        const label = document.createElement("span");
        label.className = "story-stat-label";
        label.textContent = k;
        const val = document.createElement("span");
        val.className = "story-stat-value";
        val.textContent = v;
        card.appendChild(label);
        card.appendChild(val);
        grid.appendChild(card);
      });
      wrap.appendChild(grid);
      frag.appendChild(wrap);
      continue;
    }
    if (n.type === "h2") {
      currentSection = el("section", "story-section");
      const h = el("h3", "story-section-title");
      h.textContent = n.text;
      currentSection.appendChild(h);
      frag.appendChild(currentSection);
      firstSection = false;
      continue;
    }
    if (n.type === "h3") {
      if (!currentSection) ensureSection(firstSection);
      firstSection = false;
      const h = el("h4", "story-subsection-title");
      h.textContent = n.text;
      currentSection.appendChild(h);
      continue;
    }
    if (n.type === "p") {
      if (!currentSection) {
        ensureSection(firstSection);
        firstSection = false;
      }
      const p = el("p", "story-p");
      p.textContent = n.text;
      currentSection.appendChild(p);
      continue;
    }
    if (n.type === "ul") {
      if (!currentSection) {
        ensureSection(firstSection);
        firstSection = false;
      }
      const ul = el("ul", "story-list");
      n.items.forEach((it) => {
        const li = document.createElement("li");
        li.textContent = it;
        ul.appendChild(li);
      });
      currentSection.appendChild(ul);
      continue;
    }
    if (n.type === "ol") {
      if (!currentSection) {
        ensureSection(firstSection);
        firstSection = false;
      }
      const ol = el("ol", "story-list story-list--numbered");
      n.items.forEach((it) => {
        const li = document.createElement("li");
        li.textContent = it;
        ol.appendChild(li);
      });
      currentSection.appendChild(ol);
    }
  }
  return frag;
}

function buildStoryArticle(ast, filename) {
  const prof = storySvgProfile(filename);
  const article = el("article", "story-article");

  const hero = el("div", "story-hero");
  const figure = el("figure", "story-figure");
  figure.innerHTML = storyHeroSvg(prof);
  const cap = document.createElement("figcaption");
  cap.className = "story-figcaption";
  cap.textContent = storyKickerForProfile(prof);
  figure.appendChild(cap);

  const head = el("div", "story-head");
  let i = 0;
  if (ast[0]?.type === "h1") {
    const title = el("h2", "story-title");
    title.textContent = ast[0].text;
    head.appendChild(title);
    i = 1;
  }

  hero.appendChild(figure);
  hero.appendChild(head);
  article.appendChild(hero);

  const content = el("div", "story-content");
  content.appendChild(astToStoryFragment(ast.slice(i)));
  article.appendChild(content);
  return article;
}

function loadTextInto(url, container) {
  const fname = url.split("/").pop() || "";
  const block = el("div", "data-block data-block--story");
  const label = el("div", "story-source-label");
  label.textContent = fname.replace(/_/g, " ");
  block.appendChild(label);

  const shell = el("div", "story-shell");
  const loading = el("p", "story-loading");
  loading.textContent = "Loading narrative…";
  shell.appendChild(loading);
  block.appendChild(shell);
  container.appendChild(block);

  fetch(url)
    .then((r) => {
      if (!r.ok) throw new Error(r.status);
      return r.text();
    })
    .then((raw) => {
      const t = raw.trim();
      shell.innerHTML = "";
      if (!t) {
        shell.appendChild(missingNote("(empty file)"));
        return;
      }
      const ast = parseStoryText(t, fname);
      shell.appendChild(buildStoryArticle(ast, fname));
    })
    .catch(() => {
      shell.innerHTML = "";
      const err = document.createElement("p");
      err.className = "story-error";
      err.textContent = `Could not load ${fname}. Run the corresponding part script.`;
      shell.appendChild(err);
    });
}

/* --- Leaflet map --- */

let map;
let geoLayer;
let airportLayer;
let flowLayer;
let tempLayer;

function colorScale(values, colors) {
  const valid = values.filter((v) => v != null && !Number.isNaN(v));
  if (!valid.length) return () => "#94a3b8";
  const mn = Math.min(...valid);
  const mx = Math.max(...valid);
  if (mn === mx) {
    const mid = chroma.scale(colors)(0.5).hex();
    return (v) => (v == null || Number.isNaN(v) ? "#475569" : mid);
  }
  const scale = chroma.scale(colors).domain([mn, mx]);
  return (v) => {
    if (v == null || Number.isNaN(v)) return "#475569";
    return scale(v).hex();
  };
}

function mergeIso(rowByIso, feature) {
  const p = feature.properties || {};
  const iso = p.ISO_A3 || p.ADM0_A3 || p.iso_a3;
  if (!iso || iso === "-99") return { ...p };
  const row = rowByIso[iso];
  if (!row) return { ...p };
  return { ...p, ...row };
}

function initLeaflet() {
  const elMap = document.getElementById("leaflet-map");
  if (!elMap || typeof L === "undefined") return;

  map = L.map(elMap, { worldCopyJump: true }).setView([24, 12], 2);

  const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  });
  const carto = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: "abcd",
    maxZoom: 20,
  });
  osm.addTo(map);

  const baseMaps = { "OpenStreetMap": osm, "Carto Dark": carto };
  const overlays = {};

  fetch(NE_GEOJSON)
    .then((r) => r.json())
    .then((geo) => {
      const rows = typeof WORLD_DATA !== "undefined" ? WORLD_DATA : [];
      const rowByIso = Object.fromEntries(
        rows.filter((x) => x && x.iso_a3).map((x) => [x.iso_a3, x])
      );

      const metric = document.getElementById("metric-select").value;
      const vals = geo.features.map((f) => mergeIso(rowByIso, f)[metric]).filter((v) => typeof v === "number");

      const pickColor = colorScale(vals, ["#115e59", "#0d9488", "#5eead4", "#fbbf24", "#f97316"]);

      geoLayer = L.geoJSON(geo, {
        style: (f) => {
          const m = mergeIso(rowByIso, f);
          const v = m[metric];
          return {
            fillColor: typeof v === "number" ? pickColor(v) : "#475569",
            weight: 0.6,
            opacity: 1,
            color: "#1e2630",
            fillOpacity: 0.82,
          };
        },
        onEachFeature: (f, layer) => {
          const m = mergeIso(rowByIso, f);
          const name = m.country_name || m.NAME || m.ADMIN || m.name || "—";
          layer.bindPopup(
            `<strong>${name}</strong><br/>` +
              `<small>ISO3:</small> ${m.iso_a3 || m.ISO_A3 || "—"}<br/>` +
              (typeof m.co2_per_capita === "number"
                ? `CO₂/cap: <b>${m.co2_per_capita.toFixed(2)}</b> t<br/>`
                : "") +
              (typeof m.co2_total === "number"
                ? `CO₂ total: <b>${m.co2_total.toFixed(1)}</b> Mt<br/>`
                : "") +
              (typeof m.population === "number"
                ? `Pop: <b>${(m.population / 1e6).toFixed(2)}</b> M`
                : "")
          );
        },
      });
      overlays["Countries (choropleth)"] = geoLayer;
      geoLayer.addTo(map);

      if (typeof AIRPORTS_DATA !== "undefined" && AIRPORTS_DATA.length) {
        airportLayer = L.layerGroup();
        AIRPORTS_DATA.forEach((a) => {
          if (a.lat == null || a.lon == null) return;
          const r = Math.max(3, Math.min(22, Math.sqrt((a.total_routes || 0) / 10)));
          L.circleMarker([a.lat, a.lon], {
            radius: r,
            fillColor: "#6ee7b7",
            color: "#1e2630",
            weight: 1,
            fillOpacity: 0.55,
          })
            .bindPopup(
              `<b>${a.name}</b> (${a.iata})<br/>` +
                `${a.city}, ${a.country}<br/>Routes: ${a.total_routes}`
            )
            .addTo(airportLayer);
        });
        overlays["Airports (top hubs)"] = airportLayer;
      }

      if (typeof FLOWS_DATA !== "undefined" && FLOWS_DATA.length) {
        flowLayer = L.layerGroup();
        FLOWS_DATA.slice(0, 200).forEach((f) => {
          if (
            f.src_lat == null ||
            f.dst_lat == null ||
            f.n == null
          ) return;
          const latlngs = [
            [f.src_lat, f.src_lon],
            [f.dst_lat, f.dst_lon],
          ];
          const w = Math.max(0.5, Math.min(6, f.n / 8));
          L.polyline(latlngs, { color: "#38bdf8", weight: w, opacity: 0.55 }).addTo(
            flowLayer
          );
        });
        overlays["Route flows (sample)"] = flowLayer;
      }

      if (typeof TEMP_DATA !== "undefined" && TEMP_DATA.length) {
        tempLayer = L.layerGroup();
        TEMP_DATA.forEach((t) => {
          if (t.lat == null) return;
          L.circleMarker([t.lat, t.lon], {
            radius: 5,
            fillColor: "#f472b6",
            color: "#1e293b",
            weight: 1,
            fillOpacity: 0.85,
          })
            .bindPopup(
              `<b>${t.city}</b>, ${t.country}<br/>Mean temp: <b>${t.mean_temp_c}°C</b>`
            )
            .addTo(tempLayer);
        });
        overlays["Temperature stations"] = tempLayer;
      }

      L.control.layers(baseMaps, overlays, { collapsed: false }).addTo(map);
    })
    .catch(() => {
      elMap.innerHTML = "";
      elMap.appendChild(
        missingNote("could not load Natural Earth GeoJSON (network?)")
      );
    });

  document.getElementById("metric-select").addEventListener("change", () => {
    if (!geoLayer) return;
    const metric = document.getElementById("metric-select").value;
    const rows = typeof WORLD_DATA !== "undefined" ? WORLD_DATA : [];
    const rowByIso = Object.fromEntries(
      rows.filter((x) => x && x.iso_a3).map((x) => [x.iso_a3, x])
    );
    const vals = [];
    geoLayer.eachLayer((layer) => {
      const f = layer.feature;
      if (!f) return;
      const m = mergeIso(rowByIso, f);
      if (typeof m[metric] === "number") vals.push(m[metric]);
    });
    const pickColor = colorScale(vals, ["#115e59", "#0d9488", "#5eead4", "#fbbf24", "#f97316"]);
    geoLayer.eachLayer((layer) => {
      const f = layer.feature;
      if (!f) return;
      const m = mergeIso(rowByIso, f);
      const v = m[metric];
      layer.setStyle({
        fillColor: typeof v === "number" ? pickColor(v) : "#475569",
        weight: 0.6,
        opacity: 1,
        color: "#1e2630",
        fillOpacity: 0.82,
      });
    });
  });

  document.getElementById("fit-world").addEventListener("click", () => {
    if (map) map.setView([24, 12], 2);
  });
}

function boot() {
  initFigureLightbox();
  renderStory();
  renderPartSections();
  initLeaflet();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
