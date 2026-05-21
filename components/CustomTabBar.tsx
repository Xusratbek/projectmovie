import React from 'react';
import {
  Platform,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavColors, NavGlass, NavMetrics } from '../constants/navGlass';
import GlassChrome from './ui/GlassChrome';

const TAB_CONFIG: Record<
  string,
  { label: string; icon: keyof typeof MaterialCommunityIcons.glyphMap }
> = {
  index: { label: 'Главная', icon: 'home-variant' },
  library: { label: 'Библиотека', icon: 'cards-outline' },
  profile: { label: 'Профиль', icon: 'account-outline' },
};

const VISIBLE_TABS = ['index', 'library', 'profile'];

const {
  barHeight,
  searchSize,
  horizontalInset,
  bottomInset,
  gap,
  barPadding,
  activePillRadius,
} = NavMetrics;

const BAR_RADIUS = barHeight / 2;
const SEARCH_RADIUS = searchSize / 2;

export default function CustomTabBar({
  state,
  navigation,
}: BottomTabBarProps) {
  const visibleRoutes = state.routes.filter((r) =>
    VISIBLE_TABS.includes(r.name)
  );

  const activePillBg =
    Platform.OS === 'android'
      ? NavGlass.activePillAndroid
      : NavGlass.activePill;

  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      <GlassChrome style={styles.mainNav} isInteractive>
        <View style={styles.tabsRow}>
          {visibleRoutes.map((route) => {
            const routeIndex = state.routes.findIndex((r) => r.key === route.key);
            const isFocused = state.index === routeIndex;
            const config = TAB_CONFIG[route.name] ?? {
              label: route.name,
              icon: 'circle-outline' as const,
            };

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={styles.tabSlot}
                activeOpacity={0.75}
              >
                <View
                  style={[
                    styles.tabInner,
                    isFocused && [
                      styles.tabInnerActive,
                      {
                        backgroundColor: activePillBg,
                        borderColor: NavGlass.activePillBorder,
                      },
                    ],
                  ]}
                >
                  <MaterialCommunityIcons
                    name={config.icon}
                    size={22}
                    color={isFocused ? NavColors.purple : NavColors.white}
                  />
                  <Text style={styles.tabLabel} allowFontScaling={false}>
                    {config.label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </GlassChrome>

      <TouchableOpacity
        style={styles.searchBtnOuter}
        onPress={() => navigation.navigate('search')}
        activeOpacity={0.8}
      >
        <GlassChrome style={styles.searchBtn} isInteractive>
          <View style={styles.searchCenter}>
            <MaterialCommunityIcons
              name="magnify"
              size={24}
              color={NavColors.white}
            />
          </View>
        </GlassChrome>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: bottomInset,
    left: horizontalInset,
    right: horizontalInset,
    flexDirection: 'row',
    alignItems: 'center',
    gap,
  },
  mainNav: {
    flex: 1,
    height: barHeight,
    borderRadius: BAR_RADIUS,
  },
  tabsRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: barPadding,
    paddingVertical: barPadding,
  },
  tabSlot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabInner: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: activePillRadius,
    minHeight: 50,
    minWidth: 76,
  },
  tabInnerActive: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 18,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: NavColors.white,
    letterSpacing: 0.15,
  },
  searchBtnOuter: {
    width: searchSize,
    height: searchSize,
  },
  searchBtn: {
    width: searchSize,
    height: searchSize,
    borderRadius: SEARCH_RADIUS,
  },
  searchCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
