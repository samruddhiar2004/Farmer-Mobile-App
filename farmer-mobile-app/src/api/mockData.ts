import { Farmer, Farm, Field, FarmActivity, CurrentWeather, PestDiagnosis, SugarcaneStage } from '../types';

export const mockFarmer: Farmer = {
  id: "farmer_rahul",
  code: "MH-PUN-0924",
  name: "Rahul Patil",
  mobile: "9822012345",
  village: "Malegaon Bk.",
  taluka: "Baramati",
  district: "Pune",
  state: "Maharashtra",
  soilType: "Deep Black Cotton Soil",
  experienceYears: 14,
  kisanCreditCardNo: "KCC-MH-78921",
  totalArea: 12.5,
  areaUnit: "Acres",
};

export const mockFarm: Farm = {
  id: "farm_1",
  name: "Rahul Krishi Farm",
  location: "Malegaon Bk., Baramati, Pune",
  area: 12.5,
  areaUnit: "Acres",
  soilType: "Deep Black Cotton Soil",
  irrigationSource: "Nira Left Canal & Open Well",
  latitude: 18.1523,
  longitude: 74.5768,
};

export const initialFields: Field[] = [
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
    soilType: "Medium Sandy Loam",
    irrigation: "Micro Sprinklers",
    notes: "Neck fall 70% completed. Ready for lifting.",
    color: "#f97316",
    polygon: [
      { lat: 18.1505, lng: 74.5785 },
      { lat: 18.1518, lng: 74.5810 },
      { lat: 18.1502, lng: 74.5822 },
      { lat: 18.1492, lng: 74.5798 }
    ]
  }
];

export const initialActivities: FarmActivity[] = [
  {
    id: "act_1",
    fieldId: "field_2",
    fieldName: "Field 2 — Well Plot (Sugarcane)",
    type: "FERTILIZATION",
    date: "12 Oct 2026",
    description: "Water Soluble NPK 19:19:19 fertigation via venturi injector (25 kg/acre)",
    operator: "Rahul Patil",
    cost: 3200,
    synced: true
  },
  {
    id: "act_2",
    fieldId: "field_1",
    fieldName: "Field 1 — North Canal Block (Wheat)",
    type: "IRRIGATION",
    date: "10 Oct 2026",
    description: "Secondary canal rotation irrigation run for 3.5 hours",
    operator: "Suresh (Farm Assistant)",
    cost: 450,
    synced: true
  },
  {
    id: "act_3",
    fieldId: "field_2",
    fieldName: "Field 2 — Well Plot (Sugarcane)",
    type: "PEST_CONTROL",
    date: "06 Oct 2026",
    description: "Trichoderma harzianum soil drenching for root rot protection",
    operator: "Rahul Patil",
    cost: 1800,
    synced: true
  },
  {
    id: "act_4",
    fieldId: "field_3",
    fieldName: "Field 3 — Roadside Plot (Red Onion)",
    type: "WEEDING",
    date: "28 Sep 2026",
    description: "Manual interculture weeding and bulb exposure bed dressing",
    operator: "Contract Crew",
    cost: 4200,
    synced: true
  }
];

export const mockWeather: CurrentWeather = {
  temp: 31,
  condition: "Partly Cloudy",
  tempHigh: 33,
  tempLow: 22,
  humidity: 72,
  precipitation: 0.2,
  windSpeed: 8,
  pressure: 1012,
  sunrise: "06:14 AM",
  sunset: "06:08 PM",
  spraySafetyText: "Optimal day for foliar spray. Low wind (8 km/h) & safe humidity.",
  spraySafetyStatus: "SAFE",
  irrigationGuidance: "Soil moisture is sufficient at 72%. Hold irrigation today to save electricity and prevent root damping.",
  forecast: [
    { day: "Today", dayShort: "Mon", date: "13 Oct", condition: "Partly Cloudy", tempMax: 33, tempMin: 22, rainProb: 15, humidity: 72, windSpeed: 8, icon: "partly-cloudy", spraySafe: true },
    { day: "Tomorrow", dayShort: "Tue", date: "14 Oct", condition: "Sunny", tempMax: 34, tempMin: 21, rainProb: 10, humidity: 65, windSpeed: 9, icon: "sunny", spraySafe: true },
    { day: "Wednesday", dayShort: "Wed", date: "15 Oct", condition: "Clear Sky", tempMax: 34, tempMin: 22, rainProb: 5, humidity: 60, windSpeed: 11, icon: "sunny", spraySafe: true },
    { day: "Thursday", dayShort: "Thu", date: "16 Oct", condition: "Scattered Clouds", tempMax: 32, tempMin: 23, rainProb: 25, humidity: 75, windSpeed: 12, icon: "cloudy", spraySafe: true },
    { day: "Friday", dayShort: "Fri", date: "17 Oct", condition: "Light Rain Risk", tempMax: 29, tempMin: 21, rainProb: 65, humidity: 86, windSpeed: 18, icon: "rain", spraySafe: false },
    { day: "Saturday", dayShort: "Sat", date: "18 Oct", condition: "Thunderstorms", tempMax: 28, tempMin: 20, rainProb: 80, humidity: 90, windSpeed: 22, icon: "thunder", spraySafe: false },
    { day: "Sunday", dayShort: "Sun", date: "19 Oct", condition: "Clearing Up", tempMax: 31, tempMin: 21, rainProb: 30, humidity: 70, windSpeed: 10, icon: "partly-cloudy", spraySafe: true }
  ]
};

export const pestDatabase: Record<string, PestDiagnosis> = {
  sugarcane: {
    id: "diag_cane",
    crop: "Sugarcane",
    name: "Sugarcane Red Rot",
    scientificName: "Colletotrichum falcatum",
    confidence: 94,
    severity: "Moderate",
    symptoms: [
      "Midrib of top leaves displays reddish-brown lesions",
      "Internal pith exhibits longitudinal red discoloration with white transverse bands",
      "Withering and drying of the upper whorl leaves"
    ],
    organicRemedy: "Soil drenching with Trichoderma harzianum @ 2.5 kg/ha mixed with well-rotted farm yard manure. Promptly uproot and burn severely infected clumps.",
    chemicalTreatment: "Sett treatment with Carbendazim 50% WP @ 1g/L of water before planting. Foliar spray of Thiophanate Methyl 70% WP @ 1.5g/L.",
    prevention: [
      "Use certified disease-free sets of resistant varieties like Co-86032",
      "Avoid ratooning heavily infected fields",
      "Ensure proper furrow drainage during heavy irrigation"
    ]
  },
  tomato: {
    id: "diag_tomato",
    crop: "Tomato",
    name: "Early Blight",
    scientificName: "Alternaria solani",
    confidence: 92,
    severity: "High",
    symptoms: [
      "Concentric ring target-board spots on older bottom leaves",
      "Surrounding yellow halo around circular necrotic brown spots",
      "Premature leaf drop exposing green fruit to sunscald"
    ],
    organicRemedy: "Neem oil spray (10,000 ppm) @ 3 ml/L combined with Pseudomonas fluorescens foliar misting. Remove lower leaves up to 1 foot above soil level.",
    chemicalTreatment: "Spray Mancozeb 75% WP @ 2.5g/L or Azoxystrobin 23% SC @ 1 ml/L at early onset of spotting.",
    prevention: [
      "Practice 3-year crop rotation with non-solanaceous crops",
      "Stake plants to keep foliage off wet soil",
      "Use drip irrigation rather than overhead sprinkling"
    ]
  },
  wheat: {
    id: "diag_wheat",
    crop: "Wheat",
    name: "Yellow / Stripe Rust",
    scientificName: "Puccinia striiformis",
    confidence: 96,
    severity: "Moderate",
    symptoms: [
      "Bright yellow powdery pustules arranged in linear stripes on leaf blades",
      "Yellow dust staining fingers when touching leaves",
      "Stunted tillers and shrivelled grain filling"
    ],
    organicRemedy: "Spray Cow urine + Fermented Butter milk solution (10% v/v) or bio-fungicide Bacillus subtilis.",
    chemicalTreatment: "Propiconazole 25% EC (Tilt) @ 1 ml/L water immediately upon spotting stripe rust foci.",
    prevention: [
      "Sow rust-resistant varieties like HD-2967, PBW-550",
      "Avoid excessive nitrogenous fertilizer application in early stages",
      "Adopt timely sowing before mid-November"
    ]
  },
  onion: {
    id: "diag_onion",
    crop: "Red Onion",
    name: "Purple Blotch & Stemphylium",
    scientificName: "Alternaria porri",
    confidence: 89,
    severity: "Moderate",
    symptoms: [
      "Water-soaked lesions on leaves turning brown to dark purple with yellow border",
      "Leaves girdled and toppling over before bulb maturity",
      "Foliage blighting during humid cloudy weather"
    ],
    organicRemedy: "Foliar spray of Trichoderma viride @ 5g/L mixed with jaggery water as sticker.",
    chemicalTreatment: "Tebuconazole 25.9% EC @ 1.5 ml/L + sticker (Spreader) @ 0.5 ml/L.",
    prevention: [
      "Wide spacing to ensure air circulation across raised beds",
      "Dip seedlings in carbendazim solution for 15 minutes before transplanting"
    ]
  }
};

export const sugarcaneStages: SugarcaneStage[] = [
  {
    id: "stage_1",
    number: 1,
    name: "Germination Phase",
    daysRange: "Day 0 – 35",
    status: "COMPLETED",
    description: "Bud activation, sett root emergence, and primary shoot formation.",
    irrigationTip: "Light irrigation immediately post planting; maintain moist soil without waterlogging.",
    fertilizerTip: "Apply 10% total Nitrogen + 100% Phosphorus + 50% Potash as basal dose.",
    pestWarning: "Monitor for Termite and Early Shoot Borer (Chilo infuscatellus)."
  },
  {
    id: "stage_2",
    number: 2,
    name: "Tillering Phase",
    daysRange: "Day 36 – 120",
    status: "COMPLETED",
    description: "Mother shoot produces secondary tillers. Determines final millable cane population.",
    irrigationTip: "Irrigate every 6-8 days in drip systems. Keep moisture at 70%.",
    fertilizerTip: "Top-dress 40% Nitrogen in two equal splits with light earthing up.",
    pestWarning: "Inspect for Early Shoot Borer dead hearts; release Trichogramma chilonis egg parasitoids."
  },
  {
    id: "stage_3",
    number: 3,
    name: "Grand Growth Phase",
    daysRange: "Day 121 – 270",
    status: "ACTIVE",
    description: "Rapid elongation of internodes, leaf canopy expansion, and stalk biomass accumulation.",
    irrigationTip: "Peak water consumption phase (consume 5-7 mm/day). Ensure drip fertigation every 3 days.",
    fertilizerTip: "Apply remaining 50% Nitrogen and 50% Potash before heavy earthing up (150 days).",
    pestWarning: "Watch for Pyrilla perpusilla and Internode Borer. Maintain trash mulching."
  },
  {
    id: "stage_4",
    number: 4,
    name: "Maturity & Ripening Phase",
    daysRange: "Day 271 – 360+",
    status: "UPCOMING",
    description: "Vegetative growth slows, simple reducing sugars convert into crystalline sucrose in stalks.",
    irrigationTip: "Gradually taper off water 15-20 days prior to scheduled cutting to maximize Brix.",
    fertilizerTip: "Stop nitrogen completely. Foliar spray of Potassium sulphate (0:0:50) @ 1% accelerates ripening.",
    pestWarning: "Protect against rodent damage and wild boars as sugar content rises."
  }
];
