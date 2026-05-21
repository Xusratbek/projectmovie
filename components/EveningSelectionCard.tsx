import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlassBorder, GlassFallback, GlassTints } from '../constants/glass';
import LiquidGlass from './ui/LiquidGlass';

interface EveningSelectionCardProps {
  title: string;
  subtitle: string;
  ratingKinopoisk: number;
  ratingImdb: number;
  duration: string;
  poster: ImageSourcePropType;
  onPress: () => void;
}

export default function EveningSelectionCard({
  title,
  subtitle,
  ratingKinopoisk,
  ratingImdb,
  duration,
  poster,
  onPress,
}: EveningSelectionCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <LiquidGlass
        style={styles.cardContainer}
        fallbackBackgroundColor={GlassFallback.evening}
        tintColor={GlassTints.evening}
        glassEffectStyle="clear"
      >
        <View style={styles.leftColumn}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          
          <View style={styles.ratingsRow}>
            <View style={styles.ratingItem}>
              <View style={styles.kpIconWrap}>
                <MaterialCommunityIcons name="white-balance-sunny" size={11} color="#FFFFFF" />
              </View>
              <Text style={styles.ratingText}>{ratingKinopoisk.toFixed(1)}</Text>
            </View>
            
            <View style={styles.ratingItem}>
              <View style={styles.imdbBadge}>
                <Text style={styles.imdbText}>IMDb</Text>
              </View>
              <Text style={styles.ratingText}>{ratingImdb.toFixed(1)}</Text>
            </View>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.playButton} onPress={onPress} activeOpacity={0.85}>
              <Text style={styles.playIcon}>▶</Text>
              <Text style={styles.playText}>Смотреть</Text>
            </TouchableOpacity>
            <Text style={styles.durationText}>{duration}</Text>
          </View>
        </View>

        <View style={styles.rightColumn}>
          <View style={styles.posterShadowContainer}>
            <Image source={poster} style={styles.posterImage} resizeMode="cover" />
          </View>
        </View>
      </LiquidGlass>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 180,
    borderWidth: 1,
    borderColor: GlassBorder,
    overflow: 'hidden',
  },
  leftColumn: {
    flex: 1.4,
    justifyContent: 'center',
    paddingRight: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
    lineHeight: 30,
  },
  subtitle: {
    color: '#BFAFAF',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  },
  ratingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  ratingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  kpIconWrap: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FF5C00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imdbBadge: {
    backgroundColor: '#F5C518',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imdbText: {
    color: '#000000',
    fontSize: 8,
    fontWeight: '900',
    lineHeight: 10,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  playButton: {
    flexDirection: 'row',
    backgroundColor: '#D6C7C7',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignItems: 'center',
    gap: 4,
  },
  playIcon: {
    color: '#000000',
    fontSize: 10,
    marginRight: 2,
  },
  playText: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 14,
  },
  durationText: {
    color: '#BFAFAF',
    fontSize: 14,
    fontWeight: '600',
  },
  rightColumn: {
    flex: 0.8,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: -6,
  },
  posterShadowContainer: {
    shadowColor: '#000000',
    shadowOffset: { width: -4, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    transform: [{ rotate: '-6deg' }, { scale: 1.05 }],
  },
  posterImage: {
    width: 114,
    height: 162,
    borderRadius: 12,
    backgroundColor: '#2C2C2E',
  },
});
