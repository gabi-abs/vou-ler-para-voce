import React from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import FavoritasList from "@/components/FavoritasList/FavoristasList"; // ajuste para relativo se não usar alias

export default function FavoritasScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <FavoritasList onPressVerHistorias={() => router.push("/(historias)/minhas")} />
    </View>
  );
}
