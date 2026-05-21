import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { GlassFallback, GlassTints } from '../../constants/glass';
import { AppColors } from '../../constants/theme';
import LiquidGlass from '../ui/LiquidGlass';
import { heroStyles } from '../../styles/heroBillboard';

const LOGO = require('../../assets/images/logo-k.png');

/** Logo va bildirishnoma tugmasi */
export default function HeroHeader() {
  return (
    <View style={heroStyles.headerRow}>
      <Image source={LOGO} style={heroStyles.logoImg} resizeMode="cover" />
      <TouchableOpacity activeOpacity={0.75}>
        <LiquidGlass
          style={heroStyles.bellBtn}
          fallbackBackgroundColor={GlassFallback.nav}
          tintColor={GlassTints.nav}
          glassEffectStyle="clear"
          isInteractive
        >
          <MaterialCommunityIcons
            name="bell-outline"
            size={22}
            color={AppColors.textPrimary}
          />
        </LiquidGlass>
      </TouchableOpacity>
    </View>
  );
}
