import React from 'react';
import { QUICK_SELECTIONS } from '../../data/mock/quickSelections';
import HomeSection from '../ui/HomeSection';
import HorizontalMovieList from '../ui/HorizontalMovieList';
import QuickSelectionCard from '../QuickSelectionCard';

const noop = () => {};

export default function QuickSelectionsSection() {
  return (
    <HomeSection title="Быстрые подборки">
      <HorizontalMovieList
        data={QUICK_SELECTIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <QuickSelectionCard item={item} onPress={noop} />
        )}
      />
    </HomeSection>
  );
}
