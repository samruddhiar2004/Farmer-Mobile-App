import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../constants/theme';
import { useLanguage } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { SupportedLanguage } from '../../types';

export const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { language, setLanguage, t } = useLanguage();
  const { farmer, logout, isSynced } = useApp();

  const handleCallHelpline = () => {
    Linking.openURL('tel:18001801551').catch(() => {
      Alert.alert('Kisan Call Center', 'Toll-Free Helpline: 1800-180-1551');
    });
  };

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: () => logout() },
    ]);
  };

  const languages = [
    { code: 'en' as SupportedLanguage, label: 'English', native: 'English' },
    { code: 'hi' as SupportedLanguage, label: 'Hindi', native: 'हिंदी' },
    { code: 'mr' as SupportedLanguage, label: 'Marathi', native: 'मराठी' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Hero */}
        <View style={styles.profileHero}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarEmoji}>👨‍🌾</Text>
          </View>
          <Text style={styles.farmerName}>{farmer.name}</Text>
          <Text style={styles.farmerId}>Farmer Code: {farmer.code}</Text>
          <Text style={styles.farmerLocation}>
            {farmer.village}, {farmer.taluka}, {farmer.district}, {farmer.state}
          </Text>
        </View>

        {/* Farmer Information Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('profileTitle')}</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('mobileLabel')}</Text>
            <Text style={styles.infoVal}>+91 {farmer.mobile}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('kccNumber')}</Text>
            <Text style={styles.infoVal}>{farmer.kisanCreditCardNo}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('totalAcres')}</Text>
            <Text style={styles.infoVal}>
              {farmer.totalArea} {farmer.areaUnit}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('soilType')}</Text>
            <Text style={styles.infoVal}>{farmer.soilType}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Farming Experience</Text>
            <Text style={styles.infoVal}>{farmer.experienceYears} Years</Text>
          </View>
        </View>

        {/* Trilingual Language Preferences */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🌐 {t('selectLanguage')}</Text>
          <View style={styles.langList}>
            {languages.map((item) => (
              <TouchableOpacity
                key={item.code}
                style={[
                  styles.langOption,
                  language === item.code && styles.langOptionSelected,
                ]}
                onPress={() => setLanguage(item.code)}
              >
                <View>
                  <Text style={styles.langLabel}>{item.label}</Text>
                  <Text style={styles.langNative}>{item.native}</Text>
                </View>
                <View
                  style={[
                    styles.radioCircle,
                    language === item.code && styles.radioCircleActive,
                  ]}
                >
                  {language === item.code && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Cloud Sync & Server Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>☁️ Cloud Synchronization</Text>
          <View style={styles.syncRow}>
            <View
              style={[
                styles.syncDot,
                { backgroundColor: isSynced ? COLORS.primaryLight : COLORS.amber },
              ]}
            />
            <Text style={styles.syncStatusText}>
              {isSynced ? t('syncStatusOnline') : t('syncStatusOffline')}
            </Text>
          </View>
          <Text style={styles.syncSubtext}>
            Backend: Ktor REST Server (JVM Port 8080) • Offline-First local storage active.
          </Text>
        </View>

        {/* Kisan Call Center Helpline */}
        <TouchableOpacity style={styles.helplineCard} onPress={handleCallHelpline}>
          <Text style={styles.helplineIcon}>📞</Text>
          <View style={styles.helplineContent}>
            <Text style={styles.helplineTitle}>Kisan Call Center (Toll-Free)</Text>
            <Text style={styles.helplinePhone}>1800-180-1551</Text>
            <Text style={styles.helplineSub}>Free 24x7 agronomic guidance in Marathi & Hindi</Text>
          </View>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>🚪 {t('logoutBtn')}</Text>
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
    paddingBottom: SPACING.xxl * 2,
  },
  profileHero: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: RADIUS.xl,
    padding: 20,
    alignItems: 'center',
    marginBottom: SPACING.md,
    ...SHADOWS.md,
  },
  avatarCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#BBF7D0',
    marginBottom: 8,
  },
  avatarEmoji: {
    fontSize: 34,
  },
  farmerName: {
    fontSize: 19,
    fontWeight: '800',
    color: COLORS.white,
  },
  farmerId: {
    fontSize: 11.5,
    color: '#BBF7D0',
    fontWeight: '600',
    marginTop: 2,
  },
  farmerLocation: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
    textAlign: 'center',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.cardPadding,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 6,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  infoLabel: {
    fontSize: 12.5,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  infoVal: {
    fontSize: 12.5,
    color: COLORS.textMain,
    fontWeight: '700',
  },
  langList: {
    gap: 8,
  },
  langOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: RADIUS.md,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  langOptionSelected: {
    backgroundColor: '#F0FDF4',
    borderColor: COLORS.primaryLight,
  },
  langLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  langNative: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  syncRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  syncDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  syncStatusText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  syncSubtext: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  helplineCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: RADIUS.lg,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F59E0B',
    marginBottom: SPACING.md,
  },
  helplineIcon: {
    fontSize: 26,
    marginRight: 12,
  },
  helplineContent: {
    flex: 1,
  },
  helplineTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#92400E',
  },
  helplinePhone: {
    fontSize: 15,
    fontWeight: '800',
    color: '#78350F',
    marginVertical: 2,
  },
  helplineSub: {
    fontSize: 10.5,
    color: '#92400E',
  },
  logoutBtn: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  logoutText: {
    color: '#B91C1C',
    fontSize: 14,
    fontWeight: '700',
  },
});
