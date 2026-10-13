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
import { SplineChart } from '../../components/SplineChart';

export const ActivitiesScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useLanguage();
  const { activities, addActivity, isSynced, fields } = useApp();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedFieldId, setSelectedFieldId] = useState<string>(fields[0]?.id || 'field_1');
  const [activityType, setActivityType] = useState<string>('IRRIGATION');
  const [description, setDescription] = useState<string>('');
  const [cost, setCost] = useState<string>('500');

  const handleLogActivity = async () => {
    if (!description) {
      Alert.alert('Required', 'Please enter a description for the activity.');
      return;
    }

    const field = fields.find((f) => f.id === selectedFieldId) || fields[0];

    await addActivity({
      fieldId: field.id,
      fieldName: `${field.name} (${field.cropName})`,
      type: activityType,
      date: 'Today, 13 Oct 2026',
      description: description,
      operator: 'Rahul Patil',
      cost: parseFloat(cost) || 0,
    });

    setModalVisible(false);
    setDescription('');
    Alert.alert('Operation Logged', 'Activity saved and added to synchronization queue.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.headerTitleRow}>
            <View>
              <Text style={styles.title}>📋 {t('telemetryTitle')}</Text>
              <Text style={styles.subtitle}>Baramati Field Operations & Agro-Sensors</Text>
            </View>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.addBtnText}>+ Log Task</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Real-time Telemetry Dashboard Cards */}
        <View style={styles.telemetryGrid}>
          <View style={styles.telemetryBox}>
            <Text style={styles.telemetryLabel}>{t('plantHealth')}</Text>
            <Text style={styles.telemetryVal}>❤️ 95%</Text>
            <Text style={styles.telemetrySub}>Optimal vigor</Text>
          </View>
          <View style={styles.telemetryBox}>
            <Text style={styles.telemetryLabel}>{t('soilMoisture')}</Text>
            <Text style={styles.telemetryVal}>💧 72%</Text>
            <Text style={styles.telemetrySub}>Adequate root zone</Text>
          </View>
          <View style={styles.telemetryBox}>
            <Text style={styles.telemetryLabel}>{t('soilPh')}</Text>
            <Text style={styles.telemetryVal}>🧪 6.8</Text>
            <Text style={styles.telemetrySub}>Neutral black soil</Text>
          </View>
        </View>

        {/* 7-Day Soil Moisture Spline Trend Card */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>{t('growthChartTitle')}</Text>
            <View style={styles.syncBadge}>
              <View
                style={[
                  styles.syncDot,
                  { backgroundColor: isSynced ? COLORS.primaryLight : COLORS.amber },
                ]}
              />
              <Text style={styles.syncText}>
                {isSynced ? t('syncStatusOnline') : t('syncStatusOffline')}
              </Text>
            </View>
          </View>

          <SplineChart />
        </View>

        {/* Activity Timeline */}
        <Text style={styles.timelineTitle}>{t('recentActivitiesTitle')}</Text>

        <View style={styles.activityList}>
          {activities.map((act) => (
            <View key={act.id} style={styles.activityCard}>
              <View style={styles.actTopRow}>
                <View style={styles.actTypeBadge}>
                  <Text style={styles.actTypeText}>{act.type}</Text>
                </View>
                <Text style={styles.actDateText}>{act.date}</Text>
              </View>

              <Text style={styles.actFieldName}>{act.fieldName}</Text>
              <Text style={styles.actDesc}>{act.description}</Text>

              <View style={styles.actFooter}>
                <Text style={styles.actOperator}>👤 Operator: {act.operator}</Text>
                <Text style={styles.actCost}>₹{act.cost}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Modal for Logging Farm Operation */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{t('logActivityBtn')}</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalClose}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Select Plot / प्लॉट निवडा</Text>
                  <View style={styles.plotPickerRow}>
                    {fields.map((f) => (
                      <TouchableOpacity
                        key={f.id}
                        style={[
                          styles.plotPickBtn,
                          selectedFieldId === f.id && styles.plotPickBtnActive,
                        ]}
                        onPress={() => setSelectedFieldId(f.id)}
                      >
                        <Text
                          style={[
                            styles.plotPickText,
                            selectedFieldId === f.id && styles.plotPickTextActive,
                          ]}
                        >
                          {f.cropName}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Activity Type / कामाचा प्रकार</Text>
                  <View style={styles.plotPickerRow}>
                    {['IRRIGATION', 'FERTILIZATION', 'PEST_CONTROL', 'WEEDING'].map((type) => (
                      <TouchableOpacity
                        key={type}
                        style={[
                          styles.plotPickBtn,
                          activityType === type && styles.plotPickBtnActive,
                        ]}
                        onPress={() => setActivityType(type)}
                      >
                        <Text
                          style={[
                            styles.plotPickText,
                            activityType === type && styles.plotPickTextActive,
                          ]}
                        >
                          {type}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Operation Details / तपशील</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="e.g. Applied 25kg urea via drip"
                    value={description}
                    onChangeText={setDescription}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Estimated Cost (₹) / खर्च</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="e.g. 1200"
                    keyboardType="numeric"
                    value={cost}
                    onChangeText={setCost}
                  />
                </View>

                <TouchableOpacity style={styles.submitModalBtn} onPress={handleLogActivity}>
                  <Text style={styles.submitModalBtnText}>Log Operation & Sync ➜</Text>
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
  headerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 19,
    fontWeight: '800',
    color: COLORS.primaryDark,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  addBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
  },
  addBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  telemetryGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: SPACING.md,
  },
  telemetryBox: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  telemetryLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    fontWeight: '600',
    textAlign: 'center',
  },
  telemetryVal: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primaryDark,
    marginTop: 4,
  },
  telemetrySub: {
    fontSize: 9.5,
    color: COLORS.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
  chartCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.cardPadding,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...SHADOWS.sm,
    marginBottom: SPACING.md,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  chartTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textMain,
    flex: 1,
  },
  syncBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  syncDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 5,
  },
  syncText: {
    fontSize: 10,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  timelineTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 10,
  },
  activityList: {
    gap: SPACING.sm,
  },
  activityCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...SHADOWS.sm,
  },
  actTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  actTypeBadge: {
    backgroundColor: COLORS.primaryTint,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  actTypeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primaryDark,
  },
  actDateText: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  actFieldName: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 2,
  },
  actDesc: {
    fontSize: 11.5,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
  actFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
  },
  actOperator: {
    fontSize: 10.5,
    color: COLORS.textMuted,
  },
  actCost: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primaryDark,
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
  plotPickerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  plotPickBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  plotPickBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primaryDark,
  },
  plotPickText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  plotPickTextActive: {
    color: COLORS.white,
    fontWeight: '700',
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
