import React from 'react';
import { ScrollView, StyleSheet, View, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HeroBillboard from '../../components/HeroBillboard';
import SectionHeader from '../../components/SectionHeader';
import StandardMovieCard from '../../components/StandardMovieCard';
import WideRowCard from '../../components/WideRowCard';
import QuickSelectionCard from '../../components/QuickSelectionCard';
import { Movie, QuickSelection } from '../../types/movie';
import { HERO_SLIDES } from '../../constants/heroSlides';

const mockContinueMovies: Movie[] = [
  { id: '10', title: 'Пацаны', poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=400', progress: 0.65, seasonEpisode: 'S5 E3', duration: '25м осталось' },
  { id: '11', title: 'Майкл', poster: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?q=80&w=400', progress: 0.85, seasonEpisode: '', duration: '57м осталось' },
];

const mockTrending: Movie[] = [
  { id: '20', title: 'Проект Конец Света', poster: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=400', ratingKinopoisk: 8.2, ratingImdb: 8.3 },
  { id: '21', title: 'Братья Супер Марио', poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400', ratingKinopoisk: 7.1, ratingImdb: 7.0 },
];

const mockSelections: QuickSelection[] = [
  { id: '101', title: 'До 90 минут', icon: '⏱️', backgroundColor: '#1D1E3D' },
  { id: '102', title: 'На один вечер', icon: '🍿', backgroundColor: '#3D1D2A' },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} bounces={false} contentContainerStyle={styles.scrollContent}>
      <StatusBar style="light" hidden />
      <HeroBillboard movies={HERO_SLIDES} />

      {/* Продолжить просмотр */}
      <View style={styles.section}>
        <SectionHeader title="Продолжить просмотр" onPress={() => {}} />
        <FlatList
          data={mockContinueMovies}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <StandardMovieCard movie={item} onPress={() => {}} />
          )}
        />
      </View>

      {/* В тренде */}
      <View style={styles.section}>
        <SectionHeader title="В тренде" subtitle="Что смотрят больше всего" onPress={() => {}} />
        <FlatList
          data={mockTrending}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <StandardMovieCard movie={item} showIndex={index + 1} onPress={() => {}} />
          )}
        />
      </View>

      {/* Быстрые подборки */}
      <View style={styles.section}>
        <SectionHeader title="Быстрые подборки" />
        <FlatList
          data={mockSelections}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <QuickSelectionCard item={item} onPress={() => {}} />
          )}
        />
      </View>

      {/* Рекомендуем на сегодня */}
      <View style={styles.section}>
        <SectionHeader title="Рекомендуем на сегодня" subtitle="Подробно лично для вас" />
        <View style={styles.verticalList}>
          {mockContinueMovies.map((movie) => (
            <WideRowCard 
              key={movie.id} 
              movie={{...movie, reason: 'Похоже на "Пацаны"', genre: ['Психо-триллер'], duration: '2ч 37м'}} 
              onPress={() => {}} 
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    paddingBottom: 120,
  },
  section: {
    marginTop: 24,
  },
  horizontalList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  verticalList: {
    paddingHorizontal: 16,
  },
});