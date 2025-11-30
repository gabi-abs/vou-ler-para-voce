import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import FormatoDeCoracao from "@/assets/svg/formato-de-coracao.svg";
import HistoriaItem from "@/components/HistoriaItem/HistoriaItem";
import { useHistoriasFavoritas } from "@/hooks/use-historia-favorita";
import { useToggleFavoritoHistoria } from "@/hooks/use-toggle-favorito-historia";
import type Historia from "@/interfaces/HistoriaInterface";

export default function Favoritas() {
  const router = useRouter();

  const { data: favoritas, isLoading, error, isFetching } =
    useHistoriasFavoritas();

  // 👇 usa mutateAsync pra controlar o fluxo e saber hora exata de exibir toast
  const { mutateAsync: toggleFavorito, isPending } = useToggleFavoritoHistoria();

  const hasFavoritas = !!favoritas && favoritas.length > 0;
  const erro = error ? "Não foi possível carregar suas favoritas." : null;

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

  const handleVerHistorias = () => {
    router.push("/(historias)/minhas" as any);
  };

  // 🔁 AGORA COM TOAST GARANTIDO
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
      console.log("Erro ao favoritar/desfavoritar:", e?.message ?? e);
      showToast("Não foi possível atualizar favorito.");
    }
  };

  if (isLoading && !hasFavoritas) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.text}>Carregando suas histórias favoritas…</Text>
      </View>
    );
  }

  if (!hasFavoritas) {
    return (
      <View style={styles.containerEmpty}>
        <Text style={styles.title}>Favoritas</Text>
        <FormatoDeCoracao
          style={styles.icon}
          width={335}
          height={280}
          color={"#EDB638"}
        />
        {erro ? <Text style={styles.erro}>{erro}</Text> : null}
        <Text style={styles.text2}>Nenhuma história favoritada</Text>
        <Pressable style={styles.botaoVerHistorias} onPress={handleVerHistorias}>
          <Text style={styles.textoBotaoVerHistorias}>Ver Histórias</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.containerLista}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listaContent}
      >
        {favoritas?.map((historia: Historia) => (
          <HistoriaItem
            key={historia.id}
            historia={historia}
            onToggleFavorito={handleToggleFavorito}
          />
        ))}

        {(isFetching || isPending) && (
          <Text style={{ marginTop: 10, textAlign: "center" }}>
            Atualizando favoritos…
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
  containerEmpty: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F9ECFD",
    justifyContent: "center",
  },
  containerLista: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F9ECFD",
  },
  title: {
    fontSize: 40,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
    color: "#D87443",
  },
  text: {
    fontSize: 17.5,
    color: "#4E504F",
    textAlign: "center",
  },
  text2: {
    fontSize: 23,
    color: "#4E504F",
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 8,
  },
  erro: {
    color: "#9b1c1c",
    textAlign: "center",
    marginBottom: 8,
  },
  icon: {
    marginVertical: 30,
    alignSelf: "center",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#FFF8E2",
    padding: 16,
  },
  listaContent: {
    paddingBottom: 16,
  },
  botaoVerHistorias: {
    backgroundColor:"#EDB638",
    marginTop: 16,
    borderRadius: 20,
    height: 50,
    paddingVertical: 12,
    justifyContent: "center",
  },
  textoBotaoVerHistorias: {
    color: "#ffffffff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 20,
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
