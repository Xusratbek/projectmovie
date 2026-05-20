import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export type MoodImageSource = number | { uri: string };

interface MoodSelectionCardProps {
  title: string;
  image?: MoodImageSource;
  /** Rasm bo‘lmasa — 1–2-kartalar uslubida gradient fon */
  gradientColors?: [string, string, ...string[]];
  onPress?: () => void;
}

export default function MoodSelectionCard({
  title,
  image,
  gradientColors,
  onPress,
}: MoodSelectionCardProps) {
  const useGradient = Boolean(gradientColors?.length);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      {useGradient ? (
        <LinearGradient
          colors={gradientColors!}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.fill}
        >
          <View style={[styles.blob, styles.blobA]} />
          <View style={[styles.blob, styles.blobB]} />
        </LinearGradient>
      ) : image ? (
        <Image
          source={typeof image === 'number' ? image : image}
          style={styles.fill}
          resizeMode="cover"
        />
      ) : null}

      {/* Matn PNG ichida bo‘lsa, ustiga yozmaymiz — soyа/ikki marta ko‘rinmasin */}
      {useGradient ? (
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.45)']}
          style={styles.titleGradient}
        >
          <Text style={styles.title} allowFontScaling={false}>
            {title}
          </Text>
        </LinearGradient>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 250,
    height: 154,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#1C1C1E',
  },
  fill: {
    width: '100%',
    height: '100%',
  },
  blob: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.85,
  },
  blobA: {
    width: 120,
    height: 200,
    backgroundColor: 'rgba(255,255,255,0.35)',
    top: -40,
    right: -20,
    transform: [{ rotate: '25deg' }],
  },
  blobB: {
    width: 90,
    height: 160,
    backgroundColor: 'rgba(255,255,255,0.2)',
    bottom: -30,
    left: -10,
    transform: [{ rotate: '-18deg' }],
  },
  titleGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingBottom: 14,
    paddingTop: 32,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
});
