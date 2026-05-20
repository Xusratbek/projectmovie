import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Movie } from '../types/movie';

interface StandardMovieCardProps {
  movie: Movie;
  showIndex?: number;
  onPress: () => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.36;

export default function StandardMovieCard({ movie, showIndex, onPress }: StandardMovieCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: movie.poster }} style={styles.poster} resizeMode="cover" />
        
        {showIndex !== undefined && (
          <View style={styles.indexBadge}>
            <Text style={styles.indexText}>{showIndex}</Text>
          </View>
        )}

        {movie.progress !== undefined && (
          <View style={styles.progressTrack}>
            <View style={[styles.progressBar, { width: `${movie.progress * 100}%` }]} />
          </View>
        )}
      </View>

      <View style={styles.infoContainer}>
        {movie.seasonEpisode || movie.duration ? (
          <Text style={styles.metaText}>
            {movie.seasonEpisode ? `${movie.seasonEpisode} • ` : ''}{movie.duration}
          </Text>
        ) : null}
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        
        {(movie.ratingKinopoisk || movie.ratingImdb) && (
          <View style={styles.ratingRow}>
            {movie.ratingKinopoisk && (
              <Text style={styles.ratingKp}>★ {movie.ratingKinopoisk}</Text>
            )}
            {movie.ratingImdb && (
              <Text style={styles.ratingImdb}>IMDb {movie.ratingImdb}</Text>
            )}
          </View>
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
    height: CARD_WIDTH * 1.4,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1C1C1E',
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  indexBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indexText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  progressTrack: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#8A3FFC',
  },
  infoContainer: {
    marginTop: 8,
  },
  metaText: {
    color: '#8E8E93',
    fontSize: 11,
    marginBottom: 2,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  ratingKp: {
    color: '#FF9500',
    fontSize: 11,
    fontWeight: 'bold',
  },
  ratingImdb: {
    color: '#FFCC00',
    fontSize: 11,
    fontWeight: 'bold',
  },
});