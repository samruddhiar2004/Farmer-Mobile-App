// KisanSaathi Sample Agricultural Datasets
// Seeded from C:\Sam's Work\Kotlin-Farmer App with realistic Indian farming parameters

const initialSampleData = {
  farmer: {
    id: "farmer_rahul",
    code: "MH-PUN-0924",
    name: "Rahul Patil",
    mobile: "9822012345",
    password: "farmer123",
    village: "Malegaon",
    taluka: "Baramati",
    district: "Pune",
    state: "Maharashtra",
    soilType: "Deep Black Cotton Soil",
    experienceYears: 14,
    kisanCreditCardNo: "KCC-MH-78921",
    totalArea: 12.5,
    areaUnit: "Acres"
  },

  farms: [
    {
      id: "farm_1",
      name: "Rahul Krishi Farm",
      location: "Malegaon Bk., Baramati, Pune",
      area: 12.5,
      areaUnit: "Acres",
      soilType: "Deep Black Cotton Soil",
      irrigationSource: "Nira Left Canal & Open Well",
      latitude: 18.1523,
      longitude: 74.5768,
      photo: "farm_hero"
    }
  ],

  fields: [
    {
      id: "field_1",
      farmId: "farm_1",
      name: "Field 1 — North Canal Block",
      area: 4.0,
      areaUnit: "Acres",
      cropName: "Wheat",
      variety: "HD-2967 (Sharbati)",
      season: "Rabi",
      sowingDate: "15 Nov 2026",
      expectedHarvestDate: "25 Mar 2027",
      status: "GROWING",
      healthScore: 96,
      soilMoisture: 74,
      soilType: "Black Cotton Soil",
      irrigation: "Drip Irrigation (16mm lateral)",
      notes: "Top dressing of urea scheduled post 2nd irrigation.",
      color: "#22c55e",
      polygon: [
        { lat: 18.1530, lng: 74.5760 },
        { lat: 18.1542, lng: 74.5775 },
        { lat: 18.1535, lng: 74.5790 },
        { lat: 18.1520, lng: 74.5770 }
      ]
    },
    {
      id: "field_2",
      farmId: "farm_1",
      name: "Field 2 — Well Plot",
      area: 5.0,
      areaUnit: "Acres",
      cropName: "Sugarcane",
      variety: "Co-86032 (Nira)",
      season: "Adsali",
      sowingDate: "10 Aug 2026",
      expectedHarvestDate: "15 Dec 2027",
      status: "GROWING",
      healthScore: 94,
      soilMoisture: 68,
      soilType: "Clay Loam Soil",
      irrigation: "Drip Fertigation Automated",
      notes: "Trash mulching applied. Good tillering observed.",
      color: "#eab308",
      polygon: [
        { lat: 18.1520, lng: 74.5770 },
        { lat: 18.1535, lng: 74.5790 },
        { lat: 18.1518, lng: 74.5810 },
        { lat: 18.1505, lng: 74.5785 }
      ]
    },
    {
      id: "field_3",
      farmId: "farm_1",
      name: "Field 3 — Roadside Plot",
      area: 3.5,
      areaUnit: "Acres",
      cropName: "Red Onion",
      variety: "Bhima Kiran",
      season: "Kharif Late",
      sowingDate: "01 Sep 2026",
      expectedHarvestDate: "20 Oct 2026",
      status: "READY_FOR_HARVEST",
      healthScore: 98,
      soilMoisture: 62,
      soilType: "Medium Black Soil",
      irrigation: "Micro-sprinklers",
      notes: "Neck fall observed in 60% plants. Lifting ready.",
      color: "#f97316",
      polygon: [
        { lat: 18.1505, lng: 74.5785 },
        { lat: 18.1518, lng: 74.5810 },
        { lat: 18.1495, lng: 74.5815 },
        { lat: 18.1490, lng: 74.5790 }
      ]
    }
  ],

  weather: {
    location: "Malegaon Bk., Baramati, Pune",
    temp: 31,
    tempHigh: 33,
    tempLow: 21,
    condition: "Partly Cloudy",
    conditionCode: "cloudy",
    humidity: 72,
    rainfallProb: 10,
    windSpeed: 8,
    pressure: 940,
    sunrise: "06:14 AM",
    sunset: "06:08 PM",
    uvIndex: 6,
    spraySafetyScore: "EXCELLENT",
    spraySafetyAdvice: "Safe for foliar spray. Wind is mild (<10 km/h) and no rain expected in next 12 hours.",
    irrigationAdvice: "Optimal soil moisture (72%). Save pump energy; irrigation not required today.",
    forecast: [
      { day: "Today", temp: "31° / 21°", condition: "⛅ Partly Cloudy", rain: "10%" },
      { day: "Sun", temp: "32° / 22°", condition: "☀️ Clear & Sunny", rain: "5%" },
      { day: "Mon", temp: "30° / 22°", condition: "🌧️ Light Rain", rain: "55%" },
      { day: "Tue", temp: "29° / 20°", condition: "⛈️ Showers", rain: "70%" },
      { day: "Wed", temp: "31° / 21°", condition: "⛅ Clearing", rain: "20%" },
      { day: "Thu", temp: "32° / 22°", condition: "☀️ Sunny", rain: "0%" },
      { day: "Fri", temp: "33° / 23°", condition: "☀️ Bright Sun", rain: "0%" }
    ],
    notes: [
      { id: 1, date: "10 Oct, 08:30 AM", author: "Rahul Patil", text: "Checked drip discharge in Field 2. Pressure steady at 1.5 kg/cm²." },
      { id: 2, date: "08 Oct, 05:15 PM", author: "Rahul Patil", text: "Onion tops starting neck fall. Scheduled harvest team for next week." },
      { id: 3, date: "05 Oct, 09:00 AM", author: "Rahul Patil", text: "Completed foliar application of 19:19:19 on sugarcane." }
    ]
  },

  pestDiagnoses: {
    sugarcane: {
      disease: "Sugarcane Red Rot (Colletotrichum falcatum)",
      confidence: "94%",
      severity: "Moderate Alert",
      badgeClass: "badge-warning",
      symptoms: "Discoloration and reddening of internal pith with crosswise white patches. Yellowing and drying of upper leaves starting from margins.",
      organicRemedy: "Soil application of Trichoderma viride / harzianum @ 2.5 kg/acre mixed with 250 kg well-decomposed FYM. Immediately rogue out and burn affected clumps.",
      chemicalRemedy: "Sett treatment before planting with Carbendazim 50% WP @ 1g per liter water. Foliar spray of Carbendazim 12% + Mancozeb 63% WP @ 2.5g/L water.",
      prevention: "Plant disease-free certified tissue culture or heat-treated setts. Practice trash mulching and avoid furrow-to-furrow water flooding."
    },
    tomato: {
      disease: "Early Blight (Alternaria solani)",
      confidence: "96%",
      severity: "Action Required",
      badgeClass: "badge-danger",
      symptoms: "Concentric target-like brown-black rings on older leaves. Premature yellowing and leaf shedding from bottom upwards.",
      organicRemedy: "Spray Pseudomonas fluorescens @ 5g/L or 5% Neem seed kernel extract (NSKE). Mulch soil to prevent soil splashing during irrigation.",
      chemicalRemedy: "Foliar spray of Mancozeb 75% WP @ 2.5g/L or Azoxystrobin 23% SC @ 1ml/L during morning hours.",
      prevention: "Stake tomato vines properly, prune lower 12 inches of foliage, and avoid overhead sprinkler watering."
    },
    wheat: {
      disease: "Yellow / Stripe Rust (Puccinia striiformis)",
      confidence: "92%",
      severity: "High Alert",
      badgeClass: "badge-danger",
      symptoms: "Linear rows of yellow pustules resembling stripes along leaf veins. Yellow dust rubs off on fingers.",
      organicRemedy: "Spray 10% Cow urine solution with garlic extract. Avoid excessive nitrogen fertilizer.",
      chemicalRemedy: "Propiconazole 25% EC (Tilt) @ 1 ml per liter of water as soon as first stripes appear.",
      prevention: "Cultivate rust-resistant varieties like HD-2967, HD-3086, or PBW-550. Timely sowing before November 20."
    },
    onion: {
      disease: "Purple Blotch (Alternaria porri)",
      confidence: "90%",
      severity: "Mild",
      badgeClass: "badge-warning",
      symptoms: "Small water-soaked lesions that enlarge into sunken purplish patches with white margins.",
      organicRemedy: "Foliar spray of Trichoderma harzianum @ 5g/L + sticker (Sandovit 0.5ml/L).",
      chemicalRemedy: "Chlorothalonil 75% WP @ 2g/L or Tebuconazole 25.9% EC @ 1ml/L.",
      prevention: "Ensure good drainage; avoid sprinkler irrigation during evening hours."
    }
  },

  sugarcaneLifecycle: {
    variety: "Co-86032 (Nira)",
    sugarRecovery: "12.8% - 13.2%",
    maturityPeriod: "12 to 14 months (Adsali: 16-18 months)",
    currentStageIndex: 2, // 0: Germination, 1: Tillering, 2: Grand Growth, 3: Maturity
    stages: [
      {
        name: "Germination Phase",
        duration: "Day 0 – 35",
        status: "Completed",
        irrigation: "Light irrigation every 7-8 days to keep soil moist.",
        fertilizer: "Basal dose: 10% Nitrogen, 100% Phosphorus, 50% Potash.",
        tips: "Dip setts in carbendazim solution for 15 mins before planting."
      },
      {
        name: "Tillering Phase",
        duration: "Day 36 – 100",
        status: "Completed",
        irrigation: "Irrigate every 8-10 days depending on soil moisture.",
        fertilizer: "First top-dressing: 40% Nitrogen applied at 45 days.",
        tips: "First light earthing-up to suppress weeds and anchor shoots."
      },
      {
        name: "Grand Growth Phase (ACTIVE)",
        duration: "Day 101 – 270",
        status: "In Progress",
        irrigation: "Peak water requirement: 4-5 hours drip daily (70-80mm/turn).",
        fertilizer: "Final top-dressing: Remaining 50% Nitrogen + 50% MOP Potash at 135 days.",
        tips: "Complete heavy earthing-up. Wrap lower dry leaves (trashing) to prevent lodging."
      },
      {
        name: "Ripening & Maturity",
        duration: "Day 271 – 360",
        status: "Upcoming",
        irrigation: "Gradually taper off irrigation. Stop watering 15 days before harvest.",
        fertilizer: "No chemical fertilizer application during ripening.",
        tips: "Check Brix index with hand refractometer. Harvest when Brix reaches 18-20%."
      }
    ],
    npkRecom: {
      n: 250, // kg/ha
      p: 115,
      k: 115
    }
  },

  activities: [
    {
      id: "act_1",
      date: "08 Oct 2026",
      type: "IRRIGATION",
      typeLabel: "Drip Irrigation",
      field: "Field 2 — Well Plot",
      description: "Operated drip irrigation system for 4 hours. Delivered 22,000 liters.",
      icon: "💧"
    },
    {
      id: "act_2",
      date: "05 Oct 2026",
      type: "FERTILIZATION",
      typeLabel: "Fertilizer Application",
      field: "Field 1 — North Canal Block",
      description: "Applied 50 kg Urea top-dress with irrigation water.",
      icon: "🌾"
    },
    {
      id: "act_3",
      date: "01 Oct 2026",
      type: "WEEDING",
      typeLabel: "Manual Weeding",
      field: "Field 3 — Roadside Plot",
      description: "Completed inter-row weeding and soil loosening for onion crop.",
      icon: "🌱"
    },
    {
      id: "act_4",
      date: "27 Sep 2026",
      type: "PESTICIDE",
      typeLabel: "Preventive Spray",
      field: "Field 2 — Well Plot",
      description: "Sprayed Chlorantraniliprole 18.5% SC against stem borer.",
      icon: "🛡️"
    }
  ]
};

// Store in LocalStorage or memory fallback
function getWorkingData() {
  const stored = localStorage.getItem("kisansaathi_data");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.warn("Using initial sample data", e);
    }
  }
  return JSON.parse(JSON.stringify(initialSampleData));
}

function saveWorkingData(data) {
  try {
    localStorage.setItem("kisansaathi_data", JSON.stringify(data));
  } catch (e) {
    console.error("Could not save to localStorage", e);
  }
}

function resetWorkingData() {
  localStorage.removeItem("kisansaathi_data");
  return JSON.parse(JSON.stringify(initialSampleData));
}
