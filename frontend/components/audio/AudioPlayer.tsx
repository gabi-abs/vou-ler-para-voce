import { useAudioPlayer } from "@/hooks/use-audio-player";
import { AVPlaybackSource } from "expo-av";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AudioPlayerProps {
  source?: AVPlaybackSource | null; // caminho do áudio (URI string ou require())
}

export default function AudioPlayer({ source }: AudioPlayerProps) {
  const { isPlaying, duracaoMs, posicaoMs, togglePlayPause, formatarMs } = useAudioPlayer(source);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Player da gravação</Text>

      <TouchableOpacity
        style={[styles.botao, isPlaying ? styles.botaoPausar : styles.botaoTocar]}
        onPress={togglePlayPause}
        disabled={!source}
      >
        <Text style={styles.textoBotao}>
          {!source ? "Sem áudio" : isPlaying ? "Pausar" : "Tocar"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.tempo}>
        {formatarMs(posicaoMs)} / {formatarMs(duracaoMs)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fafafa",
    borderRadius: 16,
    padding: 20,
    gap: 12,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "600",
  },
  botao: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  botaoTocar: {
    backgroundColor: "#4CAF50",
  },
  botaoPausar: {
    backgroundColor: "#D32F2F",
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  tempo: {
    fontSize: 14,
    color: "#444",
  },
});
