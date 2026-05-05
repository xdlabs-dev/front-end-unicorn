/**
 * Design tokens exposed to JavaScript consumers.
 * The canonical source of truth is the SCSS in ./scss — this is a runtime mirror.
 */

import './scss/index.scss';

export const colors = {
  primary: '#3b5bdb',
  primaryHover: '#2f49b0',
  primaryActive: '#26398a',
  surface: '#ffffff',
  surfaceMuted: '#f5f6fa',
  border: '#dadde5',
  text: '#1a1c23',
  textMuted: '#5a6273',
  danger: '#d6336c',
  success: '#2f9e44',
  focus: '#4dabf7',
} as const;

export const space = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
} as const;

export const radius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  pill: '999px',
} as const;

export const fontSize = {
  sm: '12px',
  md: '14px',
  lg: '16px',
  xl: '20px',
} as const;

export type ColorToken = keyof typeof colors;
export type SpaceToken = keyof typeof space;
