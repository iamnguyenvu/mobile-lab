import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="screens/NoteScreen" />
        <Stack.Screen name="screens/ProfileScreen" 
        options={{ headerShown: true, title: 'Profile' }} />
      </Stack>
    </SafeAreaProvider>
  );
}

