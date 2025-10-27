import AudioRecorder from "@/components/audio/AudioRecord";
import HistoriasMock from "@/mocks/historias";
import { theme } from "@/themes";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

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
      <View style={styles.topContainer}>
        {/* <Text style={styles.titulo}>{historia?.titulo}</Text> */}
        <View style={styles.capa}>
          {historia && historia.capaUrl ? (
            <>
              <Image
                source={{ uri: historia.capaUrl }}
                style={styles.capaImagem}
              />
            </>
          ) : (
            <Text>Carregando capa...</Text>
          )}
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.descricao}>
          {historia?.descricao || "Descrição não disponível."}
        </Text>
      </ScrollView>

      <View style={styles.areaGravacao}>
        <AudioRecorder
          onFinish={(uri) => {
            salvarAudioUri(uri);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  topContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  capa: {
    height: 300,
    width: 300,
    backgroundColor: theme.colors.background,
    borderWidth: 10,
    borderRadius: 8,
    borderColor: theme.colors.border,
  },
  titulo: {
    ...theme.colors.title1,
    paddingTop: 20,
    paddingBottom: 25,
  },
  capaImagem: {
    height: "100%",
    resizeMode: "cover",
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
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
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
  descricao: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
    textAlign: "justify",
    lineHeight: 22,
  },
  scrollView: { 
    flex: 1, 
    marginBottom: 16,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    padding: 20,
   },
});
