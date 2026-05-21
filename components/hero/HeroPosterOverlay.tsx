import React from 'react';
import { View, Text } from 'react-native';
import { Movie } from '../../types/movie';
import { formatAgeLabel } from '../../utils/formatters';
import { heroStyles } from '../../styles/heroBillboard';

interface HeroPosterOverlayProps {
  movie: Movie;
}

/** URL poster ustidagi matn qatlamlari */
export default function HeroPosterOverlay({ movie }: HeroPosterOverlayProps) {
  const cinemaLine = movie.heroCinemaLine ?? 'В КИНО С 14 МАЯ';
  const ageLabel = formatAgeLabel(movie.ageLimit);
  const hasArt =
    movie.heroPosterTitleRed ||
    movie.heroPosterSubtitleWhite ||
    movie.heroPosterMotion;

  return (
    <>
      <View style={heroStyles.posterDim} pointerEvents="none" />
      <View style={heroStyles.bannerStrip}>
        <Text style={heroStyles.bannerText} allowFontScaling={false}>
          {cinemaLine}
        </Text>
      </View>

      {hasArt ? (
        <View style={heroStyles.posterArtBlock} pointerEvents="none">
          {movie.heroPosterTitleRed ? (
            <Text
              style={heroStyles.posterArtRed}
              numberOfLines={2}
              allowFontScaling={false}
            >
              {movie.heroPosterTitleRed}
            </Text>
          ) : null}
          {movie.heroPosterSubtitleWhite ? (
            <Text
              style={heroStyles.posterArtWhiteLine}
              numberOfLines={1}
              allowFontScaling={false}
            >
              {movie.heroPosterSubtitleWhite}
            </Text>
          ) : null}
          {movie.heroPosterMotion ? (
            <Text
              style={heroStyles.posterArtMotion}
              numberOfLines={2}
              allowFontScaling={false}
            >
              {movie.heroPosterMotion}
            </Text>
          ) : null}
        </View>
      ) : null}

      {ageLabel ? (
        <View style={heroStyles.posterAgeBadge}>
          <Text style={heroStyles.posterAgeText} allowFontScaling={false}>
            {ageLabel}
          </Text>
        </View>
      ) : null}
    </>
  );
}
