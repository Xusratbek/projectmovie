import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';
import { AppColors } from '../../constants/theme';
import { heroStyles } from '../../styles/heroBillboard';

/** Mock status bar (vaqt + ikonlar) */
export default function HeroStatusBar() {
  return (
    <View style={heroStyles.statusBar}>
      <Text style={heroStyles.statusTime} allowFontScaling={false}>
        9:41
      </Text>
      <View style={heroStyles.statusIcons}>
        <MaterialCommunityIcons
          name="signal-cellular-3"
          size={16}
          color={AppColors.textPrimary}
        />
        <MaterialCommunityIcons
          name="wifi"
          size={16}
          color={AppColors.textPrimary}
        />
        <MaterialCommunityIcons
          name="battery"
          size={20}
          color={AppColors.textPrimary}
        />
      </View>
    </View>
  );
}
