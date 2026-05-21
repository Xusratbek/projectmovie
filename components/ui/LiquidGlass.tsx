import React, { ReactNode } from 'react';
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import {
  GlassStyle,
  GlassView,
  isGlassEffectAPIAvailable,
} from 'expo-glass-effect';
import { GlassBlur } from '../../constants/glass';

export type LiquidGlassProps = {
  style?: StyleProp<ViewStyle>;
  /** Liquid Glass yo‘q platformalarda mockup rangi saqlanadi */
  fallbackBackgroundColor?: string;
  glassEffectStyle?: GlassStyle;
  tintColor?: string;
  isInteractive?: boolean;
  /** Blur kuchi — poster overlay uchun kuchliroq */
  blurIntensity?: number;
  children?: ReactNode;
};

/** iOS 26+ da native Liquid Glass mavjudligi */
export function useLiquidGlass(): boolean {
  return Platform.OS === 'ios' && isGlassEffectAPIAvailable();
}

/**
 * Android’da dimezis BlurView hardware bitmap bilan crash qiladi
 * (“Software rendering doesn't support hardware bitmaps”).
 * Shuning uchun blur faqat iOS/web; Android — tint fallback.
 */
const supportsBackdropBlur = Platform.OS === 'ios' || Platform.OS === 'web';

/** Dizayn bir xil: iOS da GlassView, qolganida BlurView yoki tint fallback */
export default function LiquidGlass({
  style,
  fallbackBackgroundColor,
  glassEffectStyle = 'regular',
  tintColor,
  isInteractive,
  blurIntensity = GlassBlur.medium,
  children,
}: LiquidGlassProps) {
  if (useLiquidGlass()) {
    return (
      <GlassView
        style={style}
        glassEffectStyle={glassEffectStyle}
        tintColor={tintColor}
        isInteractive={isInteractive}
      >
        {children}
      </GlassView>
    );
  }

  const tint =
    tintColor ??
    fallbackBackgroundColor ??
    'rgba(28, 28, 30, 0.5)';

  return (
    <View style={[style, styles.shell]}>
      {supportsBackdropBlur ? (
        <BlurView
          intensity={blurIntensity}
          tint="dark"
          style={StyleSheet.absoluteFillObject}
        />
      ) : null}
      <View
        style={[StyleSheet.absoluteFillObject, { backgroundColor: tint }]}
        pointerEvents="none"
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    overflow: 'hidden',
  },
});
