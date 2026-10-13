import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../constants/theme';
import { useLanguage } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { apiClient } from '../../api/client';

export const WeatherScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useLanguage();
  const { farmer } = useApp();
  const weather = apiClient.getWeather();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>⛅ {t('weatherTitle')}</Text>
          <Text style={styles.subtitle}>
            📍 {farmer.village}, {farmer.taluka}, {farmer.district} (Baramati Agro-Zone)
          </Text>
        </View>

        {/* Current Weather Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <View>
              <Text style={styles.heroTemp}>{weather.temp}°C</Text>
              <Text style={styles.heroCondition}>{weather.condition}</Text>
              <Text style={styles.heroHighLow}>
                {t('tempHigh')}: {weather.tempHigh}°C • {t('tempLow')}: {weather.tempLow}°C
              </Text>
            </View>
            <View style={styles.heroEmojiCircle}>
              <Text style={styles.heroEmoji}>⛅</Text>
            </View>
          </View>

          {/* Meteorological Metrics */}
          <View style={styles.metricsGrid}>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>{t('humidity')}</Text>
              <Text style={styles.metricVal}>💧 {weather.humidity}%</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>{t('precipitation')}</Text>
              <Text style={styles.metricVal}>🌧️ {weather.precipitation} mm</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>{t('windSpeed')}</Text>
              <Text style={styles.metricVal}>💨 {weather.windSpeed} km/h</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>{t('pressure')}</Text>
              <Text style={styles.metricVal}>⏱️ {weather.pressure} hPa</Text>
            </View>
          </View>

          {/* Sun Astronomical Timers */}
          <View style={styles.astroRow}>
            <Text style={styles.astroText}>🌅 {t('sunrise')}: {weather.sunrise}</Text>
            <Text style={styles.astroDivider}>•</Text>
            <Text style={styles.astroText}>🌇 {t('sunset')}: {weather.sunset}</Text>
          </View>
        </View>

        {/* Pesticide Spray Safety Window Card */}
        <View style={styles.sprayCard}>
          <View style={styles.sprayHeader}>
            <Text style={styles.sprayTitle}>🎯 {t('sprayWindow')}</Text>
            <View style={styles.safeBadge}>
              <Text style={styles.safeBadgeText}>✓ {t('sprayWindowStatus')}</Text>
            </View>
          </View>
          <Text style={styles.sprayDesc}>{weather.spraySafetyText}</Text>
        </View>

        {/* Irrigation Advice Card */}
        <View style={styles.irrigationCard}>
          <Text style={styles.irrigationTitle}>💧 {t('irrigationGuidance')}</Text>
          <Text style={styles.irrigationText}>{weather.irrigationGuidance}</Text>
        </View>

        {/* 7-Day Forecast */}
        <Text style={styles.forecastHeader}>{t('forecast7Day')}</Text>

        <View style={styles.forecastList}>
          {weather.forecast.map((day, idx) => (
            <View key={idx} style={styles.forecastRow}>
              <View style={styles.dayCol}>
                <Text style={styles.dayName}>{day.day}</Text>
                <Text style={styles.dayDate}>{day.date}</Text>
              </View>

              <View style={styles.conditionCol}>
                <Text style={styles.forecastIcon}>
                  {day.icon === 'sunny' ? '☀️' : day.icon === 'thunder' ? '⛈️' : day.icon === 'rain' ? '🌧️' : '⛅'}
                </Text>
                <Text style={styles.forecastConditionText}>{day.condition}</Text>
              </View>

              <View style={styles.tempCol}>
                <Text style={styles.tempMax}>{day.tempMax}°</Text>
                <Text style={styles.tempMin}>/ {day.tempMin}°</Text>
              </View>

              <View
                style={[
                  styles.sprayBadge,
                  day.spraySafe ? styles.spraySafe : styles.sprayUnsafe,
                ]}
              >
                <Text
                  style={[
                    styles.sprayBadgeText,
                    day.spraySafe ? styles.spraySafeText : styles.sprayUnsafeText,
                  ]}
                >
                  {day.spraySafe ? 'Spray OK' : 'No Spray'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl * 2,
  },
  header: {
    marginBottom: SPACING.md,
  },
  backBtn: {
    marginBottom: 6,
  },
  backText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '700',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primaryDark,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  heroCard: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: RADIUS.xl,
    padding: SPACING.cardPadding * 1.2,
    marginBottom: SPACING.md,
    ...SHADOWS.md,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroTemp: {
    fontSize: 38,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: -1,
  },
  heroCondition: {
    fontSize: 16,
    fontWeight: '700',
    color: '#BBF7D0',
    marginTop: 2,
  },
  heroHighLow: {
    fontSize: 11.5,
    color: 'rgba(255, 255, 255, 0.75)',
    marginTop: 4,
    fontWeight: '500',
  },
  heroEmojiCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroEmoji: {
    fontSize: 32,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: RADIUS.md,
    padding: 10,
    marginTop: 16,
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricLabel: {
    fontSize: 9.5,
    color: '#BBF7D0',
    fontWeight: '600',
  },
  metricVal: {
    fontSize: 11.5,
    fontWeight: '700',
    color: COLORS.white,
    marginTop: 3,
  },
  astroRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.12)',
  },
  astroText: {
    fontSize: 11,
    color: '#BBF7D0',
    fontWeight: '600',
  },
  astroDivider: {
    color: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 12,
  },
  sprayCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: RADIUS.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    marginBottom: SPACING.md,
  },
  sprayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  sprayTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primaryDark,
  },
  safeBadge: {
    backgroundColor: COLORS.successLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  safeBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.success,
  },
  sprayDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 17,
  },
  irrigationCard: {
    backgroundColor: '#F0F9FF',
    borderRadius: RADIUS.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: '#BAE6FD',
    marginBottom: SPACING.md,
  },
  irrigationTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0369A1',
    marginBottom: 4,
  },
  irrigationText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 17,
  },
  forecastHeader: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 10,
    marginTop: 4,
  },
  forecastList: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...SHADOWS.sm,
  },
  forecastRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  dayCol: {
    width: 75,
  },
  dayName: {
    fontSize: 12.5,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  dayDate: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 1,
  },
  conditionCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6,
  },
  forecastIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  forecastConditionText: {
    fontSize: 11.5,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  tempCol: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 60,
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  tempMax: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  tempMin: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginLeft: 2,
  },
  sprayBadge: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  spraySafe: {
    backgroundColor: COLORS.successLight,
  },
  sprayUnsafe: {
    backgroundColor: '#FEE2E2',
  },
  sprayBadgeText: {
    fontSize: 9.5,
    fontWeight: '700',
  },
  spraySafeText: {
    color: COLORS.success,
  },
  sprayUnsafeText: {
    color: '#DC2626',
  },
});
