import React from 'react';
import { FlatList, ListRenderItem, StyleProp, ViewStyle } from 'react-native';
import { homeScreenStyles } from '../../styles/homeScreen';

interface HorizontalMovieListProps<T> {
  data: T[];
  keyExtractor: (item: T) => string;
  renderItem: ListRenderItem<T>;
  snapToInterval?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

/** Gorizontal poster ro‘yxati (snap ixtiyoriy) */
export default function HorizontalMovieList<T>({
  data,
  keyExtractor,
  renderItem,
  snapToInterval,
  contentContainerStyle,
}: HorizontalMovieListProps<T>) {
  return (
    <FlatList
      data={data}
      horizontal
      nestedScrollEnabled
      showsHorizontalScrollIndicator={false}
      decelerationRate={snapToInterval ? 'fast' : undefined}
      snapToInterval={snapToInterval}
      snapToAlignment={snapToInterval ? 'start' : undefined}
      contentContainerStyle={contentContainerStyle ?? homeScreenStyles.horizontalList}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
}
