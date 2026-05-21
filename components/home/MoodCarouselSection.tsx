import React from 'react';
import { MOOD_ITEMS } from '../../data/mock/moods';
import { Layout } from '../../constants/layout';
import { homeScreenStyles } from '../../styles/homeScreen';
import HomeSection from '../ui/HomeSection';
import AutoScrollCarousel from '../AutoScrollCarousel';
import MoodSelectionCard from '../MoodSelectionCard';

const noop = () => {};

export default function MoodCarouselSection() {
  return (
    <HomeSection title="С каким настроением?" subtitle="Подберем по эмоции">
      <AutoScrollCarousel
        data={MOOD_ITEMS}
        itemWidth={Layout.moodCardWidth}
        intervalMs={4000}
        contentContainerStyle={homeScreenStyles.horizontalList}
        keyExtractor={(item) => item.id}
        renderItem={(item) => (
          <MoodSelectionCard
            title={item.title}
            image={item.image}
            gradientColors={item.gradientColors}
            onPress={noop}
          />
        )}
      />
    </HomeSection>
  );
}
