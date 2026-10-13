import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useLanguage } from '../i18n';
import { useApp } from '../context/AppContext';
import { SupportedLanguage } from '../types';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showLanguageSwitcher?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showLanguageSwitcher = true,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { farmer, isSynced } = useApp();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('greetingMorning');
    if (hour < 17) return t('greetingAfternoon');
    return t('greetingEvening');
  };

  const defaultTitle = `${getGreeting()}, ${farmer.name}! 🙏`;
  const defaultSubtitle = `📍 ${farmer.village}, ${farmer.taluka}, ${farmer.district}`;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title || defaultTitle}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle || defaultSubtitle}
          </Text>
        </View>

        {showLanguageSwitcher && (
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
                  {lang === 'en' ? 'EN' : lang === 'hi' ? 'हिं' : 'मरा'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.syncRow}>
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
        <Text style={styles.kccText}>KCC: {farmer.kisanCreditCardNo}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
    borderBottomLeftRadius: RADIUS.xl,
    borderBottomRightRadius: RADIUS.xl,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  title: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  subtitle: {
    color: '#BBF7D0',
    fontSize: 12,
    marginTop: 2,
    fontWeight: '500',
  },
  langPillContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: RADIUS.full,
    padding: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  langPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  langPillActive: {
    backgroundColor: COLORS.white,
  },
  langText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
    fontWeight: '700',
  },
  langTextActive: {
    color: COLORS.primaryDark,
  },
  syncRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.md,
    paddingTop: SPACING.xs,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  syncBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  syncDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 6,
  },
  syncText: {
    color: '#D1FAE5',
    fontSize: 11,
    fontWeight: '500',
  },
  kccText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10.5,
    fontWeight: '500',
  },
});
