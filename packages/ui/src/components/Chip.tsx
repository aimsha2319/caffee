"use client";

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { colors, radii, spacing } from '../theme/tokens';

type ChipProps = {
  label: string;
  selected?: boolean;
  icon?: React.ReactNode;
};

export const Chip: React.FC<ChipProps> = ({ label, selected, icon }) => {
  return (
    <View
      accessibilityRole="text"
      style={[styles.base, selected ? styles.selected : undefined]}
    >
      {icon}
      <Text style={[styles.label, selected ? styles.selectedLabel : undefined]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceVariant
  },
  selected: {
    backgroundColor: colors.primary
  },
  label: {
    fontSize: 14,
    color: colors.muted,
    fontWeight: '500'
  },
  selectedLabel: {
    color: '#fff'
  }
});

export default Chip;
