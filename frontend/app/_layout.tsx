import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AuthProvider } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { theme } from '@/themes';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const unstable_settings = {
  anchor: '(tabs)',
};

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const screenOptions: NativeStackNavigationOptions  = {
      headerShown: true,
      contentStyle: {
        backgroundColor: theme.colors.background,
      },
      statusBarTranslucent: true,
      presentation: "card", 
      headerBackTitle: "Voltar", 
      headerTitle: "",
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
      headerShadowVisible: false,
  }
  
  return (
    <>
      <StatusBar
        style="auto"
        translucent
        backgroundColor="transparent"
      />
      <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={screenOptions}>
            <Stack.Screen name="index" options={{ presentation: 'modal', headerShown: false }} />
            <Stack.Screen name="(historias)"  />
            <Stack.Screen name="gravar/[historiaId]" options={{ headerTitle: 'Histórias' }} />
            <Stack.Screen name="editar/[historiaId]" options={{ headerTitle: 'Histórias' }} />
            <Stack.Screen name="ouvir/[historiaId]" options={{ headerTitle: 'Histórias'}} />
          </Stack>
        </ThemeProvider>
      </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
