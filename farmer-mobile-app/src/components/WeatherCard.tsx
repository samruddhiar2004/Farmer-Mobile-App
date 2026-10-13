import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { useLanguage } from '../i18n';
import { CurrentWeather } from '../types';

interface WeatherCardProps {
  weather: CurrentWeather;
  onPress?: () => void;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather, onPress }) => {
  const { t } = useLanguage();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.card}
    >
      <View style={styles.topRow}>
        <View style={styles.tempGroup}>
          <Text style={styles.tempText}>{weather.temp}°C</Text>
          <View style={styles.conditionGroup}>
            <Text style={styles.conditionText}>{weather.condition}</Text>
            <Text style={styles.highLowText}>
              ↑ {weather.tempHigh}° • ↓ {weather.tempLow}°
            </Text>
          </View>
        </View>

        <View style={styles.iconCircle}>
          <Text style={styles.weatherIcon}>⛅</Text>
        </View>
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>{t('humidity')}</Text>
          <Text style={styles.metricVal}>💧 {weather.humidity}%</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>{t('windSpeed')}</Text>
          <Text style={styles.metricVal}>💨 {weather.windSpeed} km/h</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>{t('precipitation')}</Text>
          <Text style={styles.metricVal}>🌧️ {weather.precipitation} mm</Text>
        </View>
      </View>

      {/* Actionable Spray Advisory Banner */}
      <View style={styles.advisoryBanner}>
        <View style={styles.advisoryHeader}>
          <Text style={styles.advisoryBadgeText}>🎯 {t('sprayAdvisoryTitle')}</Text>
          <Text style={styles.advisoryStatusPill}>✓ {t('sprayWindowStatus')}</Text>
        </View>
        <Text style={styles.advisoryDesc}>{t('sprayAdvisoryGood')}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.cardPadding,
    marginHorizontal: SPACING.lg,
    marginTop: -SPACING.md, // Float slightly over header
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...SHADOWS.md,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tempGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tempText: {
    fontSize: 34,
    fontWeight: '800',
    color: COLORS.primaryDark,
    letterSpacing: -1,
  },
  conditionGroup: {
    marginLeft: SPACING.md,
  },
  conditionText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  highLowText: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
    fontWeight: '500',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherIcon: {
    fontSize: 26,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.cardSubtle,
    borderRadius: RADIUS.md,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: SPACING.md,
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#E2E8F0',
  },
  metricLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  metricVal: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMain,
    marginTop: 2,
  },
  advisoryBanner: {
    backgroundColor: COLORS.primarySubtle,
    borderRadius: RADIUS.md,
    padding: SPACING.sm + 2,
    marginTop: SPACING.sm,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  advisoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  advisoryBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
  },
  advisoryStatusPill: {
    fontSize: 9.5,
    fontWeight: '700',
    color: COLORS.success,
    backgroundColor: COLORS.successLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  advisoryDesc: {
    fontSize: 11.5,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
});
