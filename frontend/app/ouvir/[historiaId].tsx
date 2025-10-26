import ProgressBar from "@/components/ProgressBar/ProgressBar";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import HistoriasMock from "@/mocks/historias";
import { theme } from "@/themes";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface Historia {
  id: string;
  titulo: string;
  descricao?: string;
  capaUrl?: string;
  audioUrl?: string; // URL ou caminho do áudio da história
}

export default function OuvirHistoriaScreen() {
  const { historiaId } = useLocalSearchParams() as { historiaId: string };
  const [historia, setHistoria] = useState<Historia | null>(null);
  
  // Hook do player de áudio - passa o audioUrl da história
  const { isPlaying, duracaoMs, posicaoMs, togglePlayPause, formatarMs } = useAudioPlayer(historia?.audioUrl);

  function buscarHistoriaPorId(id: string): Historia | null {
    // Mock de busca - em um app real, você buscaria de uma API ou banco de dados
    const historiasMock: Historia[] = HistoriasMock;

    return historiasMock.find((historia) => historia.id === id) || null;
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
        <Text style={styles.titulo}>{historia?.titulo}</Text>
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

      <View>
        <View>
          <ProgressBar posicaoMs={posicaoMs} duracaoMs={duracaoMs} />
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatarMs(posicaoMs)}</Text>
          <Text style={styles.timeText}>{formatarMs(duracaoMs)}</Text>
        </View>

        <View style={styles.actionContainer}>
          <Pressable onPress={togglePlayPause}>
            <MaterialIcons 
              name={isPlaying ? "pause-circle-filled" : "play-circle-filled"} 
              color={theme.colors.button.secondary.color} 
              size={64} 
            />
          </Pressable>
          <Pressable onPress={() => {}}>
            <MaterialIcons name="lock"  color={theme.colors.button.tertiary.color} size={64} />
          </Pressable>
        </View>
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
    borderColor: theme.colors.border
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
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    marginTop: 10,
    marginBottom: 20,
  },
  timeText: {
    fontSize: 15,
    color: theme.colors.text,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 30,
  },
});
