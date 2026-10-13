import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { COLORS } from '../constants/theme';
import { useLanguage } from '../i18n';
import { useApp } from '../context/AppContext';

// Screens
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { MyFarmScreen } from '../screens/farm/MyFarmScreen';
import { FieldDetailScreen } from '../screens/farm/FieldDetailScreen';
import { GisMapScreen } from '../screens/farm/GisMapScreen';
import { WeatherScreen } from '../screens/advisory/WeatherScreen';
import { PestScannerScreen } from '../screens/advisory/PestScannerScreen';
import { SugarcaneScreen } from '../screens/advisory/SugarcaneScreen';
import { ActivitiesScreen } from '../screens/telemetry/ActivitiesScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';

import { RootStackParamList, BottomTabParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

const TabNavigator: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primaryDark,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarLabel: t('navHome'),
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20 }}>{focused ? '🏡' : '🏠'}</Text>
          ),
        }}
      />
      <Tab.Screen
        name="My Farm"
        component={MyFarmScreen}
        options={{
          tabBarLabel: t('navMyFarm'),
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20 }}>{focused ? '🚜' : '🌾'}</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Advisory"
        component={WeatherScreen}
        options={{
          tabBarLabel: t('navAdvisory'),
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20 }}>{focused ? '⛅' : '🌦️'}</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: t('navProfile'),
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20 }}>{focused ? '👨‍🌾' : '👤'}</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  const { isAuthenticated } = useApp();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen name="FieldDetail" component={FieldDetailScreen} />
            <Stack.Screen name="GisMap" component={GisMapScreen} />
            <Stack.Screen name="WeatherDetail" component={WeatherScreen} />
            <Stack.Screen name="PestScanner" component={PestScannerScreen} />
            <Stack.Screen name="SugarcaneGuide" component={SugarcaneScreen} />
            <Stack.Screen name="ActivitiesDetail" component={ActivitiesScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    paddingBottom: 8,
    paddingTop: 6,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
});
