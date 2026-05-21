import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';
import { formatRating } from '../../utils/formatters';
import { heroStyles } from '../../styles/heroBillboard';

interface HeroRatingRowProps {
  kinopoisk?: number;
  imdb?: number;
}

/** Kinopoisk va IMDb reytinglari */
export default function HeroRatingRow({ kinopoisk, imdb }: HeroRatingRowProps) {
  if (kinopoisk == null && imdb == null) return null;

  return (
    <View style={heroStyles.ratingRow}>
      {kinopoisk != null ? (
        <View style={heroStyles.ratingItem}>
          <View style={heroStyles.kpIconWrap}>
            <MaterialCommunityIcons
              name="white-balance-sunny"
              size={12}
              color="#FF8A00"
            />
          </View>
          <Text style={heroStyles.ratingNum} allowFontScaling={false}>
            {formatRating(kinopoisk)}
          </Text>
        </View>
      ) : null}

      {imdb != null ? (
        <View
          style={[
            heroStyles.ratingItem,
            kinopoisk != null && heroStyles.ratingItemGap,
          ]}
        >
          <View style={heroStyles.imdbBadge}>
            <Text style={heroStyles.imdbText} allowFontScaling={false}>
              IMDb
            </Text>
          </View>
          <Text style={heroStyles.ratingNum} allowFontScaling={false}>
            {formatRating(imdb)}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
