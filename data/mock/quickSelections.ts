import { QuickSelection } from '../../types/movie';

export const QUICK_SELECTIONS: QuickSelection[] = [
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
