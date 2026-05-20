import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Movie } from '../types/movie';

const LOGO = require('../assets/images/logo-k.png');

interface HeroBillboardProps {
  movies: Movie[];
}

const { width: W } = Dimensions.get('window');

function posterSource(movie: Movie): ImageSourcePropType {
  return typeof movie.poster === 'number'
    ? movie.poster
    : { uri: movie.poster };
}

function isBakedPoster(movie: Movie): boolean {
  return typeof movie.poster === 'number';
}

function formatRating(value: number | undefined): string {
  if (value === undefined || Number.isNaN(value)) return '—';
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function formatAgeLabel(age: string | undefined): string {
  if (!age) return '';
  const t = age.trim();
  if (t.endsWith('+')) return t;
  if (/^\d+$/.test(t)) return `${t}+`;
  return t;
}

function StatusBarMock() {
  return (
    <View style={styles.statusBar}>
      <Text style={styles.statusTime} allowFontScaling={false}>9:41</Text>
      <View style={styles.statusIcons}>
        <MaterialCommunityIcons
          name="signal-cellular-3"
          size={16}
          color={TEXT_PRIMARY}
        />
        <MaterialCommunityIcons name="wifi" size={16} color={TEXT_PRIMARY} />
        <MaterialCommunityIcons
          name="battery"
          size={20}
          color={TEXT_PRIMARY}
        />
      </View>
    </View>
  );
}

function PosterOverlay({ movie }: { movie: Movie }) {
  const cinemaLine = movie.heroCinemaLine ?? 'В КИНО С 14 МАЯ';
  const ageLabel = formatAgeLabel(movie.ageLimit);
  const hasArt =
    movie.heroPosterTitleRed ||
    movie.heroPosterSubtitleWhite ||
    movie.heroPosterMotion;

  return (
    <>
      <View style={styles.posterDim} pointerEvents="none" />
      <View style={styles.bannerStrip}>
        <Text style={styles.bannerText} allowFontScaling={false}>{cinemaLine}</Text>
      </View>
      {hasArt ? (
        <View style={styles.posterArtBlock} pointerEvents="none">
          {movie.heroPosterTitleRed ? (
            <Text style={styles.posterArtRed} numberOfLines={2} allowFontScaling={false}>
              {movie.heroPosterTitleRed}
            </Text>
          ) : null}
          {movie.heroPosterSubtitleWhite ? (
            <Text style={styles.posterArtWhiteLine} numberOfLines={1} allowFontScaling={false}>
              {movie.heroPosterSubtitleWhite}
            </Text>
          ) : null}
          {movie.heroPosterMotion ? (
            <Text style={styles.posterArtMotion} numberOfLines={2} allowFontScaling={false}>
              {movie.heroPosterMotion}
            </Text>
          ) : null}
        </View>
      ) : null}
      {ageLabel ? (
        <View style={styles.posterAgeBadge}>
          <Text style={styles.posterAgeText} allowFontScaling={false}>{ageLabel}</Text>
        </View>
      ) : null}
    </>
  );
}

function HeroSlide({ movie }: { movie: Movie }) {
  const ageLabel = formatAgeLabel(movie.ageLimit);
  const genre0 = movie.genre?.[0]?.trim();
  const baked = isBakedPoster(movie);

  return (
    <View style={styles.card}>
      <View style={styles.posterWrapper}>
        <Image
          source={posterSource(movie)}
          style={styles.posterImg}
          resizeMode="cover"
        />
        {!baked ? <PosterOverlay movie={movie} /> : null}
      </View>

      <View style={styles.infoCol}>
        <Text style={styles.title} numberOfLines={2} allowFontScaling={false}>
          {movie.title.replace(/\\n/g, '\n')}
        </Text>

        {movie.description ? (
          <Text style={styles.desc} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>
            {movie.description}
          </Text>
        ) : null}

        <View style={styles.ratingRow}>
          {movie.ratingKinopoisk != null ? (
            <View style={styles.ratingItem}>
              <View style={styles.kpIconWrap}>
                <MaterialCommunityIcons
                  name="white-balance-sunny"
                  size={12}
                  color="#FF8A00"
                />
              </View>
              <Text style={styles.ratingNum} allowFontScaling={false}>
                {formatRating(movie.ratingKinopoisk)}
              </Text>
            </View>
          ) : null}

          {movie.ratingImdb != null ? (
            <View
              style={[
                styles.ratingItem,
                movie.ratingKinopoisk != null && styles.ratingItemGap,
              ]}
            >
              <View style={styles.imdbBadge}>
                <Text style={styles.imdbText} allowFontScaling={false}>IMDb</Text>
              </View>
              <Text style={styles.ratingNum} allowFontScaling={false}>
                {formatRating(movie.ratingImdb)}
              </Text>
            </View>
          ) : null}
        </View>

        <View style={styles.tagRow}>
          {movie.year != null ? <Tag label={String(movie.year)} /> : null}
          {genre0 ? <Tag label={genre0} /> : null}
          {ageLabel ? <Tag label={ageLabel} /> : null}
        </View>
      </View>
    </View>
  );
}

function Tag({ label }: { label: string }) {
  if (!label) return null;
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText} allowFontScaling={false}>{label}</Text>
    </View>
  );
}

export default function HeroBillboard({ movies }: HeroBillboardProps) {
  const slides = useMemo(() => movies.filter(Boolean), [movies]);
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<FlatList<Movie>>(null);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % slides.length;
      listRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIndex, slides.length]);

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const x = e.nativeEvent.contentOffset.x;
      const next = Math.round(x / W);
      if (next >= 0 && next < slides.length) setActiveIndex(next);
    },
    [slides.length]
  );

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
    listRef.current?.scrollToOffset({ offset: index * W, animated: true });
  }, []);

  const renderSlide: ListRenderItem<Movie> = useCallback(
    ({ item }) => (
      <View style={styles.slidePage}>
        <HeroSlide movie={item} />
      </View>
    ),
    []
  );

  if (slides.length === 0) return null;

  return (
    <View style={styles.container}>
      <StatusBarMock />

      <View style={styles.headerRow}>
        <Image source={LOGO} style={styles.logoImg} resizeMode="cover" />

        <TouchableOpacity style={styles.bellBtn} activeOpacity={0.75}>
          <MaterialCommunityIcons
            name="bell-outline"
            size={22}
            color={TEXT_PRIMARY}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        ref={listRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        bounces={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={renderSlide}
        getItemLayout={(_, index) => ({
          length: W,
          offset: W * index,
          index,
        })}
      />

      <View style={styles.dotsRow}>
        {slides.map((_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => goToSlide(i)}
            activeOpacity={0.8}
            hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}
          >
            <View style={[styles.dot, i === activeIndex && styles.dotActive]} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const BG = '#121212';
const TEXT_PRIMARY = '#FFFFFF';
const TEXT_MUTED = '#9BA1A6';
const TAG_BG = '#2B2E33';

const CARD_PAD = 20;
const CARD_GAP = 22;
const POSTER_W = W * 0.32;
/** Mockup: poster balandligi qisqaroq (~2:3 atrofida) */
const POSTER_H = POSTER_W * 1.36;
const POSTER_SCALE = POSTER_W / 140;
const INFO_TOP_OFFSET = POSTER_H * 0.42;

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG,
    paddingBottom: 12,
  },

  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: CARD_PAD,
    paddingTop: 12,
    paddingBottom: 4,
  },
  statusTime: {
    color: TEXT_PRIMARY,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: CARD_PAD,
    paddingTop: 10,
    paddingBottom: 20,
  },
  logoImg: {
    width: 80,
    height: 80,
    borderRadius: 14,
  },
  bellBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  slidePage: {
    width: W,
  },
  card: {
    flexDirection: 'row',
    paddingHorizontal: CARD_PAD,
    gap: CARD_GAP,
    alignItems: 'flex-start',
  },

  posterWrapper: {
    width: POSTER_W,
    height: POSTER_H,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  posterImg: {
    width: '100%',
    height: '100%',
  },
  posterDim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(12, 22, 48, 0.38)',
  },
  bannerStrip: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingVertical: 6,
    alignItems: 'center',
  },
  bannerText: {
    color: TEXT_PRIMARY,
    fontSize: 9 * POSTER_SCALE,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  posterArtBlock: {
    position: 'absolute',
    left: 2,
    right: 2,
    top: '27%',
    alignItems: 'center',
  },
  posterArtRed: {
    color: '#DC2626',
    fontSize: 8 * POSTER_SCALE,
    lineHeight: 10.5 * POSTER_SCALE,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.15,
    textTransform: 'uppercase',
  },
  posterArtWhiteLine: {
    marginTop: 4,
    color: '#FFFFFF',
    fontSize: 11 * POSTER_SCALE,
    lineHeight: 13 * POSTER_SCALE,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  posterArtMotion: {
    marginTop: 10,
    color: '#DC2626',
    fontSize: 7 * POSTER_SCALE,
    lineHeight: 9 * POSTER_SCALE,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.25,
    textTransform: 'uppercase',
  },
  posterAgeBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  posterAgeText: {
    color: TEXT_PRIMARY,
    fontSize: 9 * POSTER_SCALE,
    fontWeight: '700',
  },

  infoCol: {
    flex: 1,
    minWidth: 0,
    height: POSTER_H,
    justifyContent: 'flex-start',
    paddingTop: INFO_TOP_OFFSET,
  },
  title: {
    color: TEXT_PRIMARY,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 25,
    letterSpacing: -0.1,
  },
  desc: {
    marginTop: 4,
    color: TEXT_MUTED,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  ratingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingItemGap: {
    marginLeft: 12,
  },
  kpIconWrap: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0D0D0D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imdbBadge: {
    backgroundColor: '#F5C518',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imdbText: {
    color: '#000',
    fontSize: 9,
    fontWeight: '800',
    lineHeight: 11,
  },
  ratingNum: {
    color: TEXT_PRIMARY,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 18,
  },

  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
  },
  tag: {
    backgroundColor: TAG_BG,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  tagText: {
    color: TEXT_PRIMARY,
    fontSize: 13,
    fontWeight: '500',
  },

  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 22,
    paddingBottom: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  dotActive: {
    width: 28,
    height: 8,
    borderRadius: 4,
    backgroundColor: TEXT_PRIMARY,
  },
});


