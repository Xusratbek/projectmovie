import { ImageSourcePropType } from 'react-native';
import { Movie } from '../types/movie';

export function getPosterSource(movie: Movie): ImageSourcePropType {
  return typeof movie.poster === 'number'
    ? movie.poster
    : { uri: movie.poster };
}

export function isLocalPoster(movie: Movie): boolean {
  return typeof movie.poster === 'number';
}
