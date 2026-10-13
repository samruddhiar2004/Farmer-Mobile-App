import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { useLanguage } from '../i18n';
import { pestDatabase } from '../api/mockData';

export const PestScannerView: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState<string>('sugarcane');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scannedResultKey, setScannedResultKey] = useState<string>('sugarcane');

  const crops = [
    { key: 'sugarcane', label: '🎋 Sugarcane / ऊस', emoji: '🎋' },
    { key: 'tomato', label: '🍅 Tomato / टोमॅटो', emoji: '🍅' },
    { key: 'wheat', label: '🌾 Wheat / गहू', emoji: '🌾' },
    { key: 'onion', label: '🧅 Onion / कांदा', emoji: '🧅' },
  ];

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setScannedResultKey(selectedCrop);
      setIsScanning(false);
    }, 1500);
  };

  const diagnosis = pestDatabase[scannedResultKey] || pestDatabase.sugarcane;

  return (
    <View style={styles.container}>
      {/* Crop Selector Tabs */}
      <Text style={styles.sectionLabel}>{t('selectCrop')}</Text>
      <View style={styles.cropTabRow}>
        {crops.map((c) => (
          <TouchableOpacity
            key={c.key}
            style={[
              styles.cropTab,
              selectedCrop === c.key && styles.cropTabActive,
            ]}
            onPress={() => setSelectedCrop(c.key)}
          >
            <Text
              style={[
                styles.cropTabText,
                selectedCrop === c.key && styles.cropTabTextActive,
              ]}
            >
              {c.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Simulated Camera Viewfinder */}
      <View style={styles.viewfinder}>
        <View style={styles.leafDisplay}>
          <Text style={styles.leafEmoji}>
            {selectedCrop === 'sugarcane' ? '🎋' : selectedCrop === 'tomato' ? '🍅' : selectedCrop === 'wheat' ? '🌾' : '🧅'}
          </Text>
          <Text style={styles.leafStatusText}>
            {selectedCrop.toUpperCase()} LEAF SAMPLE READY FOR ANALYSIS
          </Text>
        </View>

        {/* Viewfinder Target Reticle Corners */}
        <View style={[styles.corner, styles.cornerTL]} />
        <View style={[styles.corner, styles.cornerTR]} />
        <View style={[styles.corner, styles.cornerBL]} />
        <View style={[styles.corner, styles.cornerBR]} />

        {/* Laser Scanning Animation Overlay */}
        {isScanning && (
          <View style={styles.laserContainer}>
            <View style={styles.laserLine} />
            <View style={styles.scanningBadge}>
              <ActivityIndicator color="#FFFFFF" size="small" />
              <Text style={styles.scanningText}>{t('scanningWait')}</Text>
            </View>
          </View>
        )}
      </View>

      {/* Scan Button */}
      <TouchableOpacity
        style={[styles.scanBtn, isScanning && styles.scanBtnDisabled]}
        onPress={handleScan}
        disabled={isScanning}
      >
        <Text style={styles.scanBtnText}>
          {isScanning ? '🔍 ' + t('scanningWait') : '📸 ' + t('scanLeafBtn')}
        </Text>
      </TouchableOpacity>

      {/* Diagnosis Report Card */}
      <View style={styles.resultCard}>
        <View style={styles.resultHeader}>
          <View style={styles.diseaseInfo}>
            <Text style={styles.diseaseName}>{diagnosis.name}</Text>
            <Text style={styles.scientificName}>({diagnosis.scientificName})</Text>
          </View>
          <View style={styles.badgeGroup}>
            <View style={styles.confidenceBadge}>
              <Text style={styles.confidenceText}>{diagnosis.confidence}% Match</Text>
            </View>
            <View
              style={[
                styles.severityBadge,
                diagnosis.severity === 'High' ? styles.severityHigh : styles.severityMod,
              ]}
            >
              <Text style={styles.severityText}>{diagnosis.severity}</Text>
            </View>
          </View>
        </View>

        {/* Symptoms */}
        <View style={styles.remedyBlock}>
          <Text style={styles.remedyTitle}>🔍 {t('symptoms')}:</Text>
          {diagnosis.symptoms.map((s, idx) => (
            <Text key={idx} style={styles.symptomBullet}>
              • {s}
            </Text>
          ))}
        </View>

        {/* Organic Remedy */}
        <View style={[styles.remedyBlock, styles.organicBlock]}>
          <Text style={[styles.remedyTitle, { color: COLORS.primaryDark }]}>
            {t('organicRemedy')}
          </Text>
          <Text style={styles.remedyText}>{diagnosis.organicRemedy}</Text>
        </View>

        {/* Chemical Treatment */}
        <View style={[styles.remedyBlock, styles.chemicalBlock]}>
          <Text style={[styles.remedyTitle, { color: '#0369A1' }]}>
            {t('chemicalRemedy')}
          </Text>
          <Text style={styles.remedyText}>{diagnosis.chemicalTreatment}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.xs,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMuted,
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
  },
  cropTabRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: SPACING.md,
  },
  cropTab: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cropTabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primaryDark,
  },
  cropTabText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  cropTabTextActive: {
    color: COLORS.white,
    fontWeight: '700',
  },
  viewfinder: {
    height: 190,
    backgroundColor: '#0F172A',
    borderRadius: RADIUS.lg,
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#334155',
  },
  leafDisplay: {
    alignItems: 'center',
  },
  leafEmoji: {
    fontSize: 54,
    marginBottom: 6,
  },
  leafStatusText: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  corner: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderColor: COLORS.primaryLight,
  },
  cornerTL: { top: 12, left: 12, borderTopWidth: 3, borderLeftWidth: 3 },
  cornerTR: { top: 12, right: 12, borderTopWidth: 3, borderRightWidth: 3 },
  cornerBL: { bottom: 12, left: 12, borderBottomWidth: 3, borderLeftWidth: 3 },
  cornerBR: { bottom: 12, right: 12, borderBottomWidth: 3, borderRightWidth: 3 },
  laserContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  laserLine: {
    width: '100%',
    height: 3,
    backgroundColor: '#22C55E',
    shadowColor: '#22C55E',
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 8,
  },
  scanningBadge: {
    position: 'absolute',
    bottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
  },
  scanningText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 8,
  },
  scanBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: SPACING.md,
    ...SHADOWS.md,
  },
  scanBtnDisabled: {
    backgroundColor: COLORS.textMuted,
  },
  scanBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  resultCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.cardPadding,
    marginTop: SPACING.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...SHADOWS.sm,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 10,
    marginBottom: 10,
  },
  diseaseInfo: {
    flex: 1,
    marginRight: 8,
  },
  diseaseName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  scientificName: {
    fontSize: 11.5,
    fontStyle: 'italic',
    color: COLORS.textMuted,
    marginTop: 2,
  },
  badgeGroup: {
    alignItems: 'flex-end',
    gap: 4,
  },
  confidenceBadge: {
    backgroundColor: COLORS.primaryTint,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  confidenceText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  severityHigh: {
    backgroundColor: '#FEE2E2',
  },
  severityMod: {
    backgroundColor: '#FEF3C7',
  },
  severityText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  remedyBlock: {
    marginTop: 8,
  },
  remedyTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMain,
    marginBottom: 3,
  },
  symptomBullet: {
    fontSize: 11.5,
    color: COLORS.textSecondary,
    lineHeight: 16,
    marginLeft: 4,
  },
  organicBlock: {
    backgroundColor: '#F0FDF4',
    padding: 10,
    borderRadius: RADIUS.md,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primaryLight,
  },
  chemicalBlock: {
    backgroundColor: '#F0F9FF',
    padding: 10,
    borderRadius: RADIUS.md,
    borderLeftWidth: 3,
    borderLeftColor: '#0284C7',
  },
  remedyText: {
    fontSize: 11.5,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
});
