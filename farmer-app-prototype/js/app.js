// KisanSaathi Interactive Mobile Application Prototype Controller
// Handles Screen Routing, Trilingual Localization, State Mutations, Canvas GIS & Scanner

let currentLang = localStorage.getItem("kisansaathi_lang") || "mr";
let workingData = getWorkingData();
let activeFarmer = workingData.farmer;
let isAuthenticated = false;
let screenHistory = [];
let activeGisPlotId = "field_2";
let activeCropPest = "sugarcane";

// DOM Loaded Initialization
document.addEventListener("DOMContentLoaded", () => {
  setupLanguage(currentLang);
  setupViewportControls();
  setupEventListeners();
  renderAllData();
  initGisCanvas();
  initSplineChart();

  // If already logged in previously in session
  if (sessionStorage.getItem("kisansaathi_auth") === "true") {
    isAuthenticated = true;
    navigateTo("screen-dashboard", false);
  } else {
    navigateTo("screen-login", false);
  }
});

// Localization Functions
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("kisansaathi_lang", lang);
  setupLanguage(lang);
  renderAllData();
  showToast(`Language set to ${lang === 'mr' ? 'मराठी' : lang === 'hi' ? 'हिंदी' : 'English'}`);
}

function t(key) {
  if (translations[currentLang] && translations[currentLang][key]) {
    return translations[currentLang][key];
  }
  return translations["en"][key] || key;
}

function setupLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.setAttribute("placeholder", t(key));
  });

  // Update language selector active pills
  document.querySelectorAll(".lang-pill").forEach(pill => {
    if (pill.dataset.lang === lang) {
      pill.classList.add("active");
    } else {
      pill.classList.remove("active");
    }
  });

  // Update dynamic greeting
  updateGreeting();
}

function updateGreeting() {
  const hour = new Date().getHours();
  let greetKey = "greetingMorning";
  if (hour >= 12 && hour < 17) greetKey = "greetingAfternoon";
  else if (hour >= 17) greetKey = "greetingEvening";

  const greetEl = document.getElementById("dashGreetingText");
  if (greetEl) {
    greetEl.textContent = `${t(greetKey)}, ${activeFarmer.name}! 🙏`;
  }
}

// Screen Routing & Navigation
function navigateTo(screenId, pushHistory = true) {
  const currentActive = document.querySelector(".screen.active");
  if (currentActive && pushHistory && currentActive.id !== screenId) {
    screenHistory.push(currentActive.id);
  }

  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.add("active");
    const container = document.querySelector(".screen-container");
    if (container) container.scrollTop = 0;
  }

  // Update Bottom Navigation Bar
  updateBottomNav(screenId);

  // Trigger screen-specific rendering
  if (screenId === "screen-gis-map") {
    setTimeout(drawGisMap, 50);
  } else if (screenId === "screen-telemetry") {
    setTimeout(drawSplineChart, 50);
  }
}

function goBack() {
  if (screenHistory.length > 0) {
    const prev = screenHistory.pop();
    navigateTo(prev, false);
  } else {
    navigateTo("screen-dashboard", false);
  }
}

function updateBottomNav(screenId) {
  const nav = document.getElementById("bottomNav");
  if (!nav) return;

  if (screenId === "screen-login" || screenId === "screen-register") {
    nav.style.display = "none";
  } else {
    nav.style.display = "flex";
  }

  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.remove("active");
  });

  if (screenId === "screen-dashboard") {
    document.getElementById("navHome")?.classList.add("active");
  } else if (screenId === "screen-my-farm" || screenId === "screen-gis-map") {
    document.getElementById("navMyFarm")?.classList.add("active");
  } else if (screenId === "screen-weather" || screenId === "screen-pest" || screenId === "screen-sugarcane") {
    document.getElementById("navAdvisory")?.classList.add("active");
  } else if (screenId === "screen-profile") {
    document.getElementById("navProfile")?.classList.add("active");
  }
}

// Event Listeners Setup
function setupEventListeners() {
  // Demo Login Quick-Fill
  document.getElementById("demoQuickLoginBtn")?.addEventListener("click", () => {
    document.getElementById("loginMobile").value = "9822012345";
    document.getElementById("loginPassword").value = "farmer123";
    handleLogin();
  });

  // Login Form Submit
  document.getElementById("loginForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    handleLogin();
  });

  // Toggle Password Visibility
  document.getElementById("togglePasswordBtn")?.addEventListener("click", () => {
    const input = document.getElementById("loginPassword");
    const btn = document.getElementById("togglePasswordBtn");
    if (input.type === "password") {
      input.type = "text";
      btn.textContent = t("hidePassword");
    } else {
      input.type = "password";
      btn.textContent = t("showPassword");
    }
  });

  // Bottom Navigation
  document.getElementById("navHome")?.addEventListener("click", () => navigateTo("screen-dashboard"));
  document.getElementById("navMyFarm")?.addEventListener("click", () => navigateTo("screen-my-farm"));
  document.getElementById("navAdvisory")?.addEventListener("click", () => navigateTo("screen-sugarcane"));
  document.getElementById("navProfile")?.addEventListener("click", () => navigateTo("screen-profile"));

  // Leaf Scanner
  document.getElementById("startScanBtn")?.addEventListener("click", runLeafScanner);
  document.getElementById("pestCropSelect")?.addEventListener("change", (e) => {
    activeCropPest = e.target.value;
    updatePestCropContext(activeCropPest);
  });

  // Modals Close
  document.querySelectorAll(".close-modal-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
    });
  });

  // Add Field Form Submit
  document.getElementById("addFieldForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    handleAddNewField();
  });

  // Log Activity Form Submit
  document.getElementById("logActivityForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    handleAddNewActivity();
  });
}

// Authentication Logic
function handleLogin() {
  const mobile = document.getElementById("loginMobile").value.trim();
  const pass = document.getElementById("loginPassword").value.trim();

  if (mobile.length !== 10) {
    showToast(t("validationMobile"), "error");
    return;
  }
  if (pass.length < 6) {
    showToast(t("validationPassword"), "error");
    return;
  }

  // Authentic demo credentials check
  if (mobile === "9822012345" && pass === "farmer123") {
    isAuthenticated = true;
    sessionStorage.setItem("kisansaathi_auth", "true");
    showToast(t("loginSuccess") + " " + t("demoLoginNotice"));
    navigateTo("screen-dashboard", false);
  } else {
    // Prototype allows any 10-digit number for evaluation
    isAuthenticated = true;
    sessionStorage.setItem("kisansaathi_auth", "true");
    showToast(t("loginSuccess"));
    navigateTo("screen-dashboard", false);
  }
}

function handleLogout() {
  isAuthenticated = false;
  sessionStorage.removeItem("kisansaathi_auth");
  showToast("Logged out successfully");
  navigateTo("screen-login", false);
}

// Data Rendering Functions
function renderAllData() {
  renderFieldsList();
  renderActivitiesList();
  renderWeatherDetails();
  updatePestCropContext(activeCropPest);
}

function renderFieldsList() {
  const container = document.getElementById("fieldsContainer");
  if (!container) return;

  container.innerHTML = "";
  workingData.fields.forEach(f => {
    const card = document.createElement("div");
    card.className = "field-card";
    const statusBadgeClass = f.status === "GROWING" ? "badge-growing" : "badge-ready";
    const statusText = f.status === "GROWING" ? t("statusGrowing") : t("statusHarvestReady");

    // Realistic crop thumbnail image
    let cropImg = "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80"; // Sugarcane
    if (f.cropName === "Wheat") {
      cropImg = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80";
    } else if (f.cropName === "Red Onion") {
      cropImg = "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80";
    }

    card.innerHTML = `
      <div class="field-hero-art" style="background-image: url('${cropImg}')">
        <div class="field-hero-overlay"></div>
        <div class="field-badge">🌾 ${f.cropName} (${f.variety})</div>
        <span class="field-status-badge ${statusBadgeClass}">${statusText}</span>
      </div>
      <div class="field-content">
        <div style="font-family: var(--font-heading); font-size: 15px; font-weight: 700; margin-bottom: 4px;">${f.name}</div>
        <div class="field-meta-row">
          <span>📏 <strong>${f.area} ${f.areaUnit}</strong></span>
          <span>🧪 ${f.soilType}</span>
        </div>
        <div style="font-size: 11.5px; color: var(--text-muted); margin-bottom: 8px;">
          📅 ${t("sowingDate")}: ${f.sowingDate} • 🎯 ${t("expectedHarvest")}: ${f.expectedHarvestDate}
        </div>
        <button class="btn btn-secondary" style="width: 100%; min-height: 38px; padding: 6px 12px; font-size: 12px;" onclick="inspectFieldModal('${f.id}')">
          🔍 ${t("inspectPlot")}
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderActivitiesList() {
  const container = document.getElementById("activitiesTimelineContainer");
  if (!container) return;

  container.innerHTML = "";
  workingData.activities.forEach(act => {
    const item = document.createElement("div");
    item.style.cssText = "display: flex; gap: 12px; margin-bottom: 14px; align-items: flex-start;";
    item.innerHTML = `
      <div style="width: 36px; height: 36px; border-radius: 50%; background: #dcfce7; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0;">
        ${act.icon}
      </div>
      <div style="flex: 1; border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <strong style="font-size: 13px; color: var(--text-main);">${act.typeLabel}</strong>
          <span style="font-size: 11px; color: var(--text-light);">${act.date}</span>
        </div>
        <div style="font-size: 11.5px; color: var(--primary-700); font-weight: 600;">${act.field}</div>
        <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">${act.description}</div>
      </div>
    `;
    container.appendChild(item);
  });
}

function renderWeatherDetails() {
  const forecastCont = document.getElementById("forecast7DayContainer");
  if (!forecastCont) return;

  forecastCont.innerHTML = "";
  workingData.weather.forecast.forEach(item => {
    const card = document.createElement("div");
    card.style.cssText = "background: #fff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;";
    card.innerHTML = `
      <span style="font-weight: 600; font-size: 13px; width: 60px;">${item.day}</span>
      <span style="font-size: 13px;">${item.condition}</span>
      <span style="font-size: 11.5px; color: #0284c7; font-weight: 600;">🌧️ ${item.rain}</span>
      <strong style="font-size: 13px; color: var(--primary-900);">${item.temp}</strong>
    `;
    forecastCont.appendChild(card);
  });
}

// Leaf Scanner Simulation
function runLeafScanner() {
  const laser = document.getElementById("scannerLaserLine");
  const badge = document.getElementById("scannerStatusBadge");
  const resultCard = document.getElementById("pestResultCard");

  if (laser) laser.style.display = "block";
  if (badge) badge.textContent = t("scanningText");
  if (resultCard) resultCard.style.display = "none";

  setTimeout(() => {
    if (laser) laser.style.display = "none";
    if (badge) badge.textContent = "✅ Scan Complete!";
    if (resultCard) {
      resultCard.style.display = "block";
      resultCard.scrollIntoView({ behavior: "smooth" });
    }
    showToast("Diagnosis generated successfully!");
  }, 1600);
}

function updatePestCropContext(cropKey) {
  const data = workingData.pestDiagnoses[cropKey] || workingData.pestDiagnoses.sugarcane;
  const leafImg = document.getElementById("pestLeafPreviewImg");

  // Crop preview images
  const cropPhotos = {
    sugarcane: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80",
    tomato: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80",
    wheat: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80",
    onion: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80"
  };

  if (leafImg && cropPhotos[cropKey]) {
    leafImg.src = cropPhotos[cropKey];
  }

  // Populate diagnosis card
  document.getElementById("diagConditionName").textContent = data.disease;
  document.getElementById("diagConfidenceVal").textContent = data.confidence;
  document.getElementById("diagSeverityVal").textContent = data.severity;
  document.getElementById("diagSymptomsVal").textContent = data.symptoms;
  document.getElementById("diagOrganicVal").textContent = data.organicRemedy;
  document.getElementById("diagChemicalVal").textContent = data.chemicalRemedy;
  document.getElementById("diagPreventionVal").textContent = data.prevention;
}

// Interactive GIS Farm Canvas (Module 4)
function initGisCanvas() {
  const canvas = document.getElementById("gisMapCanvas");
  if (!canvas) return;

  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check hit test for plots
    if (x > 30 && x < 150 && y > 40 && y < 160) {
      selectGisPlot("field_1");
    } else if (x >= 150 && x < 280 && y > 30 && y < 180) {
      selectGisPlot("field_2");
    } else if (x > 80 && x < 260 && y >= 180 && y < 290) {
      selectGisPlot("field_3");
    }
  });
}

function drawGisMap() {
  const canvas = document.getElementById("gisMapCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width = canvas.parentElement.clientWidth;
  const h = canvas.height = canvas.parentElement.clientHeight;

  // Background Aerial Grid
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, w, h);

  // Draw grid lines
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 30) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
  }
  for (let y = 0; y < h; y += 30) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }

  // Canal Waterline (North)
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(10, 20);
  ctx.bezierCurveTo(w * 0.3, 10, w * 0.7, 35, w - 10, 15);
  ctx.stroke();
  ctx.fillStyle = "#7dd3fc";
  ctx.font = "10px Inter";
  ctx.fillText("💧 Nira Left Canal", 16, 16);

  // Field 1: North Canal Block (Wheat)
  drawFieldPolygon(ctx, [
    { x: w * 0.1, y: h * 0.18 },
    { x: w * 0.44, y: h * 0.14 },
    { x: w * 0.42, y: h * 0.52 },
    { x: w * 0.12, y: h * 0.48 }
  ], "field_1", "Field 1: Wheat (4.0 Ac)", "#22c55e", activeGisPlotId === "field_1");

  // Field 2: Well Plot (Sugarcane)
  drawFieldPolygon(ctx, [
    { x: w * 0.46, y: h * 0.14 },
    { x: w * 0.88, y: h * 0.20 },
    { x: w * 0.82, y: h * 0.58 },
    { x: w * 0.44, y: h * 0.52 }
  ], "field_2", "Field 2: Sugarcane (5.0 Ac)", "#eab308", activeGisPlotId === "field_2");

  // Field 3: Roadside Plot (Red Onion)
  drawFieldPolygon(ctx, [
    { x: w * 0.18, y: h * 0.56 },
    { x: w * 0.80, y: h * 0.62 },
    { x: w * 0.74, y: h * 0.90 },
    { x: w * 0.14, y: h * 0.86 }
  ], "field_3", "Field 3: Red Onion (3.5 Ac)", "#f97316", activeGisPlotId === "field_3");

  // Open Well Icon
  ctx.fillStyle = "#38bdf8";
  ctx.beginPath();
  ctx.arc(w * 0.45, h * 0.54, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.font = "9px Inter";
  ctx.fillText("🚰 Well", w * 0.45 + 10, h * 0.56);
}

function drawFieldPolygon(ctx, points, id, label, strokeColor, isSelected) {
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.closePath();

  // Fill
  ctx.fillStyle = isSelected ? "rgba(34, 197, 94, 0.35)" : "rgba(255, 255, 255, 0.08)";
  ctx.fill();

  // Stroke
  ctx.strokeStyle = isSelected ? "#4ade80" : strokeColor;
  ctx.lineWidth = isSelected ? 3 : 2;
  if (isSelected) {
    ctx.shadowColor = "#4ade80";
    ctx.shadowBlur = 12;
  }
  ctx.stroke();
  ctx.shadowBlur = 0; // reset

  // Label
  const cx = points.reduce((acc, p) => acc + p.x, 0) / points.length;
  const cy = points.reduce((acc, p) => acc + p.y, 0) / points.length;
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 11px Inter, Noto Sans Devanagari";
  ctx.textAlign = "center";
  ctx.fillText(label, cx, cy);
}

function selectGisPlot(plotId) {
  activeGisPlotId = plotId;
  drawGisMap();
  const plot = workingData.fields.find(f => f.id === plotId);
  if (!plot) return;

  const sheet = document.getElementById("gisPlotSheet");
  if (sheet) {
    sheet.innerHTML = `
      <div style="font-family: var(--font-heading); font-size: 15px; font-weight: 700; color: var(--primary-900);">${plot.name}</div>
      <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 6px;">Crop: <strong>${plot.cropName} (${plot.variety})</strong> • ${plot.area} ${plot.areaUnit}</div>
      <div style="display: flex; gap: 8px; font-size: 11px;">
        <span class="crop-chip">🧪 ${plot.soilType}</span>
        <span class="crop-chip">💧 Soil Moisture: ${plot.soilMoisture}%</span>
        <span class="crop-chip">🌱 Health: ${plot.healthScore}%</span>
      </div>
    `;
  }
}

// 7-Day Spline Trend Chart (Module 5)
function initSplineChart() {
  // ready
}

function drawSplineChart() {
  const canvas = document.getElementById("splineChartCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width = canvas.parentElement.clientWidth;
  const h = canvas.height = 180;

  ctx.clearRect(0, 0, w, h);

  const moistureData = [64, 68, 72, 75, 71, 74, 72]; // %
  const labels = ["04 Oct", "05 Oct", "06 Oct", "07 Oct", "08 Oct", "09 Oct", "10 Oct"];

  // Grid
  ctx.strokeStyle = "#e2e8f0";
  ctx.lineWidth = 1;
  for (let i = 1; i <= 3; i++) {
    const y = (h - 30) * (i / 4);
    ctx.beginPath(); ctx.moveTo(30, y); ctx.lineTo(w - 10, y); ctx.stroke();
  }

  // Draw Spline Curve
  const points = moistureData.map((val, idx) => {
    const x = 40 + (idx / (moistureData.length - 1)) * (w - 70);
    const y = (h - 40) - ((val - 50) / 40) * (h - 60);
    return { x, y, val, label: labels[idx] };
  });

  // Curve gradient fill
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, "rgba(34, 197, 94, 0.35)");
  grad.addColorStop(1, "rgba(34, 197, 94, 0.0)");

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cx = (prev.x + curr.x) / 2;
    ctx.bezierCurveTo(cx, prev.y, cx, curr.y, curr.x, curr.y);
  }
  ctx.lineTo(points[points.length - 1].x, h - 25);
  ctx.lineTo(points[0].x, h - 25);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Curve stroke
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cx = (prev.x + curr.x) / 2;
    ctx.bezierCurveTo(cx, prev.y, cx, curr.y, curr.x, curr.y);
  }
  ctx.strokeStyle = "#16a34a";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Points & Labels
  points.forEach(p => {
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#15803d";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Value on top
    ctx.fillStyle = "#14532d";
    ctx.font = "bold 10px Inter";
    ctx.textAlign = "center";
    ctx.fillText(`${p.val}%`, p.x, p.y - 8);

    // Label on bottom
    ctx.fillStyle = "#64748b";
    ctx.font = "9px Inter";
    ctx.fillText(p.label, p.x, h - 10);
  });
}

// Modals Handling
function inspectFieldModal(fieldId) {
  const f = workingData.fields.find(item => item.id === fieldId);
  if (!f) return;

  const modal = document.getElementById("fieldDetailModal");
  if (!modal) return;

  document.getElementById("modalFieldName").textContent = f.name;
  document.getElementById("modalCropName").textContent = `${f.cropName} (${f.variety})`;
  document.getElementById("modalFieldArea").textContent = `${f.area} ${f.areaUnit}`;
  document.getElementById("modalSoilType").textContent = f.soilType;
  document.getElementById("modalIrrigation").textContent = f.irrigation;
  document.getElementById("modalHealthScore").textContent = `${f.healthScore}% (Healthy)`;
  document.getElementById("modalFieldNotes").textContent = f.notes;

  modal.classList.add("active");
}

function openAddFieldModal() {
  document.getElementById("addFieldModal")?.classList.add("active");
}

function handleAddNewField() {
  const name = document.getElementById("newFieldName").value.trim();
  const area = parseFloat(document.getElementById("newFieldArea").value);
  const crop = document.getElementById("newFieldCrop").value;
  const soil = document.getElementById("newFieldSoil").value;

  if (!name || isNaN(area) || area <= 0) {
    showToast("Please enter valid field name and area", "error");
    return;
  }

  const newField = {
    id: `field_${Date.now()}`,
    farmId: "farm_1",
    name: name,
    area: area,
    areaUnit: "Acres",
    cropName: crop,
    variety: "Standard Commercial",
    season: "Kharif",
    sowingDate: "10 Oct 2026",
    expectedHarvestDate: "15 Mar 2027",
    status: "GROWING",
    healthScore: 95,
    soilMoisture: 70,
    soilType: soil,
    irrigation: "Drip Irrigation",
    notes: "Newly registered plot via KisanSaathi mobile app.",
    color: "#10b981",
    polygon: [
      { lat: 18.1500, lng: 74.5750 },
      { lat: 18.1510, lng: 74.5760 },
      { lat: 18.1505, lng: 74.5770 },
      { lat: 18.1495, lng: 74.5760 }
    ]
  };

  workingData.fields.push(newField);
  saveWorkingData(workingData);
  renderFieldsList();
  document.getElementById("addFieldModal").classList.remove("active");
  document.getElementById("addFieldForm").reset();
  showToast(`Plot "${name}" added successfully!`);
}

function openLogActivityModal() {
  document.getElementById("logActivityModal")?.classList.add("active");
}

function handleAddNewActivity() {
  const type = document.getElementById("newActType").value;
  const fieldName = document.getElementById("newActField").value;
  const notes = document.getElementById("newActNotes").value.trim();

  const iconMap = {
    "Drip Irrigation": "💧",
    "Fertilizer Application": "🌾",
    "Pesticide Spray": "🛡️",
    "Weeding": "🌱",
    "Harvesting": "🚜"
  };

  const newAct = {
    id: `act_${Date.now()}`,
    date: "10 Oct 2026 (Today)",
    type: type.toUpperCase(),
    typeLabel: type,
    field: fieldName,
    description: notes || `Recorded ${type} operation.`,
    icon: iconMap[type] || "📋"
  };

  workingData.activities.unshift(newAct);
  saveWorkingData(workingData);
  renderActivitiesList();
  document.getElementById("logActivityModal").classList.remove("active");
  document.getElementById("logActivityForm").reset();
  showToast("Farm activity recorded successfully!");
}

// Calculators
function openSettCalculator() {
  const acres = prompt("Enter Farm Area in Acres:", "1");
  if (acres && !isNaN(acres) && parseFloat(acres) > 0) {
    const ac = parseFloat(acres);
    const twoEyeBuds = Math.round(ac * 10000); // 10,000 two-bud setts per acre
    const metricTonnes = (ac * 3.5).toFixed(1);
    alert(`🎋 Sugarcane Seed Sett Requirement for ${ac} Acre(s):\n\n• Two-Eye Bud Setts: ~${twoEyeBuds.toLocaleString()} setts\n• Seed Cane Weight: ~${metricTonnes} Metric Tonnes\n• Spacing: 4 to 5 feet row-to-row with paired row planting.`);
  }
}

function openFertCalculator() {
  const acres = prompt("Enter Sugarcane Area in Acres:", "1");
  if (acres && !isNaN(acres) && parseFloat(acres) > 0) {
    const ac = parseFloat(acres);
    const urea = Math.round(ac * 4.5); // bags (45kg)
    const ssp = Math.round(ac * 5.7);  // bags
    const mop = Math.round(ac * 3.8);  // bags
    alert(`🌾 Recommended Fertilizer Schedule for ${ac} Acre(s) (Co-86032 Adsali):\n\n• Urea (Nitrogen): ${urea} bags\n• Single Super Phosphate (SSP): ${ssp} bags\n• Muriate of Potash (MOP): ${mop} bags\n\nApply in 4 split doses (Basal, 45 days, 90 days, and 135 days).`);
  }
}

// Toast Display
function showToast(msg, type = "success") {
  const toast = document.getElementById("toastNotice");
  if (!toast) return;

  toast.textContent = msg;
  toast.style.background = type === "error" ? "#b91c1c" : "#14532d";
  toast.style.display = "flex";

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.style.display = "none";
  }, 2800);
}

// Viewport Frame Controls
function setupViewportControls() {
  const phoneBtn = document.getElementById("btnViewPhone");
  const fullBtn = document.getElementById("btnViewFull");
  const frame = document.querySelector(".phone-frame");

  phoneBtn?.addEventListener("click", () => {
    phoneBtn.classList.add("active");
    fullBtn?.classList.remove("active");
    frame?.classList.remove("full-view");
  });

  fullBtn?.addEventListener("click", () => {
    fullBtn.classList.add("active");
    phoneBtn?.classList.remove("active");
    frame?.classList.add("full-view");
  });
}
