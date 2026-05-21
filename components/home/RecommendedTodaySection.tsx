import React from 'react';
import { View } from 'react-native';
import { RECOMMENDED_TODAY_MOVIES } from '../../constants/recommendedToday';
import { homeScreenStyles } from '../../styles/homeScreen';
import HomeSection from '../ui/HomeSection';
import WideRowCard from '../WideRowCard';

const noop = () => {};

export default function RecommendedTodaySection() {
  return (
    <HomeSection
      title="Рекомендуем на сегодня"
      subtitle="Подробно лично для вас"
    >
      <View style={homeScreenStyles.recommendedList}>
        {RECOMMENDED_TODAY_MOVIES.map((movie) => (
          <WideRowCard key={movie.id} movie={movie} onPress={noop} />
        ))}
      </View>
    </HomeSection>
  );
}
