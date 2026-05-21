import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AppColors } from '../../constants/theme';
import { GlassFallback, GlassTints } from '../../constants/glass';
import { Layout } from '../../constants/layout';
import { TrendingPeriod } from '../../types/home';
import LiquidGlass from './LiquidGlass';

type TabOption = {
  id: TrendingPeriod;
  label: string;
};

const TRENDING_TABS: TabOption[] = [
  { id: 'today', label: '🔥 Сегодня' },
  { id: 'week', label: '📈 Неделя' },
  { id: 'month', label: '🏆 Месяц' },
];

interface PeriodFilterTabsProps {
  value: TrendingPeriod;
  onChange: (period: TrendingPeriod) => void;
}

/** «Сегодня / Неделя / Месяц» tab pill */
export default function PeriodFilterTabs({ value, onChange }: PeriodFilterTabsProps) {
  return (
    <View style={styles.container}>
      <LiquidGlass
        style={styles.pill}
        fallbackBackgroundColor={GlassFallback.surface}
        tintColor={GlassTints.surface}
      >
        {TRENDING_TABS.map((tab) => {
          const isActive = value === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.button, isActive && styles.buttonActive]}
              onPress={() => onChange(tab.id)}
              activeOpacity={0.85}
            >
              <Text
                style={[styles.text, isActive && styles.textActive]}
                allowFontScaling={false}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </LiquidGlass>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Layout.horizontalPadding,
    marginTop: 10,
    marginBottom: 16,
  },
  pill: {
    flexDirection: 'row',
    borderRadius: 24,
    overflow: 'hidden',
    padding: 3,
    alignSelf: 'flex-start',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: AppColors.tabActiveBg,
  },
  text: {
    color: AppColors.tabInactiveText,
    fontSize: 13,
    fontWeight: '700',
  },
  textActive: {
    color: AppColors.tabActiveText,
  },
});
