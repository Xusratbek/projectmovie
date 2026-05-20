import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AutoScrollCarousel from '../../components/AutoScrollCarousel';
import HeroBillboard from '../../components/HeroBillboard';
import QuickSelectionCard from '../../components/QuickSelectionCard';
import SectionHeader from '../../components/SectionHeader';
import StandardMovieCard from '../../components/StandardMovieCard';
import WideRowCard from '../../components/WideRowCard';
import EveningSelectionCard from '../../components/EveningSelectionCard';
import MoodSelectionCard, { MoodImageSource } from '../../components/MoodSelectionCard';
import AnimePosterCard from '../../components/AnimePosterCard';
import { HERO_SLIDES } from '../../constants/heroSlides';
import { RECOMMENDED_TODAY_MOVIES } from '../../constants/recommendedToday';
import { Movie, QuickSelection } from '../../types/movie';

const { width: SCREEN_W } = Dimensions.get('window');
const MOOD_CARD_W = 250;
const CONTINUE_CARD_W = SCREEN_W * 0.35;
const CONTINUE_SNAP = CONTINUE_CARD_W + 12;

type MoodItem = {
  id: string;
  title: string;
  image?: MoodImageSource;
  gradientColors?: [string, string, ...string[]];
};

const mockMoods: MoodItem[] = [
  {
    id: '1',
    title: 'Веселье',
    image: require('../../assets/images/mood_fun.png'),
  },
  {
    id: '2',
    title: 'Нежность',
    image: require('../../assets/images/mood_tenderness.png'),
  },
  {
    id: '3',
    title: 'Мечты',
    gradientColors: ['#93C5FD', '#3B82F6', '#1D4ED8'],
  },
  {
    id: '4',
    title: 'Энергия',
    gradientColors: ['#FDE68A', '#F97316', '#EA580C'],
  },
  {
    id: '5',
    title: 'Спокойствие',
    gradientColors: ['#DDD6FE', '#A78BFA', '#7C3AED'],
  },
];

const mockBecauseYouWatched: Movie[] = [
  {
    id: 'watched-1',
    title: 'Хранители',
    poster: 'https://image.tmdb.org/t/p/w500/5VYqB2T9L0WetvN9Bxk3Wg4vKoJ.jpg',
  },
  {
    id: 'watched-4',
    title: 'Отряд самоубийц',
    poster: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
  },
  {
    id: 'watched-5',
    title: 'Непобедимый',
    poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
  },
  {
    id: 'watched-6',
    title: 'Шазам!',
    poster: 'https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg',
  },
];

const mockPopularAnime: Movie[] = [
  {
    id: 'anime-1',
    title: 'Ёко из Сэнгоку',
    poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
  },
  {
    id: 'anime-2',
    title: 'Детектив Конан',
    poster: 'https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg',
  },
  {
    id: 'anime-3',
    title: 'Синие волки Мибу',
    poster: 'https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg',
  },
];

const CONTINUE_MICHAEL = require('../../assets/images/continue-michael.jpg');

const mockContinueMovies: Movie[] = [
  {
    id: '10',
    title: 'Пацаны',
    poster:
      'https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=500',
    progress: 0.55,
    seasonEpisode: 'S5 E3',
    duration: '25м осталось',
  },
  {
    id: '11',
    title: 'Майкл',
    poster: CONTINUE_MICHAEL,
    progress: 0.9,
    duration: '57м осталось',
  },
  {
    id: '12',
    title: 'Интерстеллар',
    poster:
      'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    progress: 0.3,
    duration: '42м осталось',
  },
];
const mockTrendingToday: Movie[] = [
  { id: 'today-1', title: 'Проект Конец Света', poster: 'https://image.tmdb.org/t/p/w500/lWVwWRLqpS1OaNg7KT0ZecSW0PK.jpg', ratingKinopoisk: 8.2, ratingImdb: 8.3 },
  { id: 'today-2', title: 'Братья Супер Марио', poster: 'https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg', ratingKinopoisk: 7.1, ratingImdb: 7.0 },
  { id: 'today-3', title: 'Мортал Комбат', poster: 'https://image.tmdb.org/t/p/w500/xGuOF1T3WmPsAcQEQJfnG7Ud9f8.jpg', ratingKinopoisk: 6.0, ratingImdb: 6.1 },
];
const mockTrendingWeek: Movie[] = [
  { id: 'week-1', title: 'Дюна: Часть вторая', poster: 'https://image.tmdb.org/t/p/w500/6izwz7rsy95ARzTR3poZ8H6c5pp.jpg', ratingKinopoisk: 8.4, ratingImdb: 8.5 },
  { id: 'week-2', title: 'Оппенгеймер', poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', ratingKinopoisk: 8.2, ratingImdb: 8.4 },
  { id: 'week-3', title: 'Дэдпул и Росомаха', poster: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg', ratingKinopoisk: 7.9, ratingImdb: 8.0 },
  { id: 'week-4', title: 'Человек-паук: Паутина вселенных', poster: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg', ratingKinopoisk: 8.6, ratingImdb: 8.6 },
  { id: 'week-5', title: 'Головоломка 2', poster: 'https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg', ratingKinopoisk: 8.1, ratingImdb: 7.8 },
  { id: 'week-6', title: 'Кунг-фу Панда 4', poster: 'https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg', ratingKinopoisk: 7.4, ratingImdb: 6.7 },
];
const mockTrendingMonth: Movie[] = [
  { id: 'month-1', title: 'Аватар: Путь воды', poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg', ratingKinopoisk: 7.9, ratingImdb: 7.6 },
  { id: 'month-2', title: 'Бэтмен', poster: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg', ratingKinopoisk: 7.9, ratingImdb: 7.8 },
  { id: 'month-3', title: 'Интерстеллар', poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', ratingKinopoisk: 8.6, ratingImdb: 8.7 },
];
const mockSelections: QuickSelection[] = [
  { id: '101', title: 'До 90 минут', icon: 'timer-outline', gradientColors: ['#1A1C62', '#0E0F37'] },
  { id: '102', title: 'На один вечер', icon: 'popcorn', gradientColors: ['#4B1736', '#260B1B'] },
  { id: '103', title: 'Короткие серии', icon: 'television-play', gradientColors: ['#0E3339', '#071A1D'] },
  {
    id: '104',
    title: 'Семейный вечер',
    icon: 'account-group-outline',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600',
    gradientColors: ['#2A1F4E', '#151028'],
  },
  {
    id: '105',
    title: 'Ночной ужас',
    icon: 'ghost-outline',
    image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=600',
    gradientColors: ['#3D1020', '#1A0810'],
  },
];

function getTrendingRank(index: number, period: 'today' | 'week' | 'month'): number {
  if (period === 'week') return index + 4;
  if (period === 'month') return index + 7;
  return index + 1;
}

export default function HomeScreen() {
  const [trendingPeriod, setTrendingPeriod] = useState<'today' | 'week' | 'month'>('today');

  const trendingData = useMemo(() => {
    switch (trendingPeriod) {
      case 'week':
        return mockTrendingWeek.slice(3, 6);
      case 'month':
        return mockTrendingMonth;
      default:
        return mockTrendingToday;
    }
  }, [trendingPeriod]);
  return (
    <ScrollView style={styles.container} bounces={false} contentContainerStyle={styles.scrollContent}>
      <StatusBar style="light" hidden />
      <HeroBillboard movies={HERO_SLIDES} />
      {/* Продолжить просмотр */}
      <View style={styles.section}>
        <SectionHeader
          title="Продолжить просмотр"
          subtitle="Закончите начатое"
          onPress={() => {}}
        />
        <FlatList
          data={mockContinueMovies}
          horizontal
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={CONTINUE_SNAP}
          snapToAlignment="start"
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
        
        {/* Tab Selector */}
        <View style={styles.tabContainer}>
          <View style={styles.tabPill}>
            <TouchableOpacity 
              style={[styles.tabButton, trendingPeriod === 'today' && styles.tabButtonActive]}
              onPress={() => setTrendingPeriod('today')}
              activeOpacity={0.85}
            >
              <Text style={[styles.tabText, trendingPeriod === 'today' && styles.tabTextActive]} allowFontScaling={false}>
                🔥 Сегодня
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tabButton, trendingPeriod === 'week' && styles.tabButtonActive]}
              onPress={() => setTrendingPeriod('week')}
              activeOpacity={0.85}
            >
              <Text style={[styles.tabText, trendingPeriod === 'week' && styles.tabTextActive]} allowFontScaling={false}>
                📈 Неделя
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tabButton, trendingPeriod === 'month' && styles.tabButtonActive]}
              onPress={() => setTrendingPeriod('month')}
              activeOpacity={0.85}
            >
              <Text style={[styles.tabText, trendingPeriod === 'month' && styles.tabTextActive]} allowFontScaling={false}>
                🏆 Месяц
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* 🛠️ TUZATISH: data qismiga to'g'ridan-to'g'ri funksiyani beramiz */}
        <FlatList
          data={trendingData}
          horizontal
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <StandardMovieCard
              movie={item}
              showIndex={getTrendingRank(index, trendingPeriod)}
              onPress={() => {}}
            />
          )}
        />
      </View>
      {/* Идеально под ваш вечер */}
      <View style={styles.section}>
        <SectionHeader title="Идеально под ваш вечер" subtitle="Алгоритм подобрал по времени и настроению" />
        <EveningSelectionCard
          title="Пункт Назначения"
          subtitle="Ужасы / Триллер"
          ratingKinopoisk={7.9}
          ratingImdb={8.3}
          duration="2ч 15м"
          poster={require('../../assets/images/final_destination_poster.png')}
          onPress={() => {}}
        />
      </View>

      {/* С каким настроением? */}
      <View style={styles.section}>
        <SectionHeader title="С каким настроением?" subtitle="Подберем по эмоции" />
        <AutoScrollCarousel
          data={mockMoods}
          itemWidth={MOOD_CARD_W}
          intervalMs={4000}
          contentContainerStyle={styles.horizontalList}
          keyExtractor={(item) => item.id}
          renderItem={(item) => (
            <MoodSelectionCard
              title={item.title}
              image={item.image}
              gradientColors={item.gradientColors}
              onPress={() => {}}
            />
          )}
        />
      </View>

      {/* Быстрые подборки */}
      <View style={styles.section}>
        <SectionHeader title="Быстрые подборки" />
        <FlatList
          data={mockSelections}
          horizontal
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <QuickSelectionCard item={item} onPress={() => {}} />
          )}
        />
      </View>

      {/* Потому что вы смотрели «Пацаны» */}
      <View style={styles.section}>
        <SectionHeader title="Потому что вы смотрели «Пацаны»" onPress={() => {}} />
        <FlatList
          data={mockBecauseYouWatched}
          horizontal
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <StandardMovieCard movie={item} onPress={() => {}} />
          )}
        />
      </View>

      {/* Рекомендуем на сегодня */}
      <View style={styles.section}>
        <SectionHeader title="Рекомендуем на сегодня" subtitle="Подробно лично для вас" />
        <View style={styles.recommendedList}>
          {RECOMMENDED_TODAY_MOVIES.map((item) => (
            <WideRowCard key={item.id} movie={item} onPress={() => {}} />
          ))}
        </View>
      </View>

      {/* Популярное аниме */}
      <View style={styles.section}>
        <SectionHeader title="Популярное аниме" subtitle="Закончите начатое" onPress={() => {}} />
        <FlatList
          data={mockPopularAnime}
          horizontal
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AnimePosterCard movie={item} onPress={() => {}} />
          )}
        />
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
  recommendedList: {
    paddingHorizontal: 16,
    gap: 10,
  },
  tabContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 16,
  },
  tabPill: {
    flexDirection: 'row',
    backgroundColor: '#1C1C1E',
    borderRadius: 24,
    padding: 3,
    alignSelf: 'flex-start',
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    color: '#9BA1A6',
    fontSize: 13,
    fontWeight: '700',
  },
  tabTextActive: {
    color: '#121212',
  },
});