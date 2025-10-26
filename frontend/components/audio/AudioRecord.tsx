import { RecordingOptions, requestRecordingPermissionsAsync, setAudioModeAsync, useAudioRecorder } from "expo-audio";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AudioRecorderProps {
  onFinish?: (uri: string) => void; // callback opcional ao finalizar
}

export default function AudioRecorder({ onFinish }: AudioRecorderProps) {
  const recordingOptions: RecordingOptions = {
    extension: ".m4a",
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
    android: {
      outputFormat: "mpeg4",
      audioEncoder: "aac",
    },
    ios: {
      outputFormat: "mpeg4AAC",
      audioQuality: 127,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
    web: {
      mimeType: "audio/webm",
      bitsPerSecond: 128000,
    },
  };

  const recorder = useAudioRecorder(recordingOptions);
  const [audioUri, setAudioUri] = useState<string | null>(null);

  async function iniciarGravacao() {
    try {
      // Solicita permissões antes de gravar
      const permission = await requestRecordingPermissionsAsync();
      
      if (!permission.granted) {
        Alert.alert(
          "Permissão necessária",
          "É necessário permitir o acesso ao microfone para gravar áudio.",
          [{ text: "OK" }]
        );
        return;
      }

      // Configura o modo de áudio para permitir gravação no iOS
      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });

      await recorder.record();
      setAudioUri(null);
    } catch (error) {
      console.error("Erro ao iniciar gravação:", error);
      Alert.alert("Erro", `Não foi possível iniciar a gravação: ${error}`);
    }
  }

  async function pararGravacao() {
    try {
      const uri = await recorder.stop();
      setAudioUri(uri ?? null);

      // Restaura o modo de áudio para reprodução
      await setAudioModeAsync({
        allowsRecording: false,
        playsInSilentMode: true,
      });

      if (uri !== null && uri !== undefined) {
        if (onFinish) onFinish(uri);
        Alert.alert("Gravação concluída", "O áudio foi salvo com sucesso.");
      }
    } catch (error) {
      console.error("Erro ao parar gravação:", error);
      Alert.alert("Erro", "Não foi possível parar a gravação.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.status}>
        Status: {recorder.isRecording ? "🎙 Gravando..." : "⏹ Parado"}
      </Text>

      <TouchableOpacity
        style={[styles.botao, recorder.isRecording ? styles.botaoParar : styles.botaoGravar]}
        onPress={recorder.isRecording ? pararGravacao : iniciarGravacao}
      >
        <Text style={styles.textoBotao}>
          {recorder.isRecording ? "Parar gravação" : "Iniciar gravação"}
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
