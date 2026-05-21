import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlassTints } from '../constants/glass';
import { Movie } from '../types/movie';
import LiquidGlass from './ui/LiquidGlass';

interface StandardMovieCardProps {
  movie: Movie;
  showIndex?: number;
  onPress: () => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.35;

export default function StandardMovieCard({ movie, showIndex, onPress }: StandardMovieCardProps) {
  const hasRatings = movie.ratingKinopoisk != null || movie.ratingImdb != null;
  const [posterFailed, setPosterFailed] = useState(false);
  const posterUri =
    typeof movie.poster === 'string' ? movie.poster : undefined;

  useEffect(() => {
    setPosterFailed(false);
  }, [posterUri, movie.poster]);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        {!posterFailed && posterUri ? (
          <Image
            source={{ uri: posterUri }}
            style={styles.poster}
            resizeMode="cover"
            onError={() => setPosterFailed(true)}
          />
        ) : typeof movie.poster === 'number' ? (
          <Image
            source={movie.poster}
            style={styles.poster}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.posterPlaceholder}>
            <MaterialCommunityIcons
              name="movie-open-outline"
              size={32}
              color="#4B4B4F"
            />
          </View>
        )}
        
        {/* Top Left: Circular Index Badge */}
        {showIndex !== undefined && (
          <LiquidGlass
            style={styles.indexBadge}
            fallbackBackgroundColor="rgba(0, 0, 0, 0.5)"
            tintColor={GlassTints.chrome}
            glassEffectStyle="clear"
          >
            <Text style={styles.indexText} allowFontScaling={false}>{showIndex}</Text>
          </LiquidGlass>
        )}

        {/* Bottom Left: Ratings Overlay inside the poster */}
        {hasRatings && (
          <View style={styles.ratingsOverlay}>
            {movie.ratingKinopoisk != null && (
              <View style={styles.ratingOverlayItem}>
                <View style={styles.kpIconWrap}>
                  <MaterialCommunityIcons
                    name="white-balance-sunny"
                    size={9}
                    color="#FF8A00"
                  />
                </View>
                <Text style={styles.ratingOverlayNum} allowFontScaling={false}>
                  {movie.ratingKinopoisk}
                </Text>
              </View>
            )}
            
            {movie.ratingImdb != null && (
              <View style={styles.ratingOverlayItem}>
                <View style={styles.imdbOverlayBadge}>
                  <Text style={styles.imdbOverlayText} allowFontScaling={false}>IMDb</Text>
                </View>
                <Text style={styles.ratingOverlayNum} allowFontScaling={false}>
                  {movie.ratingImdb}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Progress Overlay Text & Bar (Продолжить просмотр) */}
        {movie.progress !== undefined && (
          <>
            {(movie.seasonEpisode || movie.duration) && (
              <View style={styles.progressOverlay}>
                <View style={styles.progressTextRow}>
                  {movie.seasonEpisode ? (
                    <Text style={styles.progressOverlayText} allowFontScaling={false}>
                      {movie.seasonEpisode}
                    </Text>
                  ) : movie.duration ? (
                    <Text style={styles.progressOverlayText} allowFontScaling={false}>
                      {movie.duration}
                    </Text>
                  ) : null}
                  {movie.seasonEpisode && movie.duration ? (
                    <Text style={styles.progressOverlayText} allowFontScaling={false}>
                      {movie.duration}
                    </Text>
                  ) : null}
                </View>
              </View>
            )}

            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressBar,
                  { width: `${Math.min(100, Math.max(0, movie.progress * 100))}%` },
                ]}
              />
            </View>
          </>
        )}
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
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1C1C1E',
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  posterPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2C2C2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indexBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indexText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
  ratingsOverlay: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingOverlayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  kpIconWrap: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imdbOverlayBadge: {
    backgroundColor: '#F5C518',
    borderRadius: 2,
    paddingHorizontal: 3.5,
    paddingVertical: 1,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imdbOverlayText: {
    color: '#000000',
    fontSize: 6.5,
    fontWeight: '900',
    lineHeight: 8,
  },
  ratingOverlayNum: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 15,
  },
  progressOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 8,
    right: 8,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  progressOverlayText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  progressTrack: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    height: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#8A3FFC',
    borderRadius: 3,
  },
});