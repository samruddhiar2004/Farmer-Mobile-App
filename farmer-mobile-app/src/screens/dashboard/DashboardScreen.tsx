import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../constants/theme';
import { useLanguage } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { Header } from '../../components/Header';
import { WeatherCard } from '../../components/WeatherCard';
import { apiClient } from '../../api/client';

export const DashboardScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useLanguage();
  const { farmer, fields, activities, weather } = useApp();

  const totalAcres = fields.reduce((sum, f) => sum + f.area, 0);

  const modules = [
    {
      id: 'weather',
      title: t('moduleWeather'),
      desc: t('moduleWeatherDesc'),
      icon: '⛅',
      color: '#0284C7',
      bg: '#E0F2FE',
      screen: 'WeatherDetail',
    },
    {
      id: 'pest',
      title: t('modulePest'),
      desc: t('modulePestDesc'),
      icon: '🐛',
      color: '#EA580C',
      bg: '#FFEDD5',
      screen: 'PestScanner',
    },
    {
      id: 'sugarcane',
      title: t('moduleSugarcane'),
      desc: t('moduleSugarcaneDesc'),
      icon: '🎋',
      color: '#16A34A',
      bg: '#DCFCE7',
      screen: 'SugarcaneGuide',
    },
    {
      id: 'gis',
      title: t('moduleGisMap'),
      desc: t('moduleGisMapDesc'),
      icon: '🗺️',
      color: '#7C3AED',
      bg: '#EDE9FE',
      screen: 'GisMap',
    },
    {
      id: 'telemetry',
      title: t('moduleTelemetry'),
      desc: t('moduleTelemetryDesc'),
      icon: '📋',
      color: '#0D9488',
      bg: '#CCFBF1',
      screen: 'ActivitiesDetail',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Header */}
        <Header />

        {/* Floating Weather Card */}
        <WeatherCard
          weather={weather}
          onPress={() => navigation.navigate('WeatherDetail')}
        />

        {/* My Farm Snapshot Card */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('myFarmSummary')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('My Farm')}>
            <Text style={styles.seeAllText}>{t('viewAllFarms')} ➜</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.farmSnapshotCard}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('My Farm')}
        >
          <View style={styles.farmHeroImageContainer}>
            <Image
              source={require('../../../assets/images/farm_hero.jpg')}
              style={styles.farmHeroImage}
              resizeMode="cover"
            />
            <View style={styles.farmImageOverlay} />
            <View style={styles.farmImageContent}>
              <View style={styles.farmSnapRow}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text style={styles.farmSnapTitle}>🚜 {farmer.name}'s Farm</Text>
                  <Text style={styles.farmSnapSubtitle}>
                    {farmer.village}, {farmer.taluka} • {farmer.soilType}
                  </Text>
                </View>
                <View style={styles.farmAreaBadge}>
                  <Text style={styles.farmAreaVal}>{totalAcres}</Text>
                  <Text style={styles.farmAreaUnit}>Acres</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.plotChipsRow}>
            {fields.map((field) => (
              <View key={field.id} style={styles.plotChip}>
                <View style={[styles.plotColorDot, { backgroundColor: field.color }]} />
                <Text style={styles.plotChipText}>
                  {field.cropName} ({field.area} Ac)
                </Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>

        {/* 5 Core Agricultural Services Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('coreModulesTitle')}</Text>
        </View>

        <View style={styles.modulesGrid}>
          {modules.map((m) => (
            <TouchableOpacity
              key={m.id}
              style={styles.moduleCard}
              activeOpacity={0.85}
              onPress={() => navigation.navigate(m.screen)}
            >
              <View style={[styles.moduleIconBox, { backgroundColor: m.bg }]}>
                <Text style={styles.moduleEmoji}>{m.icon}</Text>
              </View>
              <View style={styles.moduleTextContainer}>
                <Text style={styles.moduleTitle}>{m.title}</Text>
                <Text style={styles.moduleDesc} numberOfLines={2}>
                  {m.desc}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Farm Alerts & Reminders */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('alertsTitle')}</Text>
        </View>

        <View style={styles.alertCard}>
          <View style={styles.alertItem}>
            <Text style={styles.alertIcon}>⚠️</Text>
            <View style={styles.alertTextContent}>
              <Text style={styles.alertText}>{t('alert1Text')}</Text>
              <Text style={styles.alertTime}>Scheduled: 10:00 AM Today</Text>
            </View>
          </View>
          <View style={styles.alertDivider} />
          <View style={styles.alertItem}>
            <Text style={styles.alertIcon}>🌾</Text>
            <View style={styles.alertTextContent}>
              <Text style={styles.alertText}>{t('alert2Text')}</Text>
              <Text style={styles.alertTime}>Optimal Market Arrival: This Week</Text>
            </View>
          </View>
        </View>

        {/* Recent Farm Operations */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('recentActivitiesTitle')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ActivitiesDetail')}>
            <Text style={styles.seeAllText}>{t('viewAllFarms')} ➜</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activitiesContainer}>
          {activities.slice(0, 3).map((act) => (
            <View key={act.id} style={styles.activityCard}>
              <View style={styles.activityHeader}>
                <Text style={styles.actTypeBadge}>{act.type}</Text>
                <Text style={styles.actDate}>{act.date}</Text>
              </View>
              <Text style={styles.actFieldName}>{act.fieldName}</Text>
              <Text style={styles.actDesc}>{act.description}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    marginBottom: SPACING.xs,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  seeAllText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: COLORS.primary,
  },
  farmSnapshotCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginTop: SPACING.xs,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    padding: 0,
    ...SHADOWS.md,
  },
  farmHeroImageContainer: {
    height: 120,
    position: 'relative',
    overflow: 'hidden',
  },
  farmHeroImage: {
    width: '100%',
    height: '100%',
  },
  farmImageOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },
  farmImageContent: {
    ...StyleSheet.absoluteFill,
    padding: SPACING.cardPadding,
    justifyContent: 'flex-end',
  },
  farmSnapRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  farmSnapTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  farmSnapSubtitle: {
    fontSize: 11.5,
    color: '#D1FAE5',
    marginTop: 2,
    fontWeight: '600',
  },
  farmAreaBadge: {
    backgroundColor: COLORS.primarySubtle,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: RADIUS.md,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
  },
  farmAreaVal: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primaryDark,
  },
  farmAreaUnit: {
    fontSize: 9.5,
    fontWeight: '700',
    color: COLORS.primary,
    textTransform: 'uppercase',
  },
  plotChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  plotChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: RADIUS.full,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  plotColorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  plotChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  modulesGrid: {
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.xs,
    gap: SPACING.sm,
  },
  moduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...SHADOWS.sm,
  },
  moduleIconBox: {
    width: 46,
    height: 46,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  moduleEmoji: {
    fontSize: 22,
  },
  moduleTextContainer: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  moduleDesc: {
    fontSize: 11.5,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  alertCard: {
    backgroundColor: '#FEF9C3',
    marginHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
    padding: 12,
    borderWidth: 1,
    borderColor: '#FDE047',
    marginTop: SPACING.xs,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  alertIcon: {
    fontSize: 18,
    marginRight: 8,
    marginTop: 2,
  },
  alertTextContent: {
    flex: 1,
  },
  alertText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#854D0E',
    lineHeight: 16,
  },
  alertTime: {
    fontSize: 10,
    color: '#A16207',
    marginTop: 2,
  },
  alertDivider: {
    height: 1,
    backgroundColor: '#FEF08A',
    marginVertical: 8,
  },
  activitiesContainer: {
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.xs,
    gap: SPACING.sm,
  },
  activityCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  actTypeBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primaryDark,
    backgroundColor: COLORS.primaryTint,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  actDate: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  actFieldName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textMain,
    marginBottom: 2,
  },
  actDesc: {
    fontSize: 11.5,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
});
