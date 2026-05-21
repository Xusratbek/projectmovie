import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView } from 'react-native';
import HeroBillboard from '../../components/HeroBillboard';
import BecauseYouWatchedSection from '../../components/home/BecauseYouWatchedSection';
import ContinueWatchingSection from '../../components/home/ContinueWatchingSection';
import EveningSelectionSection from '../../components/home/EveningSelectionSection';
import MoodCarouselSection from '../../components/home/MoodCarouselSection';
import PopularAnimeSection from '../../components/home/PopularAnimeSection';
import QuickSelectionsSection from '../../components/home/QuickSelectionsSection';
import RecommendedTodaySection from '../../components/home/RecommendedTodaySection';
import TrendingSection from '../../components/home/TrendingSection';
import { HERO_SLIDES } from '../../constants/heroSlides';
import { homeScreenStyles } from '../../styles/homeScreen';

/** Bosh sahifa — har bir bo‘lim alohida komponentda */
export default function HomeScreen() {
  return (
    <ScrollView
      style={homeScreenStyles.container}
      bounces={false}
      contentContainerStyle={homeScreenStyles.scrollContent}
    >
      <StatusBar style="light" hidden />
      <HeroBillboard movies={HERO_SLIDES} />
      <ContinueWatchingSection />
      <TrendingSection />
      <EveningSelectionSection />
      <MoodCarouselSection />
      <QuickSelectionsSection />
      <BecauseYouWatchedSection />
      <RecommendedTodaySection />
      <PopularAnimeSection />
    </ScrollView>
  );
}
