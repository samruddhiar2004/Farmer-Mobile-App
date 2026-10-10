# KisanSaathi — Clickable HTML Mobile Prototype

**Product:** KisanSaathi — Better Farming, Brighter Future  
**Stack:** HTML5, CSS3 (Vanilla Agricultural Design System), Vanilla JavaScript  
**Languages:** English, Hindi (हिंदी), Marathi (मराठी)  

---

## 1. Quick Start Instructions

You can run this prototype immediately using any web browser or local HTTP server.

### Option A: Using Python's Built-in HTTP Server (Recommended)

Run the following command in PowerShell:

```powershell
cd "c:\Sam's Work\Farmer-Mobile_App\farmer-app-prototype"
python -m http.server 3000
```

Then open your browser at:
👉 **`http://localhost:3000`**

### Option B: Using Node.js `npx serve`

```powershell
cd "c:\Sam's Work\Farmer-Mobile_App\farmer-app-prototype"
npx.cmd -y serve -l 3000
```

### Option C: Direct File Execution
You can also double-click `index.html` in Windows Explorer to open it directly in Chrome, Edge, or Firefox.

---

## 2. Interactive Features to Test

1. **Trilingual Toggle**: Click `English`, `हिंदी`, or `मराठी` in the top bar to watch the entire UI translate live without page reloads.
2. **Demo Quick-Login**: Click **⚡ जलद डेमो लॉगिन: राहुल पाटील** on the login screen to automatically log in as Rahul Patil (Baramati).
3. **Weather & Spray Advisory**: Inspect the floating 31°C card and click it to open the full 7-day forecast and spray safety window.
4. **My Farm Management**: View Field 1 (Wheat), Field 2 (Sugarcane), and Field 3 (Onion). Click **"+ नवीन प्लॉट"** to test adding a new field plot to the local state.
5. **Interactive GIS Farm Map**: Click **"शेताचा नकाशा (GIS)"** to see real field boundary polygons rendered on an aerial canvas. Click any plot to view its GPS vertices and soil telemetry.
6. **Plant Health & Pest Scanner**: Click **"रोग व कीड निदान"**, pick a crop, and tap **"स्कॅन करा"** to see the laser scanning animation and instant organic/chemical treatment advice.
7. **Sugarcane Cultivation Guide**: Click **"ऊस पीक मार्गदर्शन"** to see growth stages for variety **Co-86032 (Nira)**, calculate seed setts, and check the Brix maturity index.
8. **Soil Moisture & Growth Trend**: Click **"माती आणि पीक आरोग्य"** to see the 7-day spline curve and log a new agricultural operation.
