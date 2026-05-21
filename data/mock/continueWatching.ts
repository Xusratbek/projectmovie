import { Movie } from '../../types/movie';

const CONTINUE_MICHAEL = require('../../assets/images/continue-michael.jpg');

export const CONTINUE_WATCHING_MOVIES: Movie[] = [
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
