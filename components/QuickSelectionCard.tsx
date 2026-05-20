import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { QuickSelection } from '../types/movie';

interface QuickSelectionCardProps {
  item: QuickSelection;
  onPress: () => void;
}

const { width } = Dimensions.get('window');

export default function QuickSelectionCard({ item, onPress }: QuickSelectionCardProps) {
  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: item.backgroundColor }]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.icon}>{item.icon}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width * 0.42,
    height: 85,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    maxWidth: '75%',
  },
  icon: {
    fontSize: 24,
  },
});