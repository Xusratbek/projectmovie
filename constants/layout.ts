import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const Layout = {
  screenWidth: SCREEN_WIDTH,
  horizontalPadding: 16,
  listGap: 12,
  sectionMarginTop: 24,
  scrollBottomPadding: 120,
  moodCardWidth: 250,
  continueCardWidth: SCREEN_WIDTH * 0.35,
  continueSnapInterval: SCREEN_WIDTH * 0.35 + 12,
} as const;
