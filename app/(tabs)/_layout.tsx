// app/(tabs)/_layout.tsx faylining ichi:
import { Tabs } from 'expo-router';
import CustomTabBar from '../../components/CustomTabBar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      {/* Qolgan tab sahifalaringiz nomi... */}
    </Tabs>
  );
}