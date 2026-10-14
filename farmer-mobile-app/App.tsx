import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LanguageProvider } from './src/i18n';
import { AppProvider } from './src/context/AppContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { PhoneChassis } from './src/components/PhoneChassis';

export default function App() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <AppProvider>
          <StatusBar style="light" />
          <PhoneChassis>
            <AppNavigator />
          </PhoneChassis>
        </AppProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
