import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../../constants/theme';
import { useLanguage } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { SupportedLanguage } from '../../types';

export const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { language, setLanguage, t } = useLanguage();
  const { login, quickDemoLogin } = useApp();

  const [mobile, setMobile] = useState<string>('9822012345');
  const [password, setPassword] = useState<string>('farmer123');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = () => {
    if (!mobile || mobile.length < 10) {
      Alert.alert('Validation Error', t('validationMobile') || 'Enter valid 10-digit mobile');
      return;
    }
    const success = login(mobile, password);
    if (!success) {
      Alert.alert('Login Failed', 'Please check your mobile or password.');
    }
  };

  const handleQuickDemo = () => {
    quickDemoLogin();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header Graphic & Emblem */}
          <View style={styles.headerHero}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoEmoji}>🌾</Text>
            </View>
            <Text style={styles.appTitle}>{t('appName')}</Text>
            <Text style={styles.tagline}>{t('appTagline')}</Text>

            {/* Trilingual Pill Selector */}
            <View style={styles.langPillContainer}>
              {(['en', 'hi', 'mr'] as SupportedLanguage[]).map((lang) => (
                <TouchableOpacity
                  key={lang}
                  style={[
                    styles.langPill,
                    language === lang && styles.langPillActive,
                  ]}
                  onPress={() => setLanguage(lang)}
                >
                  <Text
                    style={[
                      styles.langText,
                      language === lang && styles.langTextActive,
                    ]}
                  >
                    {lang === 'en' ? 'English' : lang === 'hi' ? 'हिंदी' : 'मराठी'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Login Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{t('loginTitle')}</Text>
            <Text style={styles.cardSubtitle}>{t('loginSubtitle')}</Text>

            {/* Mobile Number Input */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>{t('mobileLabel')}</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.prefix}>+91</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="phone-pad"
                  placeholder={t('mobilePlaceholder')}
                  value={mobile}
                  onChangeText={setMobile}
                  maxLength={10}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.formGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>{t('passwordLabel')}</Text>
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Text style={styles.toggleText}>
                    {showPassword ? t('hidePassword') : t('showPassword')}
                  </Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.simpleInput}
                secureTextEntry={!showPassword}
                placeholder={t('passwordPlaceholder')}
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
              <Text style={styles.loginBtnText}>{t('loginButton')} ➜</Text>
            </TouchableOpacity>

            {/* Quick Demo Button */}
            <TouchableOpacity style={styles.demoBtn} onPress={handleQuickDemo}>
              <Text style={styles.demoBtnText}>{t('quickDemoButton')}</Text>
            </TouchableOpacity>

            {/* Register Link */}
            <View style={styles.footerRow}>
              <Text style={styles.footerText}>{t('dontHaveAccount')} </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerLink}>{t('registerLink')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  headerHero: {
    backgroundColor: COLORS.primaryDark,
    paddingTop: SPACING.xl * 1.5,
    paddingBottom: SPACING.xl * 1.8,
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  logoBadge: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    marginBottom: 10,
  },
  logoEmoji: {
    fontSize: 36,
  },
  appTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 13,
    color: '#BBF7D0',
    marginTop: 4,
    fontWeight: '500',
  },
  langPillContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.28)',
    borderRadius: RADIUS.full,
    padding: 4,
    marginTop: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
  },
  langPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
  },
  langPillActive: {
    backgroundColor: COLORS.white,
  },
  langText: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
    fontWeight: '700',
  },
  langTextActive: {
    color: COLORS.primaryDark,
  },
  card: {
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.lg,
    marginTop: -SPACING.xl,
    borderRadius: RADIUS.xl,
    padding: SPACING.cardPadding * 1.2,
    ...SHADOWS.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  cardSubtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 3,
    marginBottom: SPACING.lg,
  },
  formGroup: {
    marginBottom: SPACING.md,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: RADIUS.md,
    paddingHorizontal: 12,
  },
  prefix: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textMuted,
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 15,
    color: COLORS.textMain,
    fontWeight: '600',
  },
  simpleInput: {
    height: 48,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: RADIUS.md,
    paddingHorizontal: 12,
    fontSize: 15,
    color: COLORS.textMain,
  },
  loginBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: SPACING.sm,
    ...SHADOWS.md,
  },
  loginBtnText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
  demoBtn: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1.5,
    borderColor: '#F59E0B',
    borderRadius: RADIUS.md,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  demoBtnText: {
    color: '#92400E',
    fontSize: 13,
    fontWeight: '800',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  footerText: {
    fontSize: 12.5,
    color: COLORS.textMuted,
  },
  registerLink: {
    fontSize: 12.5,
    color: COLORS.primary,
    fontWeight: '800',
  },
});
