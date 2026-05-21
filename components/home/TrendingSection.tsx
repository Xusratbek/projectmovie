import React, { useMemo, useState } from 'react';
import { getTrendingMovies, getTrendingRank } from '../../data/mock/trending';
import { TrendingPeriod } from '../../types/home';
import HomeSection from '../ui/HomeSection';
import HorizontalMovieList from '../ui/HorizontalMovieList';
import PeriodFilterTabs from '../ui/PeriodFilterTabs';
import StandardMovieCard from '../StandardMovieCard';

const noop = () => {};

export default function TrendingSection() {
  const [period, setPeriod] = useState<TrendingPeriod>('today');

  const movies = useMemo(() => getTrendingMovies(period), [period]);

  return (
    <HomeSection
      title="В тренде"
      subtitle="Что смотрят больше всего"
      onViewAll={noop}
    >
      <PeriodFilterTabs value={period} onChange={setPeriod} />
      <HorizontalMovieList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <StandardMovieCard
            movie={item}
            showIndex={getTrendingRank(index, period)}
            onPress={noop}
          />
        )}
      />
    </HomeSection>
  );
}
