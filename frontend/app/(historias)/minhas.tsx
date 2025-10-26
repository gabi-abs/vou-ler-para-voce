import HistoriaItem from "@/components/HistoriaItem/HistoriaItem";
import HistoriasMock from "@/mocks/historias";
import { theme } from "@/themes";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

interface Historia {
  id: string;
  titulo: string;
  descricao?: string;
  capaUrl?: string;
}

export default function VerMinhasHistorias() {
  const [historiaLista, setHistoriaLista] =  useState<Historia[]>([]);

  useEffect(() => {
    const historiasMock: Historia[] = HistoriasMock;

    setHistoriaLista(historiasMock);
  }, []);


  return (
    <View style={styles.container}>
      <ScrollView>
        {historiaLista.map(historia => <HistoriaItem key={historia.id} historia={historia} />)}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
  },
  actionButton: {
    marginRight: 10,
    padding: 10,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
  capaImagem: {
    width: 150, 
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 8,
  },
  itemLista: {
    marginBottom: 24,
    padding: 16
  },
});