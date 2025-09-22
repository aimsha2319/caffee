export const colors = {
  primary: '#4C3A51',
  secondary: '#E7AB79',
  accent: '#FFBC80',
  surface: '#FFFFFF',
  surfaceVariant: '#F5F2ED',
  muted: '#6F6776',
  success: '#2E7D32',
  warning: '#ED6C02',
  danger: '#C62828',
  dark: '#1C1B1F'
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32
};

export const radii = {
  sm: 8,
  md: 16,
  lg: 24,
  full: 999
};

export const typography = {
  heading: {
    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont',
    fontWeight: '700'
  },
  body: {
    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont',
    fontWeight: '400'
  }
};

export const shadows = {
  sm: '0 4px 12px rgba(0,0,0,0.08)',
  md: '0 10px 40px rgba(0,0,0,0.12)'
};

export const motion = {
  duration: {
    quick: 120,
    normal: 240,
    gentle: 360
  },
  easing: {
    standard: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
    entrance: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    exit: 'cubic-bezier(0.4, 0.0, 1, 1)'
  }
};

export const tokens = {
  colors,
  spacing,
  radii,
  typography,
  shadows,
  motion
};
