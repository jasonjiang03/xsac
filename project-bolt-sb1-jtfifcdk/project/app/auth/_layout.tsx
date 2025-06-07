import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="email-signup" />
      <Stack.Screen name="profile-setup" />
    </Stack>
  );
}