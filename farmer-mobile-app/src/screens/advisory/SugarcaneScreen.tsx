import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../constants/theme';
import { useLanguage } from '../../i18n';
import { apiClient } from '../../api/client';

export const SugarcaneScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useLanguage();
  const stages = apiClient.getSugarcaneStages();

  const [activeStageId, setActiveStageId] = useState<string>('stage_3'); // Grand growth is active
  const [calcAcres, setCalcAcres] = useState<string>('5');
  const [brixReading, setBrixReading] = useState<string>('18.5');

  const selectedStage = stages.find((s) => s.id === activeStageId) || stages[2];

  // Calculators
  const acresNum = parseFloat(calcAcres) || 1;
  const settsNeeded = Math.round(acresNum * 25000);
  const ureaBags = Math.round(acresNum * 5.4);
  const dapBags = Math.round(acresNum * 2.5);
  const mopBags = Math.round(acresNum * 1.9);

  const brixNum = parseFloat(brixReading) || 0;
  const isBrixMaturityReady = brixNum >= 18;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>🎋 {t('sugarcaneTitle')}</Text>
          <Text style={styles.subtitle}>{t('sugarcaneVariety')}</Text>
        </View>

        {/* Variety Banner with Real Photography */}
        <View style={styles.varietyCard}>
          <Image
            source={require('../../../assets/images/sugarcane.jpg')}
            style={styles.caneImage}
            resizeMode="cover"
          />
          <View style={styles.varietyContent}>
            <View style={styles.varietyTop}>
              <Text style={styles.varietyTitle}>Co-86032 (Nira) — Adsali</Text>
              <View style={styles.activePill}>
                <Text style={styles.activePillText}>Stage 3 Active</Text>
              </View>
            </View>
            <Text style={styles.varietyDesc}>
              High-tonnage, high-sugar recovery variety widely grown across Maharashtra, Gujarat, and Karnataka. Average yield: 60–80 tonnes/acre under drip.
            </Text>
          </View>
        </View>

        {/* 4 Lifecycle Stage Selector Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.stageTabsScroll}
        >
          {stages.map((stg) => (
            <TouchableOpacity
              key={stg.id}
              style={[
                styles.stageTab,
                activeStageId === stg.id && styles.stageTabActive,
              ]}
              onPress={() => setActiveStageId(stg.id)}
            >
              <View
                style={[
                  styles.statusDot,
                  stg.status === 'COMPLETED'
                    ? styles.dotCompleted
                    : stg.status === 'ACTIVE'
                    ? styles.dotActive
                    : styles.dotUpcoming,
                ]}
              />
              <Text
                style={[
                  styles.stageTabText,
                  activeStageId === stg.id && styles.stageTabTextActive,
                ]}
              >
                {stg.number}. {stg.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Selected Stage Detail Card */}
        <View style={styles.stageCard}>
          <View style={styles.stageCardHeader}>
            <View>
              <Text style={styles.stageCardTitle}>{selectedStage.name}</Text>
              <Text style={styles.stageDays}>Duration: {selectedStage.daysRange}</Text>
            </View>
            <View
              style={[
                styles.stageBadge,
                selectedStage.status === 'ACTIVE' ? styles.badgeActive : styles.badgeNormal,
              ]}
            >
              <Text style={styles.stageBadgeText}>{selectedStage.status}</Text>
            </View>
          </View>

          <Text style={styles.stageSummary}>{selectedStage.description}</Text>

          {/* Tips breakdown */}
          <View style={styles.tipBox}>
            <Text style={styles.tipTitle}>💧 {t('irrigationSchedule')}</Text>
            <Text style={styles.tipText}>{selectedStage.irrigationTip}</Text>
          </View>

          <View style={styles.tipBox}>
            <Text style={styles.tipTitle}>🌱 {t('fertilizerDose')}</Text>
            <Text style={styles.tipText}>{selectedStage.fertilizerTip}</Text>
          </View>

          <View style={styles.tipBox}>
            <Text style={styles.tipTitle}>🐛 {t('pestManagement')}</Text>
            <Text style={styles.tipText}>{selectedStage.pestWarning}</Text>
          </View>
        </View>

        {/* Interactive Seed Sett & Fertilizer Calculator */}
        <View style={styles.calcCard}>
          <Text style={styles.calcTitle}>🧮 Sugarcane Input Estimator</Text>
          <Text style={styles.calcSubtitle}>
            Calculate seed sets and basal fertilizer requirement for your acreage
          </Text>

          <View style={styles.calcInputRow}>
            <Text style={styles.calcLabel}>Cultivation Area (Acres):</Text>
            <TextInput
              style={styles.calcInput}
              keyboardType="numeric"
              value={calcAcres}
              onChangeText={setCalcAcres}
            />
          </View>

          <View style={styles.calcResultsGrid}>
            <View style={styles.calcResultBox}>
              <Text style={styles.calcResLabel}>Seed Setts Needed</Text>
              <Text style={styles.calcResVal}>{settsNeeded.toLocaleString()}</Text>
              <Text style={styles.calcResSub}>2-eye bud setts</Text>
            </View>
            <View style={styles.calcResultBox}>
              <Text style={styles.calcResLabel}>Urea (46% N)</Text>
              <Text style={styles.calcResVal}>{ureaBags} Bags</Text>
              <Text style={styles.calcResSub}>Split over stages</Text>
            </View>
            <View style={styles.calcResultBox}>
              <Text style={styles.calcResLabel}>DAP (18:46)</Text>
              <Text style={styles.calcResVal}>{dapBags} Bags</Text>
              <Text style={styles.calcResSub}>Basal dose</Text>
            </View>
            <View style={styles.calcResultBox}>
              <Text style={styles.calcResLabel}>MOP (Potash)</Text>
              <Text style={styles.calcResVal}>{mopBags} Bags</Text>
              <Text style={styles.calcResSub}>For stalk weight</Text>
            </View>
          </View>
        </View>

        {/* Brix Sugar Maturity Meter */}
        <View style={styles.brixCard}>
          <Text style={styles.brixTitle}>🔬 {t('brixTitle')}</Text>
          <Text style={styles.brixDesc}>{t('brixDesc')}</Text>

          <View style={styles.brixRow}>
            <Text style={styles.brixLabel}>Hand Refractometer Reading (°Brix):</Text>
            <TextInput
              style={styles.brixInput}
              keyboardType="numeric"
              value={brixReading}
              onChangeText={setBrixReading}
            />
          </View>

          <View
            style={[
              styles.brixStatusBanner,
              isBrixMaturityReady ? styles.brixReady : styles.brixNotReady,
            ]}
          >
            <Text style={styles.brixStatusText}>
              {isBrixMaturityReady
                ? '✅ Optimal Harvest Maturity! Commercial cane sugar recovery is > 11.5%.'
                : '⏳ Cane is still accumulating sucrose. Allow another 2–3 weeks.'}
            </Text>
          </View>
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
    marginBottom: SPACING.sm,
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
  varietyCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    marginTop: SPACING.xs,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  caneImage: {
    width: '100%',
    height: 130,
  },
  varietyContent: {
    padding: SPACING.cardPadding,
  },
  varietyTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  varietyTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primaryDark,
    flex: 1,
  },
  activePill: {
    backgroundColor: COLORS.successLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  activePillText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.success,
  },
  varietyDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
  stageTabsScroll: {
    gap: 8,
    paddingVertical: SPACING.md,
  },
  stageTab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  stageTabActive: {
    backgroundColor: COLORS.primaryDark,
    borderColor: COLORS.primaryDark,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 6,
  },
  dotCompleted: { backgroundColor: COLORS.success },
  dotActive: { backgroundColor: '#F59E0B' },
  dotUpcoming: { backgroundColor: '#94A3B8' },
  stageTabText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  stageTabTextActive: {
    color: COLORS.white,
    fontWeight: '700',
  },
  stageCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.cardPadding,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...SHADOWS.sm,
    marginBottom: SPACING.md,
  },
  stageCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 8,
    marginBottom: 8,
  },
  stageCardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  stageDays: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  stageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  badgeActive: { backgroundColor: '#FEF3C7' },
  badgeNormal: { backgroundColor: '#F1F5F9' },
  stageBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  stageSummary: {
    fontSize: 12.5,
    color: COLORS.textSecondary,
    marginBottom: 10,
    lineHeight: 17,
  },
  tipBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: RADIUS.md,
    padding: 10,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  tipTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMain,
    marginBottom: 3,
  },
  tipText: {
    fontSize: 11.5,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
  calcCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.cardPadding,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...SHADOWS.sm,
    marginBottom: SPACING.md,
  },
  calcTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  calcSubtitle: {
    fontSize: 11.5,
    color: COLORS.textMuted,
    marginTop: 2,
    marginBottom: 12,
  },
  calcInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  calcLabel: {
    fontSize: 12.5,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  calcInput: {
    width: 80,
    height: 40,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: RADIUS.md,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
  },
  calcResultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  calcResultBox: {
    width: '48%',
    backgroundColor: COLORS.cardSubtle,
    borderRadius: RADIUS.md,
    padding: 10,
  },
  calcResLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  calcResVal: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primaryDark,
    marginTop: 2,
  },
  calcResSub: {
    fontSize: 9.5,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  brixCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.cardPadding,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...SHADOWS.sm,
  },
  brixTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  brixDesc: {
    fontSize: 11.5,
    color: COLORS.textSecondary,
    marginTop: 3,
    marginBottom: 12,
    lineHeight: 16,
  },
  brixRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  brixLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    flex: 1,
  },
  brixInput: {
    width: 70,
    height: 38,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: RADIUS.md,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
  },
  brixStatusBanner: {
    padding: 10,
    borderRadius: RADIUS.md,
    marginTop: 4,
  },
  brixReady: {
    backgroundColor: COLORS.successLight,
  },
  brixNotReady: {
    backgroundColor: '#FEF3C7',
  },
  brixStatusText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: COLORS.textMain,
    lineHeight: 16,
  },
});
