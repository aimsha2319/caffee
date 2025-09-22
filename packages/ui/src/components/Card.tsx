"use client";

import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, radii, shadows, spacing } from '../theme/tokens';

type CardProps = {
  children: ReactNode;
  elevated?: boolean;
  padding?: keyof typeof spacing;
  backgroundColor?: string;
};

export const Card: React.FC<CardProps> = ({
  children,
  elevated = true,
  padding = 'lg',
  backgroundColor = colors.surface
}) => {
  return (
    <View
      style={[
        styles.base,
        elevated ? styles.elevated : undefined,
        { padding: spacing[padding], backgroundColor }
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: 'rgba(28, 27, 31, 0.08)'
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3
  }
});

export default Card;
