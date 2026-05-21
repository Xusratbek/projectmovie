import { StyleSheet } from 'react-native';
import { AppColors } from '../constants/theme';
import { Layout } from '../constants/layout';

export const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  scrollContent: {
    paddingBottom: Layout.scrollBottomPadding,
  },
  section: {
    marginTop: Layout.sectionMarginTop,
  },
  horizontalList: {
    paddingHorizontal: Layout.horizontalPadding,
    gap: Layout.listGap,
  },
  recommendedList: {
    paddingHorizontal: Layout.horizontalPadding,
    gap: 10,
  },
});
