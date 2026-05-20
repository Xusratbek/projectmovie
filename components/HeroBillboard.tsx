import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ListRenderItem,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Movie } from '../types/movie';

interface HeroBillboardProps {
  movies: Movie[];
}

const { width: W } = Dimensions.get('window');

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
      <Text style={styles.statusTime}>9:41</Text>
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
  const hasArt =
    movie.heroPosterTitleRed ||
    movie.heroPosterSubtitleWhite ||
    movie.heroPosterMotion;

  return (
    <>
      <View style={styles.posterDim} pointerEvents="none" />
      <View style={styles.bannerStrip}>
        <Text style={styles.bannerText}>{cinemaLine}</Text>
      </View>
      {hasArt ? (
        <View style={styles.posterArtBlock} pointerEvents="none">
          {movie.heroPosterTitleRed ? (
            <Text style={styles.posterArtRed} numberOfLines={2}>
              {movie.heroPosterTitleRed}
            </Text>
          ) : null}
          {movie.heroPosterSubtitleWhite ? (
            <Text style={styles.posterArtWhiteLine} numberOfLines={1}>
              {movie.heroPosterSubtitleWhite}
            </Text>
          ) : null}
          {movie.heroPosterMotion ? (
            <Text style={styles.posterArtMotion} numberOfLines={2}>
              {movie.heroPosterMotion}
            </Text>
          ) : null}
        </View>
      ) : null}
    </>
  );
}

function HeroSlide({ movie }: { movie: Movie }) {
  const ageLabel = formatAgeLabel(movie.ageLimit);
  const genre0 = movie.genre?.[0]?.trim();

  return (
    <View style={styles.card}>
      <View style={styles.posterWrapper}>
        <Image
          source={{ uri: movie.poster }}
          style={styles.posterImg}
          resizeMode="cover"
        />
        <PosterOverlay movie={movie} />
      </View>

      <View style={styles.infoCol}>
        <View style={styles.infoTop}>
          <Text style={styles.title} numberOfLines={2}>
            {movie.title}
          </Text>
          {movie.description ? (
            <Text style={styles.desc} numberOfLines={2} ellipsizeMode="tail">
              {movie.description}
            </Text>
          ) : null}
        </View>

        <View style={styles.infoBottom}>
          <View style={styles.ratingRow}>
            {movie.ratingKinopoisk != null ? (
              <View style={styles.ratingItem}>
                <MaterialCommunityIcons
                  name="white-balance-sunny"
                  size={24}
                  color="#FF8A00"
                />
                <Text style={styles.ratingNum}>
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
                  <Text style={styles.imdbText}>IMDb</Text>
                </View>
                <Text style={styles.ratingNum}>
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
    </View>
  );
}

function Tag({ label }: { label: string }) {
  if (!label) return null;
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{label}</Text>
    </View>
  );
}

export default function HeroBillboard({ movies }: HeroBillboardProps) {
  const slides = useMemo(() => movies.filter(Boolean), [movies]);
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<FlatList<Movie>>(null);

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
        <LinearGradient
          colors={['#8B5CF6', '#6366F1', '#3B82F6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.logoBox}
        >
          <Text style={styles.logoText}>K</Text>
        </LinearGradient>

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
const TEXT_MUTED = '#9E9E9E';
const TAG_BG = 'rgba(255,255,255,0.08)';
const TAG_BORDER = 'rgba(255,255,255,0.18)';

const CARD_PAD = 20;
const CARD_GAP = 16;
const POSTER_W = W * 0.46;
const POSTER_H = POSTER_W * 1.52;

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
  logoBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: TEXT_PRIMARY,
    fontSize: 24,
    fontWeight: '800',
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
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  posterImg: {
    width: '100%',
    height: '100%',
  },
  posterDim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(8, 12, 28, 0.35)',
  },
  bannerStrip: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 8,
    alignItems: 'center',
  },
  bannerText: {
    color: TEXT_PRIMARY,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  posterArtBlock: {
    position: 'absolute',
    left: 4,
    right: 4,
    top: '28%',
    alignItems: 'center',
  },
  posterArtRed: {
    color: '#EF4444',
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  posterArtWhiteLine: {
    marginTop: 2,
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  posterArtMotion: {
    marginTop: 10,
    color: '#EF4444',
    fontSize: 9,
    lineHeight: 12,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  infoCol: {
    flex: 1,
    minWidth: 0,
    height: POSTER_H,
    justifyContent: 'space-between',
  },
  infoTop: {
    gap: 10,
    paddingTop: 2,
  },
  infoBottom: {
    gap: 14,
  },
  title: {
    color: TEXT_PRIMARY,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
    letterSpacing: -0.3,
  },
  desc: {
    color: TEXT_MUTED,
    fontSize: 14,
    lineHeight: 20,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingItemGap: {
    marginLeft: 16,
  },
  imdbBadge: {
    backgroundColor: '#F5C518',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  imdbText: {
    color: '#000',
    fontSize: 11,
    fontWeight: '800',
  },
  ratingNum: {
    color: TEXT_PRIMARY,
    fontSize: 18,
    fontWeight: '700',
  },

  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: TAG_BG,
    borderWidth: 1,
    borderColor: TAG_BORDER,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tagText: {
    color: TEXT_PRIMARY,
    fontSize: 14,
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
