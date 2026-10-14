import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  useWindowDimensions,
  Text,
} from 'react-native';
import { COLORS } from '../constants/theme';

interface PhoneChassisProps {
  children: React.ReactNode;
}

export const PhoneChassis: React.FC<PhoneChassisProps> = ({ children }) => {
  const { width } = useWindowDimensions();

  // If running on actual native device or if the browser viewport is narrow (e.g. mobile browser)
  if (Platform.OS !== 'web' || width <= 480) {
    return <View style={styles.fullscreen}>{children}</View>;
  }

  // Desktop Web Preview: Wrap in a sleek flagship smartphone device frame
  return (
    <View style={styles.desktopBackdrop}>
      {/* Ambient Top Control Strip */}
      <View style={styles.topControlStrip}>
        <View style={styles.pillBadge}>
          <Text style={styles.pillBadgeEmoji}>🌾</Text>
          <Text style={styles.pillBadgeTitle}>KisanSaathi</Text>
          <Text style={styles.pillBadgeSub}>• Live Mobile App Preview</Text>
        </View>
        <Text style={styles.desktopTipText}>
          📱 Interactive Smartphone Simulation • Trilingual (EN / HI / MR)
        </Text>
      </View>

      {/* Flagship Phone Bezel Frame */}
      <View style={styles.phoneFrame}>
        {/* Dynamic Island / Speaker Notch */}
        <View style={styles.dynamicIslandContainer}>
          <View style={styles.dynamicIsland}>
            <View style={styles.cameraLens} />
            <View style={styles.sensorDot} />
          </View>
        </View>

        {/* Display Screen */}
        <View style={styles.screenInner}>{children}</View>

        {/* Home Swipe Indicator Bar */}
        <View style={styles.homeBarContainer}>
          <View style={styles.homeBar} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  desktopBackdrop: {
    flex: 1,
    minHeight: '100%' as any,
    backgroundColor: '#07160B',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 12,
  },
  topControlStrip: {
    alignItems: 'center',
    marginBottom: 14,
  },
  pillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.3)',
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 6,
  },
  pillBadgeEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  pillBadgeTitle: {
    color: '#86EFAC',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  pillBadgeSub: {
    color: '#BBF7D0',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  desktopTipText: {
    color: '#6EE7B7',
    fontSize: 11,
    fontWeight: '500',
    opacity: 0.8,
  },
  phoneFrame: {
    width: 416,
    height: 850,
    maxHeight: '94%' as any,
    backgroundColor: '#0F172A',
    borderRadius: 48,
    borderWidth: 11,
    borderColor: '#1E293B',
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 28 },
    shadowOpacity: 0.65,
    shadowRadius: 36,
    elevation: 28,
  },
  dynamicIslandContainer: {
    position: 'absolute',
    top: 6,
    left: 0,
    right: 0,
    zIndex: 999,
    alignItems: 'center',
  },
  dynamicIsland: {
    width: 110,
    height: 26,
    backgroundColor: '#000000',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  cameraLens: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0B1D28',
    borderWidth: 1.5,
    borderColor: '#1E3A8A',
    marginRight: 6,
  },
  sensorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#047857',
  },
  screenInner: {
    flex: 1,
    backgroundColor: COLORS.background,
    overflow: 'hidden',
  },
  homeBarContainer: {
    position: 'absolute',
    bottom: 4,
    left: 0,
    right: 0,
    zIndex: 999,
    alignItems: 'center',
    pointerEvents: 'none' as any,
  },
  homeBar: {
    width: 130,
    height: 4,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    borderRadius: 2,
  },
});
