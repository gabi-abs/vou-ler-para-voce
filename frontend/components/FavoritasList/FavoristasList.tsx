import React from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import FormatoDeCoracao from "@/assets/svg/formato-de-coracao.svg";
import HistoriaItem from "@/components/HistoriaItem/HistoriaItem";
import { useHistoriasFavoritas } from "@/hooks/use-historia-favorita";
import type Historia from "@/interfaces/HistoriaInterface";
import { theme } from "@/themes";

type Props = { onPressVerHistorias: () => void };

export default function FavoritasList({ onPressVerHistorias }: Props) {
  const { data, isLoading, isFetching, refetch, error } = useHistoriasFavoritas();
  const favoritas: Historia[] = data ?? [];
  const erro = error ? "Não foi possível carregar suas favoritas." : null;

  
  if (isLoading && favoritas.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={styles.text}>Carregando suas histórias favoritas…</Text>
        </View>
      </View>
    );
  }

  
  if (favoritas.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContent}>
          <FormatoDeCoracao width={335} height={280} color="#EDB638" />
          {erro ? <Text style={styles.erro}>{erro}</Text> : null}
          <Text style={styles.text2}>Nenhuma história favorita ainda.</Text>
          <Text style={styles.text}>
            Marque histórias com 💛 para encontrá-las aqui.
          </Text>

          <Pressable style={styles.botaoVerHistorias} onPress={onPressVerHistorias}>
            <Text style={styles.textoBotaoVerHistorias}>Ver Histórias</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  
  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isFetching && !isLoading} onRefresh={refetch} />
        }
      >
        {favoritas.map(historia => (
          <HistoriaItem key={historia.id} historia={historia} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    padding: 10,
    minHeight: "100%",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  emptyContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },

  text: {
    fontSize: 17.5,
    color: "#4E504F",
    textAlign: "center",
  },
  text2: {
    fontSize: 23,
    color: "#4E504F",
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 8,
  },
  erro: {
    color: "#9b1c1c",
    textAlign: "center",
    marginBottom: 8,
  },
  botaoVerHistorias: {
    backgroundColor: "#E5DFF6",
    marginTop: 16,
    borderRadius: 20,
    height: 50,
    paddingVertical: 12,
    justifyContent: "center",
    width: "70%",
  },
  textoBotaoVerHistorias: {
    color: "#4D4388",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 20,
  },
});
