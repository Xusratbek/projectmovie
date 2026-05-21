import React, { useCallback, useMemo } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { useHeroCarousel } from '../../hooks/useHeroCarousel';
import { heroStyles } from '../../styles/heroBillboard';
import { Movie } from '../../types/movie';
import HeroHeader from './HeroHeader';
import HeroPaginationDots from './HeroPaginationDots';
import HeroSlide from './HeroSlide';
import HeroStatusBar from './HeroStatusBar';

interface HeroBillboardProps {
  movies: Movie[];
}

export default function HeroBillboard({ movies }: HeroBillboardProps) {
  const slides = useMemo(() => movies.filter(Boolean), [movies]);
  const { activeIndex, listRef, onScroll, goToSlide, getItemLayout } =
    useHeroCarousel(slides);

  const renderSlide: ListRenderItem<Movie> = useCallback(
    ({ item }) => (
      <View style={heroStyles.slidePage}>
        <HeroSlide movie={item} />
      </View>
    ),
    []
  );

  if (slides.length === 0) return null;

  return (
    <View style={heroStyles.container}>
      <HeroStatusBar />
      <HeroHeader />

      <FlatList
        ref={listRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        bounces={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={renderSlide}
        getItemLayout={getItemLayout}
      />

      <HeroPaginationDots
        count={slides.length}
        activeIndex={activeIndex}
        onSelect={goToSlide}
      />
    </View>
  );
}
