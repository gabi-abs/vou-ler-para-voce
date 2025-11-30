import React, { useRef, useState } from "react";
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";

import { historiaService } from "@/api/historiaService";
import HistoriaItem from "@/components/HistoriaItem/HistoriaItem";
import { useDialog } from "@/context/DialogContext";
import { useHistoriasFavoritas } from "@/hooks/use-historia-favorita";
import { useHistorias } from "@/hooks/use-historias";
import { useToggleFavoritoHistoria } from "@/hooks/use-toggle-favorito-historia";
import type Historia from "@/interfaces/HistoriaInterface";
import { theme } from "@/themes";

export default function Minhas() {
  const { data: historiaLista, isLoading, error, refetch } = useHistorias();
  const { data: favoritas } = useHistoriasFavoritas();
  const [isDeleting, setIsDeleting] = useState(false);
  const { abrirDialog, fecharDialog } = useDialog();

  // usando mutateAsync pra controlar certinho o fluxo → igual Favoritas
  const { mutateAsync: toggleFavorito, isPending } = useToggleFavoritoHistoria();

  // monta set com ids favoritas pra marcar as Minhas
  const favoritasIds = new Set(
    (favoritas ?? []).map((h: Historia) => String(h.id))
  );

  const historiasMarcadas: Historia[] =
    historiaLista?.map((h: any) => ({
      ...h,
      favoritado: favoritasIds.has(String(h.id)),
    })) ?? [];

  // 🔔 Toast local
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const toastOpacity = useRef(new Animated.Value(0)).current;

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

  const handleToggleFavorito = async (h: Historia) => {
    const estavaFavoritado = h.favoritado;

    try {
      await toggleFavorito({ historia: h });

      if (estavaFavoritado) {
        showToast("História removida das favoritas.");
      } else {
        showToast("História adicionada às favoritas 💛");
      }
    } catch (e: any) {
      console.log("Erro ao favoritar/desfavoritar (Minhas):", e?.message ?? e);
      showToast("Não foi possível atualizar favorito.");
    }
  };

  const handleDelete = async (h: Historia) => {
    abrirDialog({
      title: "Excluir História",
      message: `Tem certeza que deseja excluir "${h.titulo}"? Esta ação não pode ser desfeita.`,
      confirmText: "Excluir",
      cancelText: "Cancelar",
      onConfirm: async () => {
            try {
              setIsDeleting(true);
              await historiaService.deletar(h.id);
              showToast("História excluída com sucesso!");
              // Recarrega a lista de histórias
              refetch();
            } catch (error: any) {
              console.error("Erro ao excluir história:", error);
              abrirDialog({
                title: "Erro",
                message: error?.response?.data?.message || "Não foi possível excluir a história.",
                confirmText: "Confirmar",
                onConfirm: () => {
                  fecharDialog();
                },
              });
            } finally {
              setIsDeleting(false);
            }
          }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listaContent}
      >
        {isLoading ? (
          <Text>Carregando...</Text>
        ) : error ? (
          <Text>Erro ao carregar suas histórias.</Text>
        ) : historiasMarcadas.length === 0 ? (
          <Text>Você ainda não tem histórias cadastradas.</Text>
        ) : (
          historiasMarcadas.map((historia) => (
            <HistoriaItem
              key={historia.id}
              historia={historia}
              onToggleFavorito={(h) => toggleFavorito({ historia: h })}
              onDelete={handleDelete}
            />
          ))
        )}

        {(isPending || isDeleting) && (
          <Text style={{ marginTop: 10 }}>
            {isDeleting ? "Excluindo história..." : "Atualizando favoritos..."}
          </Text>
        )}
      </ScrollView>

      {toastVisible && toastMessage && (
        <Animated.View
          style={[
            styles.toastContainer,
            {
              opacity: toastOpacity,
              transform: [
                {
                  translateY: toastOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
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
  listaContent: {
    paddingBottom: 16,
  },
  toastContainer: {
    position: "absolute",
    bottom: 24,
    left: 16,
    right: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#4D4388",
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
