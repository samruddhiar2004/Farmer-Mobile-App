import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Circle, Line, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';
import { COLORS, SPACING, RADIUS } from '../constants/theme';

interface SplineChartProps {
  data?: number[];
  labels?: string[];
  height?: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const SplineChart: React.FC<SplineChartProps> = ({
  data = [65, 70, 75, 71, 74, 69, 72],
  labels = ['07 Oct', '08 Oct', '09 Oct', '10 Oct', '11 Oct', '12 Oct', 'Today'],
  height = 140,
}) => {
  const chartWidth = SCREEN_WIDTH - SPACING.lg * 2 - 32;
  const paddingX = 24;
  const paddingY = 24;
  const drawWidth = chartWidth - paddingX * 2;
  const drawHeight = height - paddingY * 2;

  const minVal = 55;
  const maxVal = 85;

  const points = data.map((val, idx) => {
    const x = paddingX + (idx / (data.length - 1)) * drawWidth;
    const y = paddingY + drawHeight - ((val - minVal) / (maxVal - minVal)) * drawHeight;
    return { x, y, val };
  });

  // Build SVG path d attribute
  const pathD = points.reduce((acc, curr, idx) => {
    if (idx === 0) return `M ${curr.x} ${curr.y}`;
    const prev = points[idx - 1];
    const cp1x = prev.x + (curr.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (curr.x - prev.x) / 2;
    const cp2y = curr.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
  }, '');

  // Fill area under spline
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - 10} L ${points[0].x} ${height - 10} Z`;

  return (
    <View style={styles.container}>
      <Svg width={chartWidth} height={height}>
        <Defs>
          <LinearGradient id="moistureGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={COLORS.primaryLight} stopOpacity="0.4" />
            <Stop offset="1" stopColor={COLORS.primaryLight} stopOpacity="0.0" />
          </LinearGradient>
        </Defs>

        {/* Target 70% Optimal Moisture Guideline */}
        <Line
          x1={paddingX}
          y1={paddingY + drawHeight - ((70 - minVal) / (maxVal - minVal)) * drawHeight}
          x2={chartWidth - paddingX}
          y2={paddingY + drawHeight - ((70 - minVal) / (maxVal - minVal)) * drawHeight}
          stroke="#94A3B8"
          strokeWidth="1"
          strokeDasharray="4,4"
        />

        {/* Gradient Area */}
        <Path d={areaD} fill="url(#moistureGradient)" />

        {/* Smooth Spline Curve */}
        <Path d={pathD} fill="none" stroke={COLORS.primary} strokeWidth="3" />

        {/* Data Point Markers */}
        {points.map((pt, idx) => (
          <React.Fragment key={idx}>
            <Circle cx={pt.x} cy={pt.y} r="4.5" fill={COLORS.white} stroke={COLORS.primary} strokeWidth="2.5" />
            <SvgText
              x={pt.x}
              y={pt.y - 8}
              fontSize="9"
              fontWeight="bold"
              fill={COLORS.primaryDark}
              textAnchor="middle"
            >
              {pt.val}%
            </SvgText>
            <SvgText
              x={pt.x}
              y={height - 2}
              fontSize="8"
              fill={COLORS.textMuted}
              textAnchor="middle"
            >
              {labels[idx]}
            </SvgText>
          </React.Fragment>
        ))}
      </Svg>

      <View style={styles.legendRow}>
        <View style={styles.legendDot} />
        <Text style={styles.legendText}>Optimal Root Moisture Zone (65% – 75%)</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primaryLight,
    marginRight: 6,
  },
  legendText: {
    fontSize: 10.5,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
});
