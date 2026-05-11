(function () {
  const z = localStorage.getItem("senior_zoom");
  if (z) document.documentElement.style.zoom = z;
})();

function changerZoom(delta) {
  const ZOOM_MIN = 0.8;
  const ZOOM_MAX = 1.5;
  const current = parseFloat(localStorage.getItem("senior_zoom") || "1");
  const next = Math.min(
    ZOOM_MAX,
    Math.max(ZOOM_MIN, Math.round((current + delta) * 10) / 10),
  );
  document.documentElement.style.zoom = next;
  localStorage.setItem("senior_zoom", next);
}

function resetZoom() {
  document.documentElement.style.zoom = 1;
  localStorage.setItem("senior_zoom", "1");
}
