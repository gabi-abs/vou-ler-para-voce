import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AuthProvider } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const unstable_settings = {
  anchor: '(tabs)',
};

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{presentation: "card", headerBackTitle: "Voltar", headerTitle: ""}}>
            <Stack.Screen name="index" options={{ presentation: 'modal', headerShown: false }} />
            <Stack.Screen name="(historias)" />
            <Stack.Screen name="gravar/[historiaId]" options={{ headerTitle: 'Histórias' }} />
            <Stack.Screen name="editar/[historiaId]" options={{ headerTitle: 'Histórias' }} />
            <Stack.Screen name="ouvir/[historiaId]" options={{ headerTitle: 'Histórias'}} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
