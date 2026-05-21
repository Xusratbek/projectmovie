import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlassFallback, GlassTints } from '../constants/glass';
import LiquidGlass from './ui/LiquidGlass';

const { width: W } = Dimensions.get('window');

const PURPLE = '#8B5CF6';
const NAV_BORDER = 'rgba(255, 255, 255, 0.08)';
const WHITE = '#FFFFFF';
const MUTED = '#8E8E93';

const TAB_CONFIG: Record<
  string,
  { label: string; icon: keyof typeof MaterialCommunityIcons.glyphMap }
> = {
  index: { label: 'Главная', icon: 'home-variant' },
  library: { label: 'Библиотека', icon: 'cards-outline' },
  profile: { label: 'Профиль', icon: 'account-outline' },
};

const VISIBLE_TABS = ['index', 'library', 'profile'];

export default function CustomTabBar({
  state,
  navigation,
}: BottomTabBarProps) {
  const visibleRoutes = state.routes.filter((r) =>
    VISIBLE_TABS.includes(r.name)
  );

  return (
    <View style={styles.wrapper}>
      <LiquidGlass
        style={styles.mainNav}
        fallbackBackgroundColor={GlassFallback.nav}
        tintColor={GlassTints.nav}
        isInteractive
      >
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

          const tabContent = (
            <>
              <MaterialCommunityIcons
                name={config.icon}
                size={22}
                color={isFocused ? PURPLE : WHITE}
              />
              <Text
                style={[styles.tabLabel, isFocused && styles.tabLabelActive]}
              >
                {config.label}
              </Text>
            </>
          );

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabBtn}
              activeOpacity={0.75}
            >
              {isFocused ? (
                <LiquidGlass
                  style={styles.tabBtnActive}
                  fallbackBackgroundColor={GlassFallback.activeTab}
                  tintColor={GlassTints.activeTab}
                >
                  {tabContent}
                </LiquidGlass>
              ) : (
                tabContent
              )}
            </TouchableOpacity>
          );
        })}
      </LiquidGlass>

      <TouchableOpacity
        style={styles.searchBtnOuter}
        onPress={() => navigation.navigate('search')}
        activeOpacity={0.8}
      >
        <LiquidGlass
          style={styles.searchBtn}
          fallbackBackgroundColor={GlassFallback.nav}
          tintColor={GlassTints.nav}
          isInteractive
        >
          <MaterialCommunityIcons name="magnify" size={24} color={WHITE} />
        </LiquidGlass>
      </TouchableOpacity>
    </View>
  );
}

const BAR_H = 64;
const SEARCH_SIZE = 64;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 28,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  mainNav: {
    flex: 1,
    flexDirection: 'row',
    height: BAR_H,
    borderRadius: BAR_H / 2,
    borderWidth: 1,
    borderColor: NAV_BORDER,
    paddingHorizontal: 6,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 20,
    gap: 2,
  },
  tabBtnActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 20,
    gap: 2,
    alignSelf: 'stretch',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: MUTED,
    marginTop: 1,
  },
  tabLabelActive: {
    color: WHITE,
  },
  searchBtnOuter: {
    width: SEARCH_SIZE,
    height: SEARCH_SIZE,
  },
  searchBtn: {
    width: SEARCH_SIZE,
    height: SEARCH_SIZE,
    borderRadius: SEARCH_SIZE / 2,
    borderWidth: 1,
    borderColor: NAV_BORDER,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
