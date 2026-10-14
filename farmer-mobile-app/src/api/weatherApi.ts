import { CurrentWeather, WeatherDay } from '../types';
import { mockWeather } from './mockData';

// Coordinates for Baramati, Pune (Rahul Patil's Farm location)
const DEFAULT_LAT = 18.1519;
const DEFAULT_LNG = 74.5771;

function mapWmoCode(code: number): { condition: string; icon: string } {
  if (code === 0) return { condition: 'Sunny / Clear', icon: '☀️' };
  if (code === 1 || code === 2) return { condition: 'Partly Cloudy', icon: '⛅' };
  if (code === 3) return { condition: 'Overcast', icon: '☁️' };
  if (code >= 45 && code <= 48) return { condition: 'Foggy / Hazy', icon: '🌫️' };
  if (code >= 51 && code <= 55) return { condition: 'Light Drizzle', icon: '🌦️' };
  if (code >= 61 && code <= 65) return { condition: 'Rain Showers', icon: '🌧️' };
  if (code >= 80 && code <= 82) return { condition: 'Heavy Rain Showers', icon: '⛈️' };
  if (code >= 95) return { condition: 'Thunderstorm', icon: '⛈️' };
  return { condition: 'Partly Cloudy', icon: '⛅' };
}

export async function fetchLiveWeather(
  lat: number = DEFAULT_LAT,
  lng: number = DEFAULT_LNG
): Promise<CurrentWeather> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,surface_pressure,wind_speed_10m,precipitation,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,relative_humidity_2m_mean&timezone=Asia%2FKolkata`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error('Weather API returned error');

    const data = await res.json();
    const current = data.current;
    const daily = data.daily;

    const weatherCode = current.weather_code ?? 2;
    const { condition } = mapWmoCode(weatherCode);

    const temp = Math.round(current.temperature_2m);
    const humidity = Math.round(current.relative_humidity_2m);
    const windSpeed = Math.round(current.wind_speed_10m);
    const precipitation = Math.round((current.precipitation ?? 0) * 10) / 10;
    const pressure = Math.round(current.surface_pressure);

    const tempHigh = Math.round(daily.temperature_2m_max?.[0] ?? temp + 3);
    const tempLow = Math.round(daily.temperature_2m_min?.[0] ?? temp - 6);

    // Calculate dynamic agronomic spray advisory
    let spraySafetyStatus: 'SAFE' | 'CAUTION' | 'DANGER' = 'SAFE';
    let spraySafetyText = 'Optimal window for foliar fertilizer or preventive insecticide spray. Low wind & safe humidity.';
    let irrigationGuidance = 'Normal irrigation schedule recommended. Soil evaporation rate is standard.';

    const rainProbToday = daily.precipitation_probability_max?.[0] ?? 10;
    if (rainProbToday > 50 || precipitation > 2) {
      spraySafetyStatus = 'DANGER';
      spraySafetyText = 'Rain risk detected (>50%). Avoid pesticide or foliar fertilizer spraying as chemicals will wash off.';
      irrigationGuidance = 'Rain forecasted. Hold electric drip pumps to save power and prevent waterlogging.';
    } else if (windSpeed > 18) {
      spraySafetyStatus = 'CAUTION';
      spraySafetyText = 'High wind speed detected (>18 km/h). Spray drift risk. Wait for morning or evening calm.';
      irrigationGuidance = 'Higher wind increases evapo-transpiration. Ensure adequate moisture in root zone.';
    } else if (humidity > 85) {
      spraySafetyStatus = 'CAUTION';
      spraySafetyText = 'High humidity (>85%). Fungal disease risk elevated. Inspect lower crop canopy.';
      irrigationGuidance = 'Maintain good field drainage. Avoid excess water stagnation.';
    }

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayShorts = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const forecast: WeatherDay[] = [];
    const times = daily.time || [];
    for (let i = 0; i < Math.min(times.length, 7); i++) {
      const d = new Date(times[i]);
      const wmo = daily.weather_code?.[i] ?? 1;
      const { condition: dayCondition, icon } = mapWmoCode(wmo);
      const rainProb = daily.precipitation_probability_max?.[i] ?? 10;
      const dayWind = Math.round(daily.wind_speed_10m_max?.[i] ?? 10);
      const dayHum = Math.round(daily.relative_humidity_2m_mean?.[i] ?? 60);

      forecast.push({
        day: i === 0 ? 'Today' : dayNames[d.getDay()],
        dayShort: i === 0 ? 'Today' : dayShorts[d.getDay()],
        date: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        condition: dayCondition,
        tempMax: Math.round(daily.temperature_2m_max?.[i] ?? 32),
        tempMin: Math.round(daily.temperature_2m_min?.[i] ?? 22),
        rainProb,
        humidity: dayHum,
        windSpeed: dayWind,
        icon,
        spraySafe: rainProb < 40 && dayWind < 18,
      });
    }

    return {
      temp,
      condition,
      tempHigh,
      tempLow,
      humidity,
      precipitation,
      windSpeed,
      pressure,
      sunrise: '06:14 AM',
      sunset: '06:08 PM',
      spraySafetyText,
      spraySafetyStatus,
      irrigationGuidance,
      forecast,
    };
  } catch (err) {
    // If offline or network error, fallback gracefully to mockWeather
    return mockWeather;
  }
}
