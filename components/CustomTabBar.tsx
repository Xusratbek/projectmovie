import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const { width } = Dimensions.get('window');

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.wrapperContainer}>
      <View style={styles.mainNavBlock}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          
          // Expo Router'dagi modal yoki maxsus sahifalarni tab bar'da ko'rsatmaslik sharti
          if (['_html', '+not-found', 'modal'].includes(route.name)) return null;

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

          let icon = '🏠';
          let label = 'Главная';
          if (route.name === 'explore' || route.name === 'library') { icon = '📚'; label = 'Библиотека'; }
          if (route.name === 'profile') { icon = '👤'; label = 'Профиль'; }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[styles.tabButton, isFocused && styles.activeTabButton]}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabIcon, { color: isFocused ? '#8A3FFC' : '#FFFFFF' }]}>{icon}</Text>
              <Text style={[styles.tabLabel, { color: isFocused ? '#FFFFFF' : '#8E8E93' }]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity 
        style={styles.searchButton} 
        onPress={() => navigation.navigate('search' as any)}
        activeOpacity={0.8}
      >
        <Text style={styles.searchTextIcon}>🔍</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperContainer: {
    position: 'absolute',
    bottom: 28,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    width: width - 32,
    backgroundColor: 'transparent',
  },
  mainNavBlock: {
    flexDirection: 'row',
    backgroundColor: '#151517',
    borderRadius: 30,
    padding: 6,
    flex: 1,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#2C2C2E',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 64,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 22,
  },
  activeTabButton: {
    backgroundColor: '#262629',
  },
  tabIcon: {
    fontSize: 16,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  searchButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#151517',
    borderWidth: 1,
    borderColor: '#2C2C2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchTextIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});