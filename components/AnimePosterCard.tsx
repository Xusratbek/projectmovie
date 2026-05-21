import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Movie } from '../types/movie';
import GlassOverlay from './ui/GlassOverlay';

interface AnimePosterCardProps {
  movie: Movie;
  onPress: () => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.35;

export default function AnimePosterCard({ movie, onPress }: AnimePosterCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image
          source={
            typeof movie.poster === 'string'
              ? { uri: movie.poster }
              : movie.poster
          }
          style={styles.poster}
          resizeMode="cover"
        />
        
        <GlassOverlay style={styles.titleGlass}>
          <Text style={styles.title} numberOfLines={2} allowFontScaling={false}>
            {movie.title}
          </Text>
        </GlassOverlay>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH * 1.42,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1C1C1E',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  titleGlass: {
    height: '32%',
    paddingHorizontal: 8,
    paddingBottom: 10,
    paddingTop: 12,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 16,
  },
});
