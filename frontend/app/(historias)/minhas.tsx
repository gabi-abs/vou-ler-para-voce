import HistoriaItem from "@/components/HistoriaItem/HistoriaItem";
import { useHistorias } from "@/hooks/use-historias";
import { theme } from "@/themes";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function VerMinhasHistorias() {
  const { data: historiaLista, isLoading } = useHistorias();

  return (
    <View style={styles.container}>
      <ScrollView>
        {
          isLoading ? <View>Carregando...</View> :
          historiaLista && historiaLista.map(historia => <HistoriaItem key={historia.id} historia={historia} />)
        }
      </ScrollView>
      <Text>Em construção...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    padding: 10,
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