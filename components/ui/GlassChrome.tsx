import React, { ReactNode } from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { GlassBlur } from '../../constants/glass';
import { NavGlass } from '../../constants/navGlass';
import LiquidGlass, { useLiquidGlass } from './LiquidGlass';

type GlassChromeProps = {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  isInteractive?: boolean;
};

function extractRadius(style: StyleProp<ViewStyle>): number {
  const flat = StyleSheet.flatten(style);
  const r = flat?.borderRadius;
  return typeof r === 'number' ? r : 0;
}

/** Yuqori/chap “shisha” yorug‘ chekka — mockup */
function GlassEdgeHighlight({ radius }: { radius: number }) {
  return (
    <>
      <View
        style={[
          styles.edgeTop,
          { borderTopLeftRadius: radius, borderTopRightRadius: radius },
        ]}
        pointerEvents="none"
      />
      <View
        style={[
          styles.edgeLeft,
          { borderTopLeftRadius: radius, borderBottomLeftRadius: radius },
        ]}
        pointerEvents="none"
      />
    </>
  );
}

/** Pastki nav — mockup pill / circle glass */
export default function GlassChrome({
  style,
  children,
  isInteractive,
}: GlassChromeProps) {
  const radius = extractRadius(style);
  const shellStyle: ViewStyle = {
    borderRadius: radius,
    borderWidth: 1,
    borderTopColor: NavGlass.edgeTop,
    borderLeftColor: NavGlass.edgeLeft,
    borderRightColor: 'rgba(255, 255, 255, 0.04)',
    borderBottomColor: 'rgba(255, 255, 255, 0.03)',
    overflow: 'hidden',
  };

  const useNativeGlass = useLiquidGlass();
  const useIosBlur = Platform.OS === 'ios' && !useNativeGlass;

  return (
    <View style={[styles.shadow, style]}>
      {useNativeGlass ? (
        <LiquidGlass
          style={[styles.fill, shellStyle]}
          tintColor={NavGlass.shell}
          glassEffectStyle="clear"
          isInteractive={isInteractive}
        >
          <GlassEdgeHighlight radius={radius} />
          {children}
        </LiquidGlass>
      ) : useIosBlur ? (
        <View style={[styles.fill, shellStyle]}>
          <BlurView
            intensity={GlassBlur.medium}
            tint="dark"
            style={StyleSheet.absoluteFillObject}
          />
          <View
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: NavGlass.shell },
            ]}
            pointerEvents="none"
          />
          <GlassEdgeHighlight radius={radius} />
          {children}
        </View>
      ) : (
        <View
          style={[
            styles.fill,
            shellStyle,
            { backgroundColor: NavGlass.shellAndroid },
          ]}
        >
          <GlassEdgeHighlight radius={radius} />
          {children}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: NavGlass.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 8,
  },
  fill: {
    flex: 1,
  },
  edgeTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: NavGlass.edgeTop,
  },
  edgeLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 1,
    backgroundColor: NavGlass.edgeLeft,
  },
});
