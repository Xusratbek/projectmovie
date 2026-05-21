import React from 'react';
import { POPULAR_ANIME_MOVIES } from '../../data/mock/popularAnime';
import HomeSection from '../ui/HomeSection';
import HorizontalMovieList from '../ui/HorizontalMovieList';
import AnimePosterCard from '../AnimePosterCard';

const noop = () => {};

export default function PopularAnimeSection() {
  return (
    <HomeSection
      title="Популярное аниме"
      subtitle="Закончите начатое"
      onViewAll={noop}
    >
      <HorizontalMovieList
        data={POPULAR_ANIME_MOVIES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AnimePosterCard movie={item} onPress={noop} />
        )}
      />
    </HomeSection>
  );
}
