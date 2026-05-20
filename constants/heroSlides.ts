import { Movie } from '../types/movie';

/** Hero karusel — mockup matn va posterlari */
export const HERO_SLIDES: Movie[] = [
  {
    id: 'hero-1',
    title: 'Паранормальное явление',
    description:
      'Мать с дочерью проживают в квартире, которую, как они подозре...',
    poster:
      'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=85&w=800',
    heroCinemaLine: 'В КИНО С 14 МАЯ',
    heroPosterTitleRed: 'ПАРАНОРМАЛЬНОЕ ЯВЛЕНИЕ',
    heroPosterSubtitleWhite: 'СЕУЛ',
    heroPosterMotion: 'ОБНАРУЖЕНО ДВИЖЕНИЕ',
    ratingKinopoisk: 7.9,
    ratingImdb: 8.3,
    year: 2026,
    genre: ['Ужасы'],
    ageLimit: '18',
  },
  {
    id: 'hero-2',
    title: 'Гнев человеческий',
    description:
      'Тихий инвестор мстит за убийство сына. Каждый выстрел — часть плана...',
    poster:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=85&w=800',
    heroCinemaLine: 'В КИНО С 21 МАЯ',
    heroPosterTitleRed: 'ГНЕВ',
    heroPosterSubtitleWhite: 'ЧЕЛОВЕЧЕСКИЙ',
    heroPosterMotion: 'ОТ РЕЖИССЁРА ГАЯ РИЧИ',
    ratingKinopoisk: 8.0,
    ratingImdb: 7.8,
    year: 2026,
    genre: ['Боевик'],
    ageLimit: '18',
  },
  {
    id: 'hero-3',
    title: 'Дюна: Часть вторая',
    description:
      'Пол Атрейдес объединяется с фременами, чтобы изменить судьбу вселенной...',
    poster:
      'https://images.unsplash.com/photo-1440404653325-ab12749adca1?q=85&w=800',
    heroCinemaLine: 'УЖЕ В КИНО',
    heroPosterTitleRed: 'ДЮНА',
    heroPosterSubtitleWhite: 'ЧАСТЬ ВТОРАЯ',
    heroPosterMotion: 'СЕГОДНЯ В IMAX',
    ratingKinopoisk: 8.4,
    ratingImdb: 8.5,
    year: 2024,
    genre: ['Фантастика'],
    ageLimit: '12',
  },
];
