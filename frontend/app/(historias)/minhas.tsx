import React, { useState, useRef } from "react";
import { ScrollView, StyleSheet, Text, View, Animated } from "react-native";

import HistoriaItem from "@/components/HistoriaItem/HistoriaItem";
import { useHistorias } from "@/hooks/use-historias";
import { useHistoriasFavoritas } from "@/hooks/use-historia-favorita";
import { useToggleFavoritoHistoria } from "@/hooks/use-toggle-favorito-historia";
import type Historia from "@/interfaces/HistoriaInterface";
import { theme } from "@/themes";

export default function Minhas() {
  const { data: historiaLista, isLoading, error } = useHistorias();
  const { data: favoritas } = useHistoriasFavoritas();
  const { mutate: toggleFavorito, isPending } = useToggleFavoritoHistoria();
  // 🔔 Estado do toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const toastOpacity = useRef(new Animated.Value(0)).current;

  // IDs das favoritas para marcar na lista de "Minhas"
  const favoritasIds = new Set(
    (favoritas ?? []).map((h: Historia) => String(h.id))
  );

  const historiasMarcadas: Historia[] =
    historiaLista?.map((h: any) => ({
      ...h,
      favoritado: favoritasIds.has(String(h.id)),
    })) ?? [];

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);

    Animated.timing(toastOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(toastOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          setToastVisible(false);
        });
      }, 1700);
    });
  };

  const handleToggleFavorito = (h: Historia) => {
    const estavaFavoritado = h.favoritado;

    toggleFavorito(
      { historia: h },
      {
        onSuccess: () => {
          if (estavaFavoritado) {
            showToast("História removida das favoritas.");
          } else {
            showToast("História adicionada às favoritas 💛");
          }
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <Text>Carregando...</Text>
        ) : error ? (
          <Text>Erro ao carregar suas histórias.</Text>
        ) : historiasMarcadas.length === 0 ? (
          <Text>Você ainda não tem histórias cadastradas.</Text>
        ) : (
          historiasMarcadas.map((historia: Historia) => (
            <HistoriaItem
              key={historia.id}
              historia={historia}
              onToggleFavorito={(h) => toggleFavorito({ historia: h })}
            />
          ))
        )}

        {isPending && (
          <Text style={{ marginTop: 10 }}>Atualizando favoritos...</Text>
        )}
      </ScrollView>

      {toastVisible && toastMessage && (
        <Animated.View
          style={[
            styles.toastContainer,
            { opacity: toastOpacity, transform: [{ translateY: toastOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            }) }] },
          ]}
        >
          <Text style={styles.toastText}>{toastMessage}</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    padding: 10,
    minHeight: "100%",
    flex: 1,
  },
  toastContainer: {
    position: "absolute",
    bottom: 24,
    left: 16,
    right: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#4D4388", // roxinho do sistema
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  toastText: {
    color: "#FFF8E2",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "500",
  },
});
