import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const posterWidth = screenWidth * 0.32;
const posterHeight = posterWidth * 1.36;

/** Hero billboard o‘lchamlari */
export const HeroLayout = {
  screenWidth,
  cardPadding: 20,
  cardGap: 22,
  posterWidth,
  posterHeight,
  posterScale: posterWidth / 140,
  infoTopOffset: posterHeight * 0.42,
  autoPlayIntervalMs: 4000,
} as const;
