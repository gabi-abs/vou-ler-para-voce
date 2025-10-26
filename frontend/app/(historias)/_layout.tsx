// app/(historias)/historias/_layout.tsx
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function HistoriasTabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="minhas"
        options={{
          title: "Minhas histórias",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="menu-book" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="favoritas"
        options={{
          title: "Favoritas",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite" color={color} size={size} />
          ),
          headerTitle: "Favoritas",
        }}
      />
    </Tabs>
  );
}
