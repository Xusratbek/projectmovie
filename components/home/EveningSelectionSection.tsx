import React from 'react';
import HomeSection from '../ui/HomeSection';
import EveningSelectionCard from '../EveningSelectionCard';

const EVENING_POSTER = require('../../assets/images/final_destination_poster.png');

const noop = () => {};

export default function EveningSelectionSection() {
  return (
    <HomeSection
      title="Идеально под ваш вечер"
      subtitle="Алгоритм подобрал по времени и настроению"
    >
      <EveningSelectionCard
        title="Пункт Назначения"
        subtitle="Ужасы / Триллер"
        ratingKinopoisk={7.9}
        ratingImdb={8.3}
        duration="2ч 15м"
        poster={EVENING_POSTER}
        onPress={noop}
      />
    </HomeSection>
  );
}
