import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../constants/theme';
import { useLanguage } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { Field, CropStatus } from '../../types';

export const MyFarmScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useLanguage();
  const { farmer, fields, addField, setSelectedField } = useApp();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [fieldName, setFieldName] = useState<string>('');
  const [cropName, setCropName] = useState<string>('Gram / हरभरा');
  const [area, setArea] = useState<string>('2.5');
  const [variety, setVariety] = useState<string>('Digvijay');
  const [soilType, setSoilType] = useState<string>('Medium Black Soil');

  const handleAddField = () => {
    if (!fieldName || !area) {
      Alert.alert('Required Fields', 'Please enter field name and area in acres.');
      return;
    }

    addField({
      farmId: 'farm_1',
      name: fieldName,
      area: parseFloat(area) || 2.0,
      areaUnit: 'Acres',
      cropName: cropName,
      variety: variety,
      season: 'Rabi',
      sowingDate: '10 Oct 2026',
      expectedHarvestDate: '15 Feb 2027',
      status: 'GROWING' as CropStatus,
      soilMoisture: 70,
      soilType: soilType,
      irrigation: 'Drip Irrigation',
      notes: 'New plot registered by farmer.',
      color: '#3B82F6',
    });

    setModalVisible(false);
    setFieldName('');
    Alert.alert('Success', 'New field plot added successfully!');
  };

  const getStatusColor = (status: CropStatus) => {
    switch (status) {
      case 'READY_FOR_HARVEST':
        return { bg: '#FEF3C7', text: '#B45309' };
      case 'GROWING':
        return { bg: '#DCFCE7', text: '#15803D' };
      default:
        return { bg: '#E0F2FE', text: '#0369A1' };
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Top Action Bar */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>{t('myFarmTitle')}</Text>
            <Text style={styles.subtitle}>
              {farmer.village}, {farmer.district} • {farmer.totalArea} {farmer.areaUnit}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addFieldBtn}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addFieldBtnText}>{t('addFieldBtn')}</Text>
          </TouchableOpacity>
        </View>

        {/* GIS Interactive Map Shortcut Card */}
        <TouchableOpacity
          style={styles.gisBanner}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('GisMap')}
        >
          <View style={styles.gisBannerTextContainer}>
            <Text style={styles.gisBannerBadge}>🗺️ {t('moduleGisMap')}</Text>
            <Text style={styles.gisBannerTitle}>Interactive GIS Boundary Canvas</Text>
            <Text style={styles.gisBannerDesc}>
              Tap to inspect GPS polygon coordinates, boundaries, and soil telemetry
            </Text>
          </View>
          <View style={styles.gisBannerArrow}>
            <Text style={styles.arrowText}>➔</Text>
          </View>
        </TouchableOpacity>

        {/* Fields List */}
        <Text style={styles.sectionTitle}>{t('fieldListTitle')}</Text>

        <View style={styles.fieldsList}>
          {fields.map((field) => {
            const statusStyle = getStatusColor(field.status);
            return (
              <TouchableOpacity
                key={field.id}
                style={styles.fieldCard}
                activeOpacity={0.9}
                onPress={() => {
                  setSelectedField(field);
                  navigation.navigate('FieldDetail');
                }}
              >
                {/* Field Header */}
                <View style={styles.fieldCardTop}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.fieldName}>{field.name}</Text>
                    <Text style={styles.fieldVariety}>
                      {field.cropName} • {field.variety}
                    </Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                    <Text style={[styles.statusText, { color: statusStyle.text }]}>
                      {field.status === 'READY_FOR_HARVEST'
                        ? t('statusHarvestReady')
                        : t('statusGrowing')}
                    </Text>
                  </View>
                </View>

                {/* Key Metrics Row */}
                <View style={styles.fieldMetricsRow}>
                  <View style={styles.metricCol}>
                    <Text style={styles.metricLabel}>{t('totalAcres')}</Text>
                    <Text style={styles.metricValue}>
                      {field.area} {field.areaUnit}
                    </Text>
                  </View>
                  <View style={styles.metricDivider} />
                  <View style={styles.metricCol}>
                    <Text style={styles.metricLabel}>{t('cropHealthIndex')}</Text>
                    <Text style={[styles.metricValue, { color: COLORS.primaryDark }]}>
                      ❤️ {field.healthScore}%
                    </Text>
                  </View>
                  <View style={styles.metricDivider} />
                  <View style={styles.metricCol}>
                    <Text style={styles.metricLabel}>{t('soilMoistureLabel')}</Text>
                    <Text style={styles.metricValue}>💧 {field.soilMoisture}%</Text>
                  </View>
                </View>

                {/* Action Footer */}
                <View style={styles.fieldFooter}>
                  <Text style={styles.soilTypeText}>🌱 {field.soilType}</Text>
                  <Text style={styles.inspectText}>{t('inspectPlot')} ➜</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Add Field Modal Form */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{t('addFieldBtn')}</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalClose}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Plot Name / प्लॉटचे नाव</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="e.g. Field 4 — South Well Block"
                    value={fieldName}
                    onChangeText={setFieldName}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Crop / पीक</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="e.g. Soybean / Harbhara / Cotton"
                    value={cropName}
                    onChangeText={setCropName}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Area (Acres) / क्षेत्र (एकर)</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="e.g. 3.0"
                    keyboardType="numeric"
                    value={area}
                    onChangeText={setArea}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Variety / वाण</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="e.g. JS-335"
                    value={variety}
                    onChangeText={setVariety}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Soil Type / मातीचा प्रकार</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="e.g. Deep Black Cotton Soil"
                    value={soilType}
                    onChangeText={setSoilType}
                  />
                </View>

                <TouchableOpacity style={styles.submitModalBtn} onPress={handleAddField}>
                  <Text style={styles.submitModalBtnText}>Save Plot to Farm ➜</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
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
  addFieldBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    ...SHADOWS.sm,
  },
  addFieldBtnText: {
    color: COLORS.white,
    fontSize: 12.5,
    fontWeight: '700',
  },
  gisBanner: {
    backgroundColor: '#1E293B',
    borderRadius: RADIUS.lg,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: '#334155',
    ...SHADOWS.md,
  },
  gisBannerTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  gisBannerBadge: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 4,
  },
  gisBannerTitle: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },
  gisBannerDesc: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 3,
    lineHeight: 15,
  },
  gisBannerArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: SPACING.sm,
  },
  fieldsList: {
    gap: SPACING.md,
  },
  fieldCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.cardPadding,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...SHADOWS.sm,
  },
  fieldCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  fieldName: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  fieldVariety: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  statusText: {
    fontSize: 10.5,
    fontWeight: '700',
  },
  fieldMetricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.cardSubtle,
    borderRadius: RADIUS.md,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  metricCol: {
    flex: 1,
    alignItems: 'center',
  },
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
  },
  metricLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 12.5,
    fontWeight: '800',
    color: COLORS.textMain,
    marginTop: 2,
  },
  fieldFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  soilTypeText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  inspectText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    padding: SPACING.lg,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  modalClose: {
    fontSize: 18,
    color: COLORS.textMuted,
    fontWeight: 'bold',
    padding: 4,
  },
  formGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  modalInput: {
    height: 46,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: RADIUS.md,
    paddingHorizontal: 12,
    fontSize: 14,
    color: COLORS.textMain,
  },
  submitModalBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  submitModalBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
});
