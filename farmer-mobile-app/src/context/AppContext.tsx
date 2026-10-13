import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Farmer, Field, FarmActivity } from '../types';
import { mockFarmer, initialFields, initialActivities } from '../api/mockData';
import { apiClient } from '../api/client';

interface AppContextProps {
  isAuthenticated: boolean;
  farmer: Farmer;
  fields: Field[];
  activities: FarmActivity[];
  selectedField: Field | null;
  setSelectedField: (field: Field | null) => void;
  login: (mobile: string, pass: string) => boolean;
  quickDemoLogin: () => void;
  logout: () => void;
  addField: (field: Omit<Field, 'id' | 'healthScore' | 'polygon'>) => void;
  addActivity: (activity: Omit<FarmActivity, 'id' | 'synced'>) => Promise<void>;
  isSynced: boolean;
}

const AppContext = createContext<AppContextProps | null>(null);

const STORAGE_AUTH_KEY = '@kisansaathi_auth';
const STORAGE_FIELDS_KEY = '@kisansaathi_fields';
const STORAGE_ACTIVITIES_KEY = '@kisansaathi_activities';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [farmer, setFarmer] = useState<Farmer>(mockFarmer);
  const [fields, setFields] = useState<Field[]>(initialFields);
  const [activities, setActivities] = useState<FarmActivity[]>(initialActivities);
  const [selectedField, setSelectedField] = useState<Field | null>(initialFields[0]);
  const [isSynced, setIsSynced] = useState<boolean>(true);

  useEffect(() => {
    // Restore session and cached records
    AsyncStorage.getItem(STORAGE_AUTH_KEY).then((auth) => {
      if (auth === 'true') setIsAuthenticated(true);
    });

    AsyncStorage.getItem(STORAGE_FIELDS_KEY).then((data) => {
      if (data) {
        try {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed) && parsed.length > 0) setFields(parsed);
        } catch {}
      }
    });

    AsyncStorage.getItem(STORAGE_ACTIVITIES_KEY).then((data) => {
      if (data) {
        try {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed) && parsed.length > 0) setActivities(parsed);
        } catch {}
      }
    });
  }, []);

  const login = (mobile: string, pass: string): boolean => {
    if (mobile === '9822012345' && pass === 'farmer123') {
      setIsAuthenticated(true);
      AsyncStorage.setItem(STORAGE_AUTH_KEY, 'true');
      return true;
    }
    // Allow any 10-digit number for demo convenience
    if (mobile.length === 10) {
      setIsAuthenticated(true);
      AsyncStorage.setItem(STORAGE_AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const quickDemoLogin = () => {
    setIsAuthenticated(true);
    AsyncStorage.setItem(STORAGE_AUTH_KEY, 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    AsyncStorage.removeItem(STORAGE_AUTH_KEY);
  };

  const addField = (newFieldData: Omit<Field, 'id' | 'healthScore' | 'polygon'>) => {
    const newField: Field = {
      ...newFieldData,
      id: `field_${Date.now()}`,
      healthScore: 92,
      polygon: [
        { lat: 18.1510, lng: 74.5800 },
        { lat: 18.1520, lng: 74.5815 },
        { lat: 18.1512, lng: 74.5825 },
        { lat: 18.1502, lng: 74.5808 },
      ]
    };
    const updated = [newField, ...fields];
    setFields(updated);
    AsyncStorage.setItem(STORAGE_FIELDS_KEY, JSON.stringify(updated));
  };

  const addActivity = async (newActData: Omit<FarmActivity, 'id' | 'synced'>) => {
    const newAct: FarmActivity = {
      ...newActData,
      id: `act_${Date.now()}`,
      synced: false,
    };

    const synced = await apiClient.syncActivity(newAct);
    newAct.synced = synced;
    setIsSynced(synced);

    const updated = [newAct, ...activities];
    setActivities(updated);
    AsyncStorage.setItem(STORAGE_ACTIVITIES_KEY, JSON.stringify(updated));
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        farmer,
        fields,
        activities,
        selectedField,
        setSelectedField,
        login,
        quickDemoLogin,
        logout,
        addField,
        addActivity,
        isSynced,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
