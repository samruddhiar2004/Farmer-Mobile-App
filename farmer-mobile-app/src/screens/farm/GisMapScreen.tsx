import React, { useState } from 'react';
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
import { FieldPolygonMap } from '../../components/FieldPolygonMap';
import { Field } from '../../types';

export const GisMapScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useLanguage();
  const { fields, farmer } = useApp();

  const [activePlotId, setActivePlotId] = useState<string>(fields[1]?.id || 'field_2');

  const activeField = fields.find((f) => f.id === activePlotId) || fields[0];

  // 1 Acre = 40 Gunthas
  const gunthas = activeField ? (activeField.area * 40).toFixed(0) : '0';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>🗺️ {t('moduleGisMap')}</Text>
          <Text style={styles.subtitle}>
            {farmer.name}'s Farm • GPS Polygon Boundary Telemetry
          </Text>
        </View>

        {/* Plot Selector Chips */}
        <View style={styles.chipRow}>
          {fields.map((f) => (
            <TouchableOpacity
              key={f.id}
              style={[
                styles.chip,
                activePlotId === f.id && styles.chipActive,
              ]}
              onPress={() => setActivePlotId(f.id)}
            >
              <View style={[styles.chipColorDot, { backgroundColor: f.color }]} />
              <Text
                style={[
                  styles.chipText,
                  activePlotId === f.id && styles.chipTextActive,
                ]}
              >
                {f.cropName} ({f.area} Ac)
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Interactive GIS SVG Canvas */}
        <FieldPolygonMap
          fields={fields}
          selectedFieldId={activePlotId}
          onSelectField={(f: Field) => setActivePlotId(f.id)}
          height={260}
        />

        {/* Active Plot Inspector Card */}
        {activeField && (
          <View style={styles.inspectorCard}>
            <View style={styles.inspectorHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.plotName}>{activeField.name}</Text>
                <Text style={styles.plotVariety}>
                  {activeField.cropName} • {activeField.variety} ({activeField.season})
                </Text>
              </View>
              <View style={styles.areaBadge}>
                <Text style={styles.areaVal}>{activeField.area} Acres</Text>
                <Text style={styles.gunthaVal}>({gunthas} Gunthas)</Text>
              </View>
            </View>

            {/* Quick Metrics */}
            <View style={styles.metricsGrid}>
              <View style={styles.metricBox}>
                <Text style={styles.metricLabel}>{t('cropHealthIndex')}</Text>
                <Text style={styles.metricBig}>❤️ {activeField.healthScore}%</Text>
              </View>
              <View style={styles.metricBox}>
                <Text style={styles.metricLabel}>{t('soilMoisture')}</Text>
                <Text style={styles.metricBig}>💧 {activeField.soilMoisture}%</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoKey}>🏔️ {t('soilType')}:</Text>
              <Text style={styles.infoVal}>{activeField.soilType}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoKey}>💧 Irrigation:</Text>
              <Text style={styles.infoVal}>{activeField.irrigation}</Text>
            </View>

            {/* Boundary Vertices */}
            <Text style={styles.verticesTitle}>🛰️ GPS Boundary Vertices (WGS-84):</Text>
            <View style={styles.verticesBox}>
              {activeField.polygon.map((pt, idx) => (
                <View key={idx} style={styles.vertexLine}>
                  <Text style={styles.vIndex}>V{idx + 1}:</Text>
                  <Text style={styles.vCoord}>
                    {pt.lat.toFixed(5)}° N, {pt.lng.toFixed(5)}° E
                  </Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={styles.detailBtn}
              onPress={() => navigation.navigate('FieldDetail')}
            >
              <Text style={styles.detailBtnText}>Inspect Complete Agronomy Profile ➜</Text>
            </TouchableOpacity>
          </View>
        )}
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
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: SPACING.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipActive: {
    backgroundColor: COLORS.primaryDark,
    borderColor: COLORS.primaryDark,
  },
  chipColorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  chipText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  chipTextActive: {
    color: COLORS.white,
    fontWeight: '700',
  },
  inspectorCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.cardPadding,
    marginTop: SPACING.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...SHADOWS.md,
  },
  inspectorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 10,
  },
  plotName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  plotVariety: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  areaBadge: {
    alignItems: 'flex-end',
  },
  areaVal: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primaryDark,
  },
  gunthaVal: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  metricBox: {
    flex: 1,
    backgroundColor: COLORS.cardSubtle,
    borderRadius: RADIUS.md,
    padding: 10,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  metricBig: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textMain,
    marginTop: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  infoKey: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  infoVal: {
    fontSize: 12,
    color: COLORS.textMain,
    fontWeight: '700',
  },
  verticesTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMain,
    marginTop: 10,
    marginBottom: 6,
  },
  verticesBox: {
    backgroundColor: '#0F172A',
    borderRadius: RADIUS.md,
    padding: 10,
  },
  vertexLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  vIndex: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '700',
  },
  vCoord: {
    color: '#E2E8F0',
    fontSize: 11,
    fontFamily: 'monospace',
  },
  detailBtn: {
    backgroundColor: COLORS.primarySubtle,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: RADIUS.md,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 14,
  },
  detailBtnText: {
    color: COLORS.primaryDark,
    fontSize: 12.5,
    fontWeight: '700',
  },
});
