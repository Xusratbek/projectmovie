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

const { width: W } = Dimensions.get('window');

const PURPLE = '#8B5CF6';
const NAV_BG = 'rgba(28, 28, 30, 0.92)';
const NAV_BORDER = 'rgba(255, 255, 255, 0.08)';
const ACTIVE_PILL = '#3A3A3C';
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
      <View style={styles.mainNav}>
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
              style={[styles.tabBtn, isFocused && styles.tabBtnActive]}
              activeOpacity={0.75}
            >
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
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={styles.searchBtn}
        onPress={() => navigation.navigate('search')}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons name="magnify" size={24} color={WHITE} />
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
    backgroundColor: NAV_BG,
    borderRadius: BAR_H / 2,
    borderWidth: 1,
    borderColor: NAV_BORDER,
    paddingHorizontal: 6,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'space-around',
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
    backgroundColor: ACTIVE_PILL,
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
  searchBtn: {
    width: SEARCH_SIZE,
    height: SEARCH_SIZE,
    borderRadius: SEARCH_SIZE / 2,
    backgroundColor: NAV_BG,
    borderWidth: 1,
    borderColor: NAV_BORDER,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
