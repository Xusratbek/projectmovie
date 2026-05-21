import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { heroStyles } from '../../styles/heroBillboard';

interface HeroPaginationDotsProps {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
}

/** Slider pagination nuqtalari */
export default function HeroPaginationDots({
  count,
  activeIndex,
  onSelect,
}: HeroPaginationDotsProps) {
  return (
    <View style={heroStyles.dotsRow}>
      {Array.from({ length: count }, (_, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onSelect(index)}
          activeOpacity={0.8}
          hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}
        >
          <View
            style={[heroStyles.dot, index === activeIndex && heroStyles.dotActive]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}
