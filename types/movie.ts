export interface Movie {
  id: string;
  title: string;
  poster: string | number;
  description?: string;
  /** Hero posterning yuqori qator (masalan «В КИНО С 14 МАЯ») */
  heroCinemaLine?: string;
  /** Hero poster: 1-qator qizil (masalan «ПАРАНОРМАЛЬНОЕ ЯВЛЕНИЕ») */
  heroPosterTitleRed?: string;
  /** Hero poster: 2-qator oq (masalan «СЕУЛ») */
  heroPosterSubtitleWhite?: string;
  /** Hero poster: qizil tagline (masalan «ОБНАРУЖЕНО ДВИЖЕНИЕ») */
  heroPosterMotion?: string;
  ratingKinopoisk?: number;
  ratingImdb?: number;
  year?: number;
  genre?: string[];
  ageLimit?: string;
  duration?: string;
  progress?: number; // 0 dan 1 gacha (Davom ettirish uchun)
  seasonEpisode?: string; // masalan: "S5 E3"
  reason?: string; // Tavsiyalar asosi uchun
}

export interface QuickSelection {
  id: string;
  title: string;
  icon: string;
  backgroundColor?: string;
  gradientColors?: string[];
  /** Ixtiyoriy fon rasmi */
  image?: string | number;
}