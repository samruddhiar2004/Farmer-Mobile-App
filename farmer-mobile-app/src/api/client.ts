import { Platform } from 'react-native';
import { mockFarmer, mockFarm, initialFields, initialActivities, mockWeather, pestDatabase, sugarcaneStages } from './mockData';
import { Field, FarmActivity } from '../types';

// Android Emulator accesses host machine localhost via 10.0.2.2
export const API_BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080';

export const apiClient = {
  getFarmerProfile: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/profile`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) return await res.json();
    } catch {
      // Fallback to local offline data
    }
    return mockFarmer;
  },

  getFields: async (): Promise<Field[]> => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/fields`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) return await res.json();
    } catch {
      // Fallback to local offline data
    }
    return initialFields;
  },

  getActivities: async (): Promise<FarmActivity[]> => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/activities`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return initialActivities;
  },

  syncActivity: async (activity: FarmActivity): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/activities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activity),
        signal: AbortSignal.timeout(2000),
      });
      return res.ok;
    } catch {
      return false; // Stored offline
    }
  },

  getWeather: () => mockWeather,
  getPestDiagnoses: () => pestDatabase,
  getSugarcaneStages: () => sugarcaneStages,
};
