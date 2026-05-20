import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Movie } from '../types/movie';

interface WideRowCardProps {
  movie: Movie;
  onPress: () => void;
}

export default function WideRowCard({ movie, onPress }: WideRowCardProps) {
  const [posterFailed, setPosterFailed] = useState(false);
  const posterUri = typeof movie.poster === 'string' ? movie.poster : undefined;

  useEffect(() => {
    setPosterFailed(false);
  }, [posterUri, movie.poster]);

  return (
    <View style={styles.cardContainer}>
      {!posterFailed && (posterUri || typeof movie.poster === 'number') ? (
        <Image
          source={
            posterUri
              ? { uri: posterUri }
              : (movie.poster as number)
          }
          style={styles.poster}
          resizeMode="cover"
          onError={() => setPosterFailed(true)}
        />
      ) : (
        <View style={[styles.poster, styles.posterPlaceholder]}>
          <MaterialCommunityIcons
            name="movie-open-outline"
            size={32}
            color="#4B4B4F"
          />
        </View>
      )}
      
      <View style={styles.detailsContainer}>
        {movie.reason && (
          <Text style={styles.reasonText} numberOfLines={1} allowFontScaling={false}>
            {movie.reason}
          </Text>
        )}
        <Text style={styles.title} numberOfLines={1} allowFontScaling={false}>
          {movie.title}
        </Text>
        <Text style={styles.subDetails} numberOfLines={1} allowFontScaling={false}>
          {movie.duration} | {movie.genre?.join(', ')}
        </Text>
        
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.watchButton} onPress={onPress} activeOpacity={0.8}>
            <MaterialCommunityIcons name="play" size={16} color="#000000" />
            <Text style={styles.watchText} allowFontScaling={false}>Смотреть</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.bookmarkButton} activeOpacity={0.7}>
            <MaterialCommunityIcons name="bookmark-outline" size={18} color="#FFFFFF" />
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
    borderRadius: 20,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2C',
  },
  poster: {
    width: 88,
    height: 128,
    borderRadius: 14,
    backgroundColor: '#2C2C2E',
  },
  posterPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
    minHeight: 128,
  },
  reasonText: {
    color: '#9B6BFF',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  subDetails: {
    color: '#8E8E93',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 14,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  watchButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#E8E8ED',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    maxWidth: 200,
  },
  watchText: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 14,
  },
  bookmarkButton: {
    backgroundColor: '#2C2C2E',
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
});