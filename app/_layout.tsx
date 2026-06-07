import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { Header } from '@/components/header';
import { Carousel } from '@/components/carousel';
import { Navbar } from '@/components/navbar';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#8e5582' }} edges={['top']}>
        <Header />
        <Carousel />
        <Navbar />
        <View style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? '#121212' : '#ffffff' }}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="e-service" options={{ headerShown: false }} />
            <Stack.Screen name="holding-application" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
        </View>
      </SafeAreaView>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}

