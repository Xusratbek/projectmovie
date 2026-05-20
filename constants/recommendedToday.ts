import { Movie } from '../types/movie';

const REC_WATCHMEN = require('../assets/images/rec-watchmen.png');
const REC_PEACEMAKER = require('../assets/images/rec-peacemaker.png');
const REC_MISFITS = require('../assets/images/rec-misfits.png');

/** «Рекомендуем на сегодня» — mockup bilan 1:1 (3 ta karta) */
export const RECOMMENDED_TODAY_MOVIES: Movie[] = [
  {
    id: 'rec-1',
    title: 'Хранители',
    poster: REC_WATCHMEN,
    reason: "Похожее на 'Пацаны'",
    genre: ['Психо-триллер'],
    duration: '2ч 37м',
  },
  {
    id: 'rec-2',
    title: 'Очень Странные Дела',
    poster: REC_PEACEMAKER,
    reason: "Похожее на 'Хранители'",
    genre: ['Психо-триллер'],
    duration: '2ч 5м',
  },
  {
    id: 'rec-3',
    title: 'Пираты Карибского Моря',
    poster: REC_MISFITS,
    reason: "Похожее на 'Хранители'",
    genre: ['Психо-триллер'],
    duration: '2ч 5м',
  },
];
