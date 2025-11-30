// app/(historias)/historias/_layout.tsx
import Favoritas from "@/assets/svg/favoritas.svg";
import Historias from "@/assets/svg/historias.svg";
import { theme } from "@/themes";
import { Tabs, useNavigation, usePathname } from "expo-router";
import { useEffect } from "react";

export default function HistoriasTabsLayout() {
  const navigation = useNavigation();
  const pathname = usePathname();

  useEffect(() => {
    if (navigation == null) return;

    const isFavoritas = pathname.endsWith("/favoritas");

    if (isFavoritas) {
      navigation.setOptions({
        headerStyle: {
          backgroundColor: "#F9ECFD",
        }
      });
      return;
    }

    navigation.setOptions({
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
    });
  }, [pathname]);

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
