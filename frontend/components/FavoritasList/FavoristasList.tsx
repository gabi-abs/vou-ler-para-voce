import React from "react";
import {
  ActivityIndicator, FlatList, Pressable, RefreshControl, StyleSheet, Text, View,
} from "react-native";
import FormatoDeCoracao from "@/assets/svg/formato-de-coracao.svg";
import HistoriaItem from "@/components/HistoriaItem/HistoriaItem";
import { useHistoriasFavoritas } from "@/hooks/use-historia-favorita";
import type Historia from "@/interfaces/HistoriaInterface";

type Props = { onPressVerHistorias: () => void };

export default function FavoritasList({ onPressVerHistorias }: Props) {
  const { data, isLoading, isFetching, refetch, error } = useHistoriasFavoritas();
  const favoritas = data ?? [];
  const erro = error ? "Não foi possível carregar suas favoritas." : null;

  // Mostra loading só se não há dados ainda
  if (isLoading && favoritas.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.text}>Carregando suas histórias favoritas…</Text>
      </View>
    );
  }

  if (favoritas.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Favoritas</Text>
        <FormatoDeCoracao style={styles.icon} width={335} height={280} color={"#EDB638"} />
        {erro ? <Text style={styles.erro}>{erro}</Text> : null}
        <Text style={styles.text2}>Nenhuma história favorita ainda.</Text>
        <Text style={styles.text}>Marque histórias com 💛 para encontrá-las aqui.</Text>
        <Pressable style={styles.botaoVerHistorias} onPress={onPressVerHistorias}>
          <Text style={styles.textoBotaoVerHistorias}>Ver Histórias</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritas</Text>

      <FlatList
        data={favoritas}
        keyExtractor={(item: Historia) => String(item.id)}
        renderItem={({ item }) => <HistoriaItem historia={item} />}
        style={styles.lista}
        contentContainerStyle={styles.listaContent}
        refreshControl={
          <RefreshControl refreshing={isFetching && !isLoading} onRefresh={refetch} />
        }
        // evita re-render caro
        initialNumToRender={6}
        windowSize={5}
        removeClippedSubviews
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: "#FFF8E2",
},
  title: { 
    fontSize: 40, 
    fontWeight: "600", 
    marginBottom: 12, 
    textAlign: "center", 
    color: "#D87443" 
},
  text: { 
    fontSize: 17.5, 
    color: "#4E504F", 
    textAlign: "center" 
},
  text2: { 
    fontSize: 23, 
    color: "#4E504F", 
    textAlign: "center", 
    fontWeight: "500", 
    marginBottom: 8 
},
  erro: { 
    color: "#9b1c1c", 
    textAlign: "center",
    marginBottom: 8 },
  icon: { 
    marginVertical: 30 
},
  center: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    gap: 10 
},
  lista: {
    marginTop: 16 
},
  listaContent: { 
    paddingBottom: 16 
},
  botaoVerHistorias: {
    backgroundColor: "#E5DFF6", 
    marginTop: 16, 
    borderRadius: 20, 
    height: 50,
    paddingVertical: 12, 
    justifyContent: "center",
  },
  textoBotaoVerHistorias: { 
    color: "#4D4388", 
    textAlign: "center", 
    fontWeight: "600", 
    fontSize: 20 
},
});
