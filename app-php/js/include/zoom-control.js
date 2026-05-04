let zoom = 100;

function zoomPlus() {
  if (zoom < 200) {
    zoom += 10;
    document.body.style.zoom = zoom + "%";
    updateLabel();
  }
}

function zoomMoins() {
  if (zoom > 50) {
    zoom -= 10;
    document.body.style.zoom = zoom + "%";
    updateLabel();
  }
}

function zoomReset() {
  zoom = 100;
  document.body.style.zoom = "100%";
  updateLabel();
}

function updateLabel() {
  const label = document.getElementById("zoom-label");
  if (label) label.textContent = zoom + "%";
}

document.addEventListener("DOMContentLoaded", () => {
  const bar = document.createElement("div");
  bar.id = "zoom-bar";
  bar.innerHTML = `
    <button onclick="zoomMoins()" title="Réduire">−</button>
    <span id="zoom-label">100%</span>
    <button onclick="zoomPlus()" title="Agrandir">+</button>
    <button onclick="zoomReset()" id="zoom-reset">Réinitialiser</button>
  `;

  const style = document.createElement("style");
  style.textContent = `
    #zoom-bar {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 8px;
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 999px;
      padding: 8px 16px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.12);
      z-index: 999999;
      font-family: sans-serif;
    }
    #zoom-bar button {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid #ddd;
      background: transparent;
      cursor: pointer;
      font-size: 18px;
      transition: background 0.15s;
    }
    #zoom-bar button:hover { background: #f5f5f5; }
    #zoom-bar button:active { transform: scale(0.95); }
    #zoom-label {
      font-size: 13px;
      font-weight: 600;
      color: #555;
      min-width: 44px;
      text-align: center;
    }
    #zoom-reset {
      width: auto !important;
      padding: 0 12px;
      border-radius: 999px !important;
      font-size: 12px;
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(bar);
});
