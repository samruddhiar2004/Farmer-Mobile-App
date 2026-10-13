import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { en } from './en';
import { hi } from './hi';
import { mr } from './mr';
import { SupportedLanguage } from '../types';

type TranslationKeys = keyof typeof en;

interface LanguageContextProps {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: TranslationKeys) => string;
}

const dictionaries = {
  en,
  hi,
  mr,
};

const LanguageContext = createContext<LanguageContextProps>({
  language: 'mr',
  setLanguage: () => {},
  t: (key) => en[key] || String(key),
});

const STORAGE_KEY = '@kisansaathi_lang';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>('mr');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((saved) => {
      if (saved === 'en' || saved === 'hi' || saved === 'mr') {
        setLanguageState(saved);
      }
    });
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    AsyncStorage.setItem(STORAGE_KEY, lang).catch(() => {});
  };

  const t = (key: TranslationKeys): string => {
    const dict = dictionaries[language] || dictionaries.mr;
    return (dict as Record<string, string>)[key] || en[key] || String(key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
