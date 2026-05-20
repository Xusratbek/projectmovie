import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { QuickSelection } from '../types/movie';

interface QuickSelectionCardProps {
  item: QuickSelection;
  onPress: () => void;
}

export default function QuickSelectionCard({ item, onPress }: QuickSelectionCardProps) {
  const gradientColors = item.gradientColors || [item.backgroundColor || '#1E1E4F', '#11112D'];
  const imageSource =
    item.image != null
      ? typeof item.image === 'number'
        ? item.image
        : { uri: item.image }
      : null;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {imageSource ? (
        <Image source={imageSource} style={styles.bgImage} resizeMode="cover" />
      ) : null}
      <LinearGradient
        colors={
          imageSource
            ? (['rgba(0,0,0,0.45)', 'rgba(0,0,0,0.75)'] as [string, string])
            : (gradientColors as [string, string, ...string[]])
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text style={styles.title} numberOfLines={2} allowFontScaling={false}>
          {item.title}
        </Text>
        <MaterialCommunityIcons
          name={item.icon as keyof typeof MaterialCommunityIcons.glyphMap}
          size={36}
          color="#FFFFFF"
          style={styles.icon}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 190,
    height: 85,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#1C1C1E',
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    maxWidth: '65%',
    lineHeight: 21,
    letterSpacing: -0.2,
  },
  icon: {
    opacity: 0.9,
  },
});