import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../constants/theme';
import { useLanguage } from '../../i18n';
import { useApp } from '../../context/AppContext';

export const RegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useLanguage();
  const { quickDemoLogin } = useApp();

  const [name, setName] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [village, setVillage] = useState<string>('');
  const [district, setDistrict] = useState<string>('Pune');

  const handleRegister = () => {
    if (!name || !mobile) {
      Alert.alert('Required Fields', 'Please enter your name and mobile number');
      return;
    }
    quickDemoLogin();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>← {t('backToLogin')}</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{t('registerTitle')}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>{t('fullNameLabel')}</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Ramesh More"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>{t('mobileLabel')}</Text>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              placeholder="10-digit mobile"
              value={mobile}
              onChangeText={setMobile}
              maxLength={10}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>{t('villageLabel')}</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Malegaon Bk."
              value={village}
              onChangeText={setVillage}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>{t('districtLabel')}</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Pune"
              value={district}
              onChangeText={setDistrict}
            />
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleRegister}>
            <Text style={styles.submitBtnText}>{t('registerButton')} ➜</Text>
          </TouchableOpacity>
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
  },
  header: {
    marginBottom: SPACING.lg,
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
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primaryDark,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.cardPadding,
    ...SHADOWS.md,
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
  input: {
    height: 48,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: RADIUS.md,
    paddingHorizontal: 12,
    fontSize: 14,
    color: COLORS.textMain,
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  submitBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
});
