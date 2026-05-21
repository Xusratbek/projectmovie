import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { HeroLayout } from '../constants/heroLayout';
import { Movie } from '../types/movie';

export function useHeroCarousel(slides: Movie[]) {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<FlatList<Movie>>(null);
  const slideCount = slides.length;

  useEffect(() => {
    if (slideCount <= 1) return;

    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % slideCount;
      listRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }, HeroLayout.autoPlayIntervalMs);

    return () => clearInterval(interval);
  }, [activeIndex, slideCount]);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const nextIndex = Math.round(offsetX / HeroLayout.screenWidth);
      if (nextIndex >= 0 && nextIndex < slideCount) {
        setActiveIndex(nextIndex);
      }
    },
    [slideCount]
  );

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
    listRef.current?.scrollToOffset({
      offset: index * HeroLayout.screenWidth,
      animated: true,
    });
  }, []);

  const getItemLayout = useCallback(
    (_: ArrayLike<Movie> | null | undefined, index: number) => ({
      length: HeroLayout.screenWidth,
      offset: HeroLayout.screenWidth * index,
      index,
    }),
    []
  );

  return {
    activeIndex,
    listRef,
    onScroll,
    goToSlide,
    getItemLayout,
  };
}
