import { Post } from '../types';

export const POSTS: Post[] = [
  {
    id: '1',
    title: 'Начало работы с React Native',
    body: 'Expo позволяет запустить приложение на телефоне за пару минут без настройки нативной среды.',
    author: 'Анна',
    createdAt: '2026-09-28T10:00:00Z',
  },
  {
    id: '2',
    title: 'Хуки в деталях',
    body: 'useState, useEffect и useCallback покрывают большую часть повседневных задач в компонентах.',
    author: 'Игорь',
    createdAt: '2026-09-30T12:30:00Z',
  },
  {
    id: '3',
    title: 'Хранение данных на устройстве',
    body: 'AsyncStorage подходит для небольших данных: настроек, избранного, черновиков.',
    author: 'Олена',
    createdAt: '2026-10-01T08:15:00Z',
  },
  {
    id: '4',
    title: 'Оптимизация списков',
    body: 'FlatList рендерит только видимые элементы, а keyExtractor помогает избежать лишних перерисовок.',
    author: 'Максим',
    createdAt: '2026-10-03T16:45:00Z',
  },
];
