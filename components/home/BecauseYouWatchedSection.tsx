import React from 'react';
import { BECAUSE_YOU_WATCHED_MOVIES } from '../../data/mock/becauseYouWatched';
import HomeSection from '../ui/HomeSection';
import HorizontalMovieList from '../ui/HorizontalMovieList';
import StandardMovieCard from '../StandardMovieCard';

const noop = () => {};

export default function BecauseYouWatchedSection() {
  return (
    <HomeSection
      title="Потому что вы смотрели «Пацаны»"
      onViewAll={noop}
    >
      <HorizontalMovieList
        data={BECAUSE_YOU_WATCHED_MOVIES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StandardMovieCard movie={item} onPress={noop} />
        )}
      />
    </HomeSection>
  );
}
