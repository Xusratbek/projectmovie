import React from 'react';
import { Text } from 'react-native';
import { GlassFallback, GlassTints } from '../../constants/glass';
import LiquidGlass from '../ui/LiquidGlass';
import { heroStyles } from '../../styles/heroBillboard';

interface HeroTagProps {
  label: string;
}

export default function HeroTag({ label }: HeroTagProps) {
  if (!label) return null;

  return (
    <LiquidGlass
      style={heroStyles.tag}
      fallbackBackgroundColor="#2B2E33"
      tintColor={GlassTints.chrome}
      glassEffectStyle="clear"
    >
      <Text style={heroStyles.tagText} allowFontScaling={false}>
        {label}
      </Text>
    </LiquidGlass>
  );
}
