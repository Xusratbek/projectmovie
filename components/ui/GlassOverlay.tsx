import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassBlur, GlassFallback, GlassTints } from '../../constants/glass';
import LiquidGlass from './LiquidGlass';

type GlassOverlayProps = {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

/** Poster pastidagi frosted glass panel (продолжить / аниме) */
export default function GlassOverlay({ style, children }: GlassOverlayProps) {
  return (
    <LiquidGlass
      style={[styles.overlay, style]}
      fallbackBackgroundColor={GlassFallback.overlay}
      tintColor={GlassTints.overlay}
      glassEffectStyle="clear"
      blurIntensity={GlassBlur.strong}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.35)', 'rgba(0,0,0,0.55)']}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />
      {children}
    </LiquidGlass>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
});
