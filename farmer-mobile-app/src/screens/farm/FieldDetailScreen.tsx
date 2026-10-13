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

export const FieldDetailScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useLanguage();
  const { selectedField } = useApp();

  if (!selectedField) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyContainer}>
          <Text>No field selected</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: COLORS.primary, marginTop: 10 }}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Top Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>← {t('navMyFarm')}</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{selectedField.name}</Text>
          <Text style={styles.subtitle}>
            {selectedField.cropName} • {selectedField.variety}
          </Text>
        </View>

        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroRow}>
            <View>
              <Text style={styles.heroLabel}>{t('totalAcres')}</Text>
              <Text style={styles.heroVal}>
                {selectedField.area} {selectedField.areaUnit}
              </Text>
            </View>
            <View style={styles.healthBadge}>
              <Text style={styles.healthVal}>❤️ {selectedField.healthScore}%</Text>
              <Text style={styles.healthLabel}>{t('cropHealthIndex')}</Text>
            </View>
          </View>
        </View>

        {/* Agronomic Specifications Card */}
        <View style={styles.detailsCard}>
          <Text style={styles.cardHeader}>{t('fieldDetailsTitle')}</Text>

          <View style={styles.specRow}>
            <Text style={styles.specKey}>🌱 {t('cropVariety')}:</Text>
            <Text style={styles.specVal}>{selectedField.variety}</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specKey}>📅 {t('sowingDate')}:</Text>
            <Text style={styles.specVal}>{selectedField.sowingDate}</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specKey}>🌾 {t('expectedHarvest')}:</Text>
            <Text style={styles.specVal}>{selectedField.expectedHarvestDate}</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specKey}>💧 {t('irrigationType')}:</Text>
            <Text style={styles.specVal}>{selectedField.irrigation}</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specKey}>🏔️ {t('soilType')}:</Text>
            <Text style={styles.specVal}>{selectedField.soilType}</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specKey}>📝 Field Notes:</Text>
            <Text style={styles.specVal}>{selectedField.notes}</Text>
          </View>
        </View>

        {/* GPS Boundary Coordinates Card */}
        <View style={styles.detailsCard}>
          <Text style={styles.cardHeader}>🛰️ {t('gpsBoundary')}</Text>
          <Text style={styles.gpsSubtext}>
            Geographic vertices registered with KisanSaathi GIS engine:
          </Text>

          {selectedField.polygon.map((coord, idx) => (
            <View key={idx} style={styles.coordRow}>
              <Text style={styles.coordIndex}>Vertex #{idx + 1}</Text>
              <Text style={styles.coordText}>
                {coord.lat.toFixed(5)}° N, {coord.lng.toFixed(5)}° E
              </Text>
            </View>
          ))}

          <TouchableOpacity
            style={styles.openMapBtn}
            onPress={() => navigation.navigate('GisMap')}
          >
            <Text style={styles.openMapBtnText}>🗺️ View in Interactive GIS Canvas ➜</Text>
          </TouchableOpacity>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={styles.logActivityBtn}
          onPress={() => navigation.navigate('ActivitiesDetail')}
        >
          <Text style={styles.logActivityBtnText}>📋 {t('logActivityBtn')}</Text>
        </TouchableOpacity>
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
    paddingBottom: SPACING.xxl,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginBottom: SPACING.md,
  },
  backBtn: {
    marginBottom: SPACING.sm,
  },
  backText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '700',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primaryDark,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 2,
    fontWeight: '500',
  },
  heroCard: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: RADIUS.lg,
    padding: 18,
    marginBottom: SPACING.md,
    ...SHADOWS.md,
  },
  heroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroLabel: {
    color: '#BBF7D0',
    fontSize: 12,
    fontWeight: '600',
  },
  heroVal: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '800',
    marginTop: 2,
  },
  healthBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: RADIUS.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  healthVal: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
  healthLabel: {
    color: '#BBF7D0',
    fontSize: 10,
    marginTop: 2,
  },
  detailsCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.cardPadding,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...SHADOWS.sm,
  },
  cardHeader: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 6,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  specKey: {
    fontSize: 12.5,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  specVal: {
    fontSize: 12.5,
    color: COLORS.textMain,
    fontWeight: '700',
    textAlign: 'right',
    flex: 1,
    marginLeft: 10,
  },
  gpsSubtext: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginBottom: 8,
  },
  coordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: RADIUS.sm,
    marginBottom: 6,
  },
  coordIndex: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  coordText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.primaryDark,
    fontFamily: 'monospace',
  },
  openMapBtn: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: RADIUS.md,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  openMapBtnText: {
    color: COLORS.primaryDark,
    fontSize: 12,
    fontWeight: '700',
  },
  logActivityBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
    ...SHADOWS.md,
  },
  logActivityBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
});
