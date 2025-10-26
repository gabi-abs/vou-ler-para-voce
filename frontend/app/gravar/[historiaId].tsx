import AudioPlayer from "@/components/audio/AudioPlayer";
import AudioRecorder from "@/components/audio/AudioRecord";
import HistoriasMock from "@/mocks/historias";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";

interface Historia {
  id: string;
  titulo: string;
  descricao?: string;
  capaUrl?: string;
  audioUrl?: string; // URL ou caminho do áudio da história
}

export default function GravarHistoriaScreen() {
  const { historiaId } = useLocalSearchParams() as { historiaId: string }; // pega o :id da URL
  const [historia, setHistoria] = useState<Historia | null>(null);
  const [ultimoAudioUri, setUltimoAudioUri] = useState<string | null>(null);

  function buscarHistoriaPorId(id: string): Historia | null {
    // Mock de busca - em um app real, você buscaria de uma API ou banco de dados
    const historiasMock: Historia[] = HistoriasMock;

    return historiasMock.find((historia) => historia.id === id) || null;
  }

  function salvarAudioUri(uri: string) {
    setUltimoAudioUri(uri);
    setHistoria((prev) => (prev ? { ...prev, audioUrl: uri } : prev));
  }

  useEffect(() => {
    if (historiaId) {
      const historiaEncontrada = buscarHistoriaPorId(historiaId);
      setHistoria(historiaEncontrada);
    }
  }, [historiaId]);

  return (
    <View style={styles.container}>
      <View style={styles.capa}>
        {historia && historia.capaUrl ? (
          <>
            <Image
              source={{ uri: historia.capaUrl }}
              style={styles.capaImagem}
            />
            <Text>{historia.titulo}</Text>
          </>
        ) : (
          <Text>Carregando capa...</Text>
        )}
      </View>

      <ScrollView>
        <View>
          <Text style={styles.descricao}>
            {historia?.descricao || "Descrição não disponível."}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.areaGravacao}>
        <AudioRecorder
          onFinish={(uri) => {
            console.log("Áudio salvo em:", uri);
            Alert.alert("Gravação salva", `Áudio salvo em: ${uri}`);
            salvarAudioUri(uri);
          }}
        />
        <AudioPlayer source={ultimoAudioUri} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  headerTitulo: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: "#555",
    marginBottom: 24,
  },
  areaGravacao: {
    padding: 20,
  },
  statusText: {
    fontSize: 14,
    color: "#333",
  },
  botao: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  botaoPrimario: {
    backgroundColor: "#6C63FF",
  },
  botaoSecundario: {
    backgroundColor: "#4CAF50",
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  capa: {
    alignItems: "center",
    marginBottom: 16,
  },
  capaImagem: {
    width: 150,
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 8,
  },
  descricao: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
});
