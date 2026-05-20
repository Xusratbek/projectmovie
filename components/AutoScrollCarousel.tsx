import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface AutoScrollCarouselProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactElement | null;
  keyExtractor: (item: T, index: number) => string;
  itemWidth: number;
  intervalMs?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
  itemGap?: number;
}

export default function AutoScrollCarousel<T>({
  data,
  renderItem,
  keyExtractor,
  itemWidth,
  intervalMs = 4500,
  contentContainerStyle,
  itemGap = 12,
}: AutoScrollCarouselProps<T>) {
  const listRef = useRef<FlatList<T>>(null);
  const activeRef = useRef(0);
  const stride = itemWidth + itemGap;

  const scrollToIndex = useCallback(
    (index: number) => {
      if (data.length === 0) return;
      listRef.current?.scrollToOffset({ offset: index * stride, animated: true });
      activeRef.current = index;
    },
    [data.length, stride]
  );

  useEffect(() => {
    if (data.length <= 1) return;

    const timer = setInterval(() => {
      const next = (activeRef.current + 1) % data.length;
      scrollToIndex(next);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [data.length, intervalMs, scrollToIndex]);

  const onMomentumScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const x = e.nativeEvent.contentOffset.x;
      const next = Math.round(x / stride);
      if (next >= 0 && next < data.length) activeRef.current = next;
    },
    [data.length, stride]
  );

  if (data.length === 0) return null;

  return (
    <FlatList
      ref={listRef}
      data={data}
      horizontal
      nestedScrollEnabled
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={stride}
      onMomentumScrollEnd={onMomentumScrollEnd}
      contentContainerStyle={[{ gap: itemGap }, contentContainerStyle]}
      keyExtractor={(item, index) => keyExtractor(item, index)}
      renderItem={({ item, index }) => renderItem(item, index)}
    />
  );
}
