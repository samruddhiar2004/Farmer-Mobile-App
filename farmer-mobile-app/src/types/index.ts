// TypeScript Definitions for KisanSaathi Mobile Application

export type SupportedLanguage = 'en' | 'hi' | 'mr';

export interface Farmer {
  id: string;
  code: string;
  name: string;
  mobile: string;
  village: string;
  taluka: string;
  district: string;
  state: string;
  soilType: string;
  experienceYears: number;
  kisanCreditCardNo: string;
  totalArea: number;
  areaUnit: string;
}

export interface Farm {
  id: string;
  name: string;
  location: string;
  area: number;
  areaUnit: string;
  soilType: string;
  irrigationSource: string;
  latitude: number;
  longitude: number;
}

export interface Coordinate {
  lat: number;
  lng: number;
}

export type CropStatus = 'GROWING' | 'READY_FOR_HARVEST' | 'SOWN' | 'PLANNED';

export interface Field {
  id: string;
  farmId: string;
  name: string;
  area: number;
  areaUnit: string;
  cropName: string;
  variety: string;
  season: string;
  sowingDate: string;
  expectedHarvestDate: string;
  status: CropStatus;
  healthScore: number;
  soilMoisture: number;
  soilType: string;
  irrigation: string;
  notes: string;
  color: string;
  polygon: Coordinate[];
}

export interface FarmActivity {
  id: string;
  fieldId: string;
  fieldName: string;
  type: string; // 'IRRIGATION' | 'FERTILIZATION' | 'PEST_CONTROL' | 'WEEDING' | 'HARVESTING' | 'SOIL_TEST'
  date: string;
  description: string;
  operator: string;
  cost: number;
  synced: boolean;
}

export interface WeatherDay {
  day: string;
  dayShort: string;
  date: string;
  condition: string;
  tempMax: number;
  tempMin: number;
  rainProb: number;
  humidity: number;
  windSpeed: number;
  icon: string;
  spraySafe: boolean;
}

export interface CurrentWeather {
  temp: number;
  condition: string;
  tempHigh: number;
  tempLow: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  pressure: number;
  sunrise: string;
  sunset: string;
  spraySafetyText: string;
  spraySafetyStatus: 'SAFE' | 'CAUTION' | 'DANGER';
  irrigationGuidance: string;
  forecast: WeatherDay[];
}

export interface PestDiagnosis {
  id: string;
  crop: string;
  name: string;
  scientificName: string;
  confidence: number;
  severity: 'Low' | 'Moderate' | 'High';
  symptoms: string[];
  organicRemedy: string;
  chemicalTreatment: string;
  prevention: string[];
}

export interface SugarcaneStage {
  id: string;
  number: number;
  name: string;
  daysRange: string;
  status: 'COMPLETED' | 'ACTIVE' | 'UPCOMING';
  description: string;
  irrigationTip: string;
  fertilizerTip: string;
  pestWarning: string;
}
