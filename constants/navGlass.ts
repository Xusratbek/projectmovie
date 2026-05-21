/** Pastki tab bar — 1-rasm (mockup) palette */
export const NavGlass = {
  border: 'rgba(255, 255, 255, 0.10)',
  /** Asosiy bar — yengil frosted */
  shell: 'rgba(28, 28, 30, 0.32)',
  shellAndroid: 'rgba(28, 28, 30, 0.48)',
  /** Aktiv tab ichki pill */
  activePill: 'rgba(72, 72, 76, 0.62)',
  activePillAndroid: 'rgba(72, 72, 76, 0.72)',
  activePillBorder: 'rgba(255, 255, 255, 0.08)',
  edgeTop: 'rgba(255, 255, 255, 0.18)',
  edgeLeft: 'rgba(255, 255, 255, 0.10)',
  shadow: '#000000',
} as const;

export const NavMetrics = {
  barHeight: 64,
  searchSize: 64,
  horizontalInset: 16,
  bottomInset: 28,
  gap: 12,
  barPadding: 6,
  activePillRadius: 20,
} as const;

export const NavColors = {
  purple: '#A855F7',
  white: '#FFFFFF',
} as const;
