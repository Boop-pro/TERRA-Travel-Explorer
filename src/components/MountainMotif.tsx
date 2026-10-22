import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

interface MountainMotifProps {
  color?: string;
  size?: number;
}

/**
 * TERRA Minimal Geometric Mountain Motif
 * An editorial geometric symbol representing peaks, horizons, and exploration.
 */
export const MountainMotif: React.FC<MountainMotifProps> = ({
  color = Colors.forestGreen,
  size = 24,
}) => {
  const strokeWidth = Math.max(1.8, size * 0.08);

  return (
    <View style={[styles.container, { width: size, height: size * 0.7 }]}>
      {/* Primary Peak */}
      <View
        style={[
          styles.line,
          {
            borderColor: color,
            borderWidth: strokeWidth,
            borderBottomWidth: 0,
            borderRightWidth: 0,
            width: size * 0.5,
            height: size * 0.5,
            transform: [{ rotate: '45deg' }],
            position: 'absolute',
            bottom: size * 0.05,
            left: size * 0.12,
          },
        ]}
      />
      {/* Secondary Companion Peak */}
      <View
        style={[
          styles.line,
          {
            borderColor: color,
            borderWidth: strokeWidth,
            borderBottomWidth: 0,
            borderRightWidth: 0,
            width: size * 0.36,
            height: size * 0.36,
            transform: [{ rotate: '45deg' }],
            position: 'absolute',
            bottom: size * 0.05,
            right: size * 0.1,
            opacity: 0.75,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  line: {
    backgroundColor: 'transparent',
  },
});
