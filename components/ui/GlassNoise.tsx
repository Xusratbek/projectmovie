import React from 'react';
import { StyleSheet, View } from 'react-native';

/** Mood / Quick kartalardagi grain tekstura (mockup) */
export default function GlassNoise() {
  return (
    <View style={styles.noise} pointerEvents="none">
      {NOISE_DOTS.map((dot, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            {
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              opacity: dot.o,
              width: dot.s,
              height: dot.s,
            },
          ]}
        />
      ))}
    </View>
  );
}

const NOISE_DOTS = Array.from({ length: 48 }, (_, i) => ({
  x: (i * 17 + 7) % 100,
  y: (i * 23 + 11) % 100,
  o: 0.04 + (i % 5) * 0.018,
  s: 1 + (i % 3),
}));

const styles = StyleSheet.create({
  noise: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  dot: {
    position: 'absolute',
    borderRadius: 1,
    backgroundColor: '#FFFFFF',
  },
});
