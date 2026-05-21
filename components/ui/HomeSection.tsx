import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import SectionHeader from '../SectionHeader';
import { homeScreenStyles } from '../../styles/homeScreen';

interface HomeSectionProps {
  title: string;
  subtitle?: string;
  onViewAll?: () => void;
  children: ReactNode;
}

/** Bosh sahifa bo‘limi: sarlavha + kontent */
export default function HomeSection({
  title,
  subtitle,
  onViewAll,
  children,
}: HomeSectionProps) {
  return (
    <View style={homeScreenStyles.section}>
      <SectionHeader title={title} subtitle={subtitle} onPress={onViewAll} />
      {children}
    </View>
  );
}
