import React from 'react';
import { CONTINUE_WATCHING_MOVIES } from '../../data/mock/continueWatching';
import { Layout } from '../../constants/layout';
import HomeSection from '../ui/HomeSection';
import HorizontalMovieList from '../ui/HorizontalMovieList';
import StandardMovieCard from '../StandardMovieCard';

const noop = () => {};

export default function ContinueWatchingSection() {
  return (
    <HomeSection
      title="Продолжить просмотр"
      subtitle="Закончите начатое"
      onViewAll={noop}
    >
      <HorizontalMovieList
        data={CONTINUE_WATCHING_MOVIES}
        snapToInterval={Layout.continueSnapInterval}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StandardMovieCard movie={item} onPress={noop} />
        )}
      />
    </HomeSection>
  );
}
