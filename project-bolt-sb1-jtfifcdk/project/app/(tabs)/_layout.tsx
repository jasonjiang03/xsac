import { Tabs } from 'expo-router';
import { Chrome as Home, Folder, Grid3x3, User, Camera } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 84,
          paddingBottom: 20,
          paddingTop: 12,
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#4CAF50',
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="folder"
        options={{
          title: 'Folder',
          tabBarIcon: ({ size, color }) => (
            <Folder size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="layplan"
        options={{
          title: 'Layplan',
          tabBarIcon: ({ size, color }) => (
            <Grid3x3 size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Me',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          href: null, // Hide from tab bar
        }}
      />
    </Tabs>
  );
}