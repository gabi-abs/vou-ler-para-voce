import { useAudioRecorder } from "@/hooks/use-audio-recorder";
import { theme } from "@/themes";
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
      <TouchableOpacity
        style={[styles.botao, isRecording ? styles.botaoParar : styles.botaoGravar]}
        onPress={toggleRecording}
      >
        <Text style={styles.textoBotao}>
          {isRecording ? "Parar gravação" : "Iniciar gravação"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 12,
  },
  status: {
    fontSize: 16,
    fontWeight: "500",
  },
  botao: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  botaoGravar: {
    backgroundColor: theme.colors.purple,
  },
  botaoParar: {
    backgroundColor: "#D32F2F",
  },
  textoBotao: {
    color: theme.colors.purple2,
    fontWeight: "600",
    fontSize: 16,
  },
  resultado: {
    marginTop: 8,
    color: "green",
    fontWeight: "500",
  },
});
