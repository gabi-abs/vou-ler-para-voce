// app/(historias)/historias/_layout.tsx
import Favoritas from "@/assets/svg/favoritas.svg";
import Historias from "@/assets/svg/historias.svg";
import { Tabs } from "expo-router";

export default function HistoriasTabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="minhas"
        options={{
          title: "Minhas histórias",
          tabBarIcon: ({ color, size }) => (
            <Historias width={size} height={size} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="favoritas"
        options={{
          title: "Favoritas",
          tabBarIcon: ({ color, size }) => (
            <Favoritas width={size} height={size} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
