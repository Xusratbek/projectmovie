import React, { ReactNode } from 'react';
import { Platform, StyleProp, View, ViewStyle } from 'react-native';
import {
  GlassStyle,
  GlassView,
  isGlassEffectAPIAvailable,
} from 'expo-glass-effect';

export type LiquidGlassProps = {
  style?: StyleProp<ViewStyle>;
  /** Liquid Glass yo‘q platformalarda mockup rangi saqlanadi */
  fallbackBackgroundColor?: string;
  glassEffectStyle?: GlassStyle;
  tintColor?: string;
  isInteractive?: boolean;
  children?: ReactNode;
};

/** iOS 26+ da native Liquid Glass mavjudligi */
export function useLiquidGlass(): boolean {
  return Platform.OS === 'ios' && isGlassEffectAPIAvailable();
}

/** Dizayn bir xil: iOS da GlassView, qolganida oddiy View + fallback fon */
export default function LiquidGlass({
  style,
  fallbackBackgroundColor,
  glassEffectStyle = 'regular',
  tintColor,
  isInteractive,
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

  return (
    <View
      style={[
        style,
        fallbackBackgroundColor != null && {
          backgroundColor: fallbackBackgroundColor,
        },
      ]}
    >
      {children}
    </View>
  );
}
