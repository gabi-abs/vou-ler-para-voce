import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const historiaLista = [
  { id: 1, titulo: "Minha Primeira História" , capa: "", descricao: "Descrição da minha primeira história." },
  { id: 2, titulo: "Aventuras no Mundo React Native" , capa: "", descricao: "Descrição das aventuras no mundo React Native." },
  { id: 3, titulo: "Explorando o Expo Router" , capa: "", descricao: "Descrição sobre a exploração do Expo Router." },
]

export default function VerMinhasHistorias() {
  return (
    <View>
      <Text>Ver Minhas Historias</Text>
      {historiaLista.map(historia => (
        <View key={historia.id}>
          <Text>{historia.titulo}</Text>
          <Text>{historia.descricao}</Text>
          <Text>{historia.capa}</Text>
          <View>
            <Pressable onPress={() => {}}>
              <Text>Ouvir</Text>
            </Pressable>
            <Link href={{ pathname: `/(historias)/historias/[historiaId]/gravar`, params: { historiaId: historia.id } }} asChild>
              <Pressable style={styles.actionButton}>
                <Text>Gravar</Text>
              </Pressable>
            </Link>
            <Pressable onPress={() => {}}>
              <Text>Editar</Text>
            </Pressable>
            <Pressable onPress={() => {}}>
              <Text>Deletar</Text>
            </Pressable>
            <Pressable onPress={() => {}}>
              <Text>Favoritar</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  actionButton: {
    marginRight: 10,
    padding: 10,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  }
});