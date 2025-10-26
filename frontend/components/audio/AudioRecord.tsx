import { Audio } from "expo-av";
import { useRef, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AudioRecorderProps {
  onFinish?: (uri: string) => void; // callback opcional ao finalizar
}

export default function AudioRecorder({ onFinish }: AudioRecorderProps) {
  const [gravando, setGravando] = useState(false);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const recordingRef = useRef<Audio.Recording | null>(null);

  async function iniciarGravacao() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status !== "granted") {
        Alert.alert("Permissão negada", "Permita o uso do microfone para gravar.");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await recording.startAsync();

      recordingRef.current = recording;
      setGravando(true);
      setAudioUri(null);
    } catch (error) {
      console.error("Erro ao iniciar gravação:", error);
      Alert.alert("Erro", "Não foi possível iniciar a gravação.");
    }
  }

  async function pararGravacao() {
    try {
      const recording = recordingRef.current;
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      recordingRef.current = null;
      setGravando(false);
      setAudioUri(uri ?? null);

      if (uri && onFinish) onFinish(uri);
      Alert.alert("Gravação concluída", "O áudio foi salvo com sucesso.");
    } catch (error) {
      console.error("Erro ao parar gravação:", error);
      Alert.alert("Erro", "Não foi possível parar a gravação.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.status}>
        Status: {gravando ? "🎙 Gravando..." : "⏹ Parado"}
      </Text>

      <TouchableOpacity
        style={[styles.botao, gravando ? styles.botaoParar : styles.botaoGravar]}
        onPress={gravando ? pararGravacao : iniciarGravacao}
      >
        <Text style={styles.textoBotao}>
          {gravando ? "Parar gravação" : "Iniciar gravação"}
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
