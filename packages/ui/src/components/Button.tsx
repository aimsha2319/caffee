"use client";

import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, radii, spacing } from '../theme/tokens';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  accessibilityLabel?: string;
  style?: ViewStyle;
  disabled?: boolean;
};

const VARIANT_STYLES: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: colors.primary
  },
  secondary: {
    backgroundColor: colors.secondary
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.muted
  }
};

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  accessibilityLabel,
  style,
  disabled
}) => {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.base,
        VARIANT_STYLES[variant],
        pressed && !disabled ? styles.pressed : undefined,
        disabled ? styles.disabled : undefined,
        style
      ]}
    >
      <Text style={[styles.text, variant === 'ghost' ? styles.ghostText : undefined]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.sm
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
  },
  ghostText: {
    color: colors.primary
  },
  disabled: {
    opacity: 0.5
  },
  pressed: {
    transform: [{ scale: 0.99 }]
  }
});

export default Button;
