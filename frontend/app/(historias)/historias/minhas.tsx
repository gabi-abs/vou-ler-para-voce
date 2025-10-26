import HistoriasMock from "@/mocks/historias";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

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
    <View>
      {historiaLista.map(historia => (
        <View key={historia.id} style={styles.itemLista}>
           <Image source={{ uri: historia.capaUrl }} style={styles.capaImagem} />
            <Text>{historia.titulo}</Text>
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