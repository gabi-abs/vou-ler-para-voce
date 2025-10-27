import { useAudioRecorder } from "@/hooks/use-audio-recorder";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AudioRecorderProps {
  onFinish?: (uri: string) => void; // callback opcional ao finalizar
  onError?: (error: unknown) => void; // callback opcional para erros
}

export default function AudioRecorder({ onFinish, onError }: AudioRecorderProps) {
  const { audioUri, isRecording, toggleRecording } = useAudioRecorder({
    onFinish,
    onError,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.status}>
        Status: {isRecording ? "🎙 Gravando..." : "⏹ Parado"}
      </Text>

      <TouchableOpacity
        style={[styles.botao, isRecording ? styles.botaoParar : styles.botaoGravar]}
        onPress={toggleRecording}
      >
        <Text style={styles.textoBotao}>
          {isRecording ? "Parar gravação" : "Iniciar gravação"}
        </Text>
      </TouchableOpacity>

      {audioUri && (
        <Text style={styles.resultado}>✅ Gravação salva localmente</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 12,
    marginTop: 16,
  },
  status: {
    fontSize: 16,
    fontWeight: "500",
  },
  botao: {
    width: "80%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  botaoGravar: {
    backgroundColor: "#6C63FF",
  },
  botaoParar: {
    backgroundColor: "#D32F2F",
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  resultado: {
    marginTop: 8,
    color: "green",
    fontWeight: "500",
  },
});
