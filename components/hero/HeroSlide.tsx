import React from 'react';
import { View, Text, Image } from 'react-native';
import { Movie } from '../../types/movie';
import { formatAgeLabel } from '../../utils/formatters';
import { getPosterSource, isLocalPoster } from '../../utils/moviePoster';
import { heroStyles } from '../../styles/heroBillboard';
import HeroPosterOverlay from './HeroPosterOverlay';
import HeroRatingRow from './HeroRatingRow';
import HeroTag from './HeroTag';

interface HeroSlideProps {
  movie: Movie;
}

/** Bitta hero slayd: poster + ma’lumot */
export default function HeroSlide({ movie }: HeroSlideProps) {
  const ageLabel = formatAgeLabel(movie.ageLimit);
  const primaryGenre = movie.genre?.[0]?.trim();
  const showOverlay = !isLocalPoster(movie);

  return (
    <View style={heroStyles.card}>
      <View style={heroStyles.posterWrapper}>
        <Image
          source={getPosterSource(movie)}
          style={heroStyles.posterImg}
          resizeMode="cover"
        />
        {showOverlay ? <HeroPosterOverlay movie={movie} /> : null}
      </View>

      <View style={heroStyles.infoCol}>
        <Text style={heroStyles.title} numberOfLines={2} allowFontScaling={false}>
          {movie.title.replace(/\\n/g, '\n')}
        </Text>

        {movie.description ? (
          <Text
            style={heroStyles.desc}
            numberOfLines={1}
            ellipsizeMode="tail"
            allowFontScaling={false}
          >
            {movie.description}
          </Text>
        ) : null}

        <HeroRatingRow
          kinopoisk={movie.ratingKinopoisk}
          imdb={movie.ratingImdb}
        />

        <View style={heroStyles.tagRow}>
          {movie.year != null ? <HeroTag label={String(movie.year)} /> : null}
          {primaryGenre ? <HeroTag label={primaryGenre} /> : null}
          {ageLabel ? <HeroTag label={ageLabel} /> : null}
        </View>
      </View>
    </View>
  );
}
