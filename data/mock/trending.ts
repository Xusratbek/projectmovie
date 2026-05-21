import { Movie } from '../../types/movie';
import { TrendingPeriod } from '../../types/home';

export const TRENDING_TODAY: Movie[] = [
  { id: 'today-1', title: 'Проект Конец Света', poster: 'https://image.tmdb.org/t/p/w500/lWVwWRLqpS1OaNg7KT0ZecSW0PK.jpg', ratingKinopoisk: 8.2, ratingImdb: 8.3 },
  { id: 'today-2', title: 'Братья Супер Марио', poster: 'https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg', ratingKinopoisk: 7.1, ratingImdb: 7.0 },
  { id: 'today-3', title: 'Мортал Комбат', poster: 'https://image.tmdb.org/t/p/w500/xGuOF1T3WmPsAcQEQJfnG7Ud9f8.jpg', ratingKinopoisk: 6.0, ratingImdb: 6.1 },
];

export const TRENDING_WEEK: Movie[] = [
  { id: 'week-1', title: 'Дюна: Часть вторая', poster: 'https://image.tmdb.org/t/p/w500/6izwz7rsy95ARzTR3poZ8H6c5pp.jpg', ratingKinopoisk: 8.4, ratingImdb: 8.5 },
  { id: 'week-2', title: 'Оппенгеймер', poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', ratingKinopoisk: 8.2, ratingImdb: 8.4 },
  { id: 'week-3', title: 'Дэдпул и Росомаха', poster: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg', ratingKinopoisk: 7.9, ratingImdb: 8.0 },
  { id: 'week-4', title: 'Человек-паук: Паутина вселенных', poster: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg', ratingKinopoisk: 8.6, ratingImdb: 8.6 },
  { id: 'week-5', title: 'Головоломка 2', poster: 'https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg', ratingKinopoisk: 8.1, ratingImdb: 7.8 },
  { id: 'week-6', title: 'Кунг-фу Панда 4', poster: 'https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg', ratingKinopoisk: 7.4, ratingImdb: 6.7 },
];

export const TRENDING_MONTH: Movie[] = [
  { id: 'month-1', title: 'Аватар: Путь воды', poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg', ratingKinopoisk: 7.9, ratingImdb: 7.6 },
  { id: 'month-2', title: 'Бэтмен', poster: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg', ratingKinopoisk: 7.9, ratingImdb: 7.8 },
  { id: 'month-3', title: 'Интерстеллар', poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', ratingKinopoisk: 8.6, ratingImdb: 8.7 },
];

export function getTrendingMovies(period: TrendingPeriod): Movie[] {
  switch (period) {
    case 'week':
      return TRENDING_WEEK.slice(3, 6);
    case 'month':
      return TRENDING_MONTH;
    default:
      return TRENDING_TODAY;
  }
}

export function getTrendingRank(index: number, period: TrendingPeriod): number {
  if (period === 'week') return index + 4;
  if (period === 'month') return index + 7;
  return index + 1;
}
