import { Stack } from "expo-router";

export default function HistoriaLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="gravar" 
        options={{ 
          title: "Gravar História",
          presentation: 'card',
        }} 
      />
      <Stack.Screen 
        name="ouvir" 
        options={{ 
          title: "Ouvir História",
          presentation: 'card',
        }} 
      />
    </Stack>
  );
}