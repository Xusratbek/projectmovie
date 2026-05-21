import { MoodImageSource } from '../../components/MoodSelectionCard';

export type MoodItem = {
  id: string;
  title: string;
  image?: MoodImageSource;
  gradientColors?: [string, string, ...string[]];
};

export const MOOD_ITEMS: MoodItem[] = [
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
