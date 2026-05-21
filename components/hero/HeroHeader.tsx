import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { AppColors } from '../../constants/theme';
import { heroStyles } from '../../styles/heroBillboard';

const LOGO = require('../../assets/images/logo-k.png');

/** Logo va bildirishnoma tugmasi */
export default function HeroHeader() {
  return (
    <View style={heroStyles.headerRow}>
      <Image source={LOGO} style={heroStyles.logoImg} resizeMode="cover" />
      <TouchableOpacity style={heroStyles.bellBtn} activeOpacity={0.75}>
        <MaterialCommunityIcons
          name="bell-outline"
          size={22}
          color={AppColors.textPrimary}
        />
      </TouchableOpacity>
    </View>
  );
}
