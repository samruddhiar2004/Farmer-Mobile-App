# KisanSaathi — React Native Mobile Application

**Product:** KisanSaathi — Better Farming, Brighter Future (किसान साथी)  
**Framework:** React Native (Expo SDK 57) + TypeScript  
**Languages:** Trilingual (English, हिंदी, मराठी)  
**Target:** Android (Emulator / Physical Device) + Web Preview  

---

## 1. Quick Start Commands

From Windows PowerShell or Command Prompt:

```powershell
# Navigate into the mobile app directory
cd "c:\Sam's Work\Farmer-Mobile_App\farmer-mobile-app"

# Option A: Run Web Preview (Instant in Chrome/Edge/Firefox)
npm run web

# Option B: Run on Android Emulator (AVD)
npm run android

# Option C: Start Expo Dev Server (Scan QR code with Expo Go on physical Android)
npm start
```

---

## 2. Implemented Features & Core Modules

### 🔐 Screen A: Authentication & Trilingual Onboarding
- **Trilingual Pills**: Instant switching between **English**, **हिंदी**, and **मराठी** without app reload.
- **⚡ Quick Demo Login**: One-tap instant login as **Rahul Patil** (Baramati).
- **Persistent Auth**: Cached in AsyncStorage with session restore.

### 🏡 Screen B: Farmer Dashboard
- **Personalized Header**: Time-based greeting in the chosen language, farmer name, location, and KCC number.
- **Weather Widget**: 31°C floating card with humidity, wind speed, and pesticide spray safety window.
- **My Farm Snapshot**: Total acreage (12.5 Ac), plot count, and status badges.
- **5 Core Module Action Cards**: Direct navigation to all 5 agricultural modules.
- **Farm Alerts**: Scheduled drip fertigation alert and crop maturity notification.

### 🚜 Screen C & G1: My Farm & GIS Interactive Field Mapping (Module 4)
- **Field Plots**:
  - **Field 1: North Canal Block** (4.0 Ac) — Wheat (HD-2967) — Black Cotton Soil.
  - **Field 2: Well Plot** (5.0 Ac) — Sugarcane (Co-86032) — Drip fertigation.
  - **Field 3: Roadside Plot** (3.5 Ac) — Red Onion (Bhima Kiran) — Ready for Harvest.
- **Interactive GIS Canvas**: SVG rendering of field polygon boundaries, Nira Left Canal path, plot inspector, area in Acres & Gunthas, and WGS-84 GPS coordinates.
- **Plot Inspection (`FieldDetailScreen`)**: Full agronomy specifications and raw GPS vertices table.
- **+ Add Field Modal**: Reactive modal to add a new plot with instant state update.

### ⛅ Screen D: Weather & Agro-Advisory (Module 1)
- **7-Day Agricultural Forecast**: High/low temps, precipitation probability, and day-by-day spray safety badges.
- **Spraying Window**: Real-time evaluation of wind speed and rain risk for safe pesticide spraying.
- **Irrigation Guidance**: Soil moisture-based advisory to save electricity and prevent root damping.
- **Astronomical Cycle**: Sunrise & sunset times for field planning.

### 🔬 Screen E: Pest & Disease Leaf Scanner (Module 2)
- **Crop Selector**: Sugarcane, Tomato, Wheat, and Red Onion.
- **Simulated Leaf Viewfinder**: Animated laser scanning sweep.
- **Diagnostic Breakdown**:
  - Disease name & scientific name (e.g., *Colletotrichum falcatum*).
  - AI confidence score (94%) & severity level.
  - Observed symptoms bullet points.
  - **🌿 Organic Remedy**: Bio-fungicides (Trichoderma, neem oil).
  - **🧪 Chemical Treatment**: Recommended active ingredients and dosages.

### 🎋 Screen F: Sugarcane Cultivation & Lifecycle Guide (Module 3)
- **Target Variety**: **Co-86032 (Nira)** — Adsali season.
- **4 Growth Stages**: Germination (0–35d) ➔ Tillering (36–120d) ➔ Grand Growth (121–270d) ➔ Maturity (271–360+d).
- **Stage Advice**: Stage-specific drip irrigation, NPK top-dressing, and stem borer control.
- **Seed Sett Calculator**: Calculates two-eye bud setts needed for specified acreage.
- **Fertilizer Dose Estimator**: Recommends bags of Urea, DAP, and MOP.
- **Brix Sugar Maturity Meter**: Refractometer sugar recovery evaluation (>18° Brix).

### 📋 Screen G2: Agronomy Telemetry & Operations Log (Module 5)
- **Telemetry Sensors**: Plant Health Index (95%), Soil Moisture (72%), Soil pH (6.8).
- **7-Day Spline Chart**: SVG spline curve visualizing soil moisture dynamics over the past week.
- **Activity Log**: Chronological timeline of irrigation, fertilization, and spraying operations.
- **+ Log Task Modal**: Form to record new activities with offline sync queue.

### 👤 Screen H: Profile, Settings & Support
- **Farmer Identity**: Code `MH-PUN-0924`, village, taluka, district, 14 years experience.
- **Language Switcher**: Dedicated trilingual radio selector.
- **Helpline Card**: Toll-free Kisan Call Center hotline (`1800-180-1551`).
- **Logout Action**: Safe session termination.

---

## 3. Directory Structure

```text
farmer-mobile-app/
├── App.tsx                     # Root entry point with Providers
├── app.json                    # Expo configuration
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
└── src/
    ├── api/                    # API client with Android emulator loopback (10.0.2.2) & mock fallback
    │   ├── client.ts
    │   └── mockData.ts
    ├── constants/              # Theme, agricultural palette, spacing, shadows
    │   └── theme.ts
    ├── context/                # App state (auth, fields, activities, sync)
    │   └── AppContext.tsx
    ├── i18n/                   # Trilingual dictionaries and LanguageProvider
    │   ├── index.tsx
    │   ├── en.ts
    │   ├── hi.ts
    │   └── mr.ts
    ├── components/             # Reusable UI components
    │   ├── Header.tsx
    │   ├── WeatherCard.tsx
    │   ├── FieldPolygonMap.tsx # SVG GIS boundary canvas
    │   ├── SplineChart.tsx     # SVG 7-day spline curve
    │   └── PestScannerView.tsx # Camera viewfinder & laser scanner
    ├── navigation/             # Bottom Tabs & Stack navigation
    │   ├── AppNavigator.tsx
    │   └── types.ts
    ├── screens/                # All 8 application screens
    │   ├── auth/
    │   │   ├── LoginScreen.tsx
    │   │   └── RegisterScreen.tsx
    │   ├── dashboard/
    │   │   └── DashboardScreen.tsx
    │   ├── farm/
    │   │   ├── MyFarmScreen.tsx
    │   │   ├── FieldDetailScreen.tsx
    │   │   └── GisMapScreen.tsx
    │   ├── advisory/
    │   │   ├── WeatherScreen.tsx
    │   │   ├── PestScannerScreen.tsx
    │   │   └── SugarcaneScreen.tsx
    │   ├── telemetry/
    │   │   └── ActivitiesScreen.tsx
    │   └── profile/
    │       └── ProfileScreen.tsx
    └── types/                  # TypeScript interface definitions
        └── index.ts
```
