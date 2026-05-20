import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Movie } from '../types/movie';

interface WideRowCardProps {
  movie: Movie;
  onPress: () => void;
}

export default function WideRowCard({ movie, onPress }: WideRowCardProps) {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: movie.poster }} style={styles.poster} />
      
      <View style={styles.detailsContainer}>
        {movie.reason && <Text style={styles.reasonText}>{movie.reason}</Text>}
        <Text style={styles.title} numberOfLines={1}>{movie.title}</Text>
        <Text style={styles.subDetails}>{movie.duration} | {movie.genre?.join(', ')}</Text>
        
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.watchButton} onPress={onPress} activeOpacity={0.8}>
            <Text style={styles.playIcon}>▶</Text>
            <Text style={styles.watchText}>Смотреть</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.bookmarkButton} activeOpacity={0.7}>
            <Text style={styles.bookmarkIcon}>🔖</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  poster: {
    width: 80,
    height: 112,
    borderRadius: 8,
    backgroundColor: '#2C2C2E',
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  reasonText: {
    color: '#8A3FFC',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  subDetails: {
    color: '#8E8E93',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 12,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  watchButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  playIcon: {
    color: '#000000',
    fontSize: 11,
    marginRight: 6,
  },
  watchText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 13,
  },
  bookmarkButton: {
    backgroundColor: '#2C2C2E',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkIcon: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});