import React from 'react';
import { View, Text } from 'react-native';
import { heroStyles } from '../../styles/heroBillboard';

interface HeroTagProps {
  label: string;
}

export default function HeroTag({ label }: HeroTagProps) {
  if (!label) return null;

  return (
    <View style={heroStyles.tag}>
      <Text style={heroStyles.tagText} allowFontScaling={false}>
        {label}
      </Text>
    </View>
  );
}
