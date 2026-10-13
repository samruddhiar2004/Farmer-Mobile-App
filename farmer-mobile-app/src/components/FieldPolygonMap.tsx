import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Polygon, Line, Rect, Circle, Text as SvgText } from 'react-native-svg';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { Field } from '../types';
import { useLanguage } from '../i18n';

interface FieldPolygonMapProps {
  fields: Field[];
  selectedFieldId?: string;
  onSelectField?: (field: Field) => void;
  height?: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const FieldPolygonMap: React.FC<FieldPolygonMapProps> = ({
  fields,
  selectedFieldId,
  onSelectField,
  height = 240,
}) => {
  const { t } = useLanguage();
  const mapWidth = SCREEN_WIDTH - SPACING.lg * 2;

  // Normalized polygon coordinates for the 3 plots on our SVG canvas
  // Plot 1 (Wheat 4.0 Ac): Top Left
  // Plot 2 (Sugarcane 5.0 Ac): Center Right
  // Plot 3 (Onion 3.5 Ac): Bottom Left
  const svgPolygons: Record<string, string> = {
    field_1: `30,30 160,20 180,120 40,110`,
    field_2: `190,25 330,35 315,185 185,130`,
    field_3: `45,120 180,130 165,220 30,205`,
  };

  const centerPoints: Record<string, { x: number; y: number }> = {
    field_1: { x: 100, y: 70 },
    field_2: { x: 255, y: 100 },
    field_3: { x: 105, y: 165 },
  };

  return (
    <View style={[styles.container, { height }]}>
      {/* Aerial Terrain Canvas */}
      <Svg width={mapWidth} height={height} viewBox={`0 0 360 ${height}`}>
        {/* Background Field Texture */}
        <Rect x="0" y="0" width="360" height={height} fill="#1E293B" rx="16" />

        {/* Contour & Canal irrigation grid lines */}
        <Line x1="0" y1="60" x2="360" y2="60" stroke="#334155" strokeWidth="1" strokeDasharray="4,4" />
        <Line x1="0" y1="140" x2="360" y2="140" stroke="#334155" strokeWidth="1" strokeDasharray="4,4" />
        <Line x1="120" y1="0" x2="120" y2={height} stroke="#334155" strokeWidth="1" strokeDasharray="4,4" />
        <Line x1="240" y1="0" x2="240" y2={height} stroke="#334155" strokeWidth="1" strokeDasharray="4,4" />

        {/* Nira Left Canal path */}
        <Line x1="0" y1="18" x2="360" y2="18" stroke="#38BDF8" strokeWidth="3" />
        <SvgText x="15" y="14" fill="#7DD3FC" fontSize="9" fontWeight="bold">
          💧 NIRA LEFT CANAL (IRRIGATION SOURCE)
        </SvgText>

        {/* Field Polygons */}
        {fields.map((field) => {
          const points = svgPolygons[field.id] || `60,60 160,60 160,160 60,160`;
          const isSelected = selectedFieldId === field.id;
          const center = centerPoints[field.id] || { x: 100, y: 100 };

          return (
            <React.Fragment key={field.id}>
              <Polygon
                points={points}
                fill={isSelected ? `${field.color}66` : `${field.color}33`}
                stroke={isSelected ? '#FFFFFF' : field.color}
                strokeWidth={isSelected ? '3' : '2'}
                onPress={() => onSelectField && onSelectField(field)}
              />

              {/* Center Marker */}
              <Circle
                cx={center.x}
                cy={center.y}
                r={isSelected ? '8' : '5'}
                fill={field.color}
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />

              {/* Label */}
              <SvgText
                x={center.x}
                y={center.y + 16}
                fill="#FFFFFF"
                fontSize="10"
                fontWeight="bold"
                textAnchor="middle"
              >
                {field.cropName} ({field.area} Ac)
              </SvgText>
            </React.Fragment>
          );
        })}
      </Svg>

      {/* Floating Legend / Compass Badge */}
      <View style={styles.compassBadge}>
        <Text style={styles.compassText}>🧭 N</Text>
      </View>

      <View style={styles.gisLayerBadge}>
        <Text style={styles.gisLayerText}>📡 GPS WGS84 • 18.1523° N, 74.5768° E</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
    position: 'relative',
    ...SHADOWS.md,
  },
  compassBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  compassText: {
    color: '#F8FAFC',
    fontSize: 10,
    fontWeight: '700',
  },
  gisLayerBadge: {
    position: 'absolute',
    bottom: 8,
    left: 10,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  gisLayerText: {
    color: '#94A3B8',
    fontSize: 9.5,
    fontWeight: '600',
  },
});
