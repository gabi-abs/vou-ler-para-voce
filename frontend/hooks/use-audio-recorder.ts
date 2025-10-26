import {
  RecordingOptions,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
  useAudioRecorder as useExpoAudioRecorder
} from "expo-audio";
import { useState } from "react";
import { Alert } from "react-native";

interface UseAudioRecorderOptions {
  onFinish?: (uri: string) => void;
  onError?: (error: unknown) => void;
}

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

export function useAudioRecorder({ onFinish, onError }: UseAudioRecorderOptions = {}) {
  const recorder = useExpoAudioRecorder(recordingOptions);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  async function startRecording() {
    try {
      // Solicita permissões antes de gravar
      const permission = await requestRecordingPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permissão necessária",
          "É necessário permitir o acesso ao microfone para gravar áudio.",
          [{ text: "OK" }]
        );
        return false;
      }

      // Configura o modo de áudio para permitir gravação no iOS
      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });

      await recorder.record();
      setIsRecording(true);
      setAudioUri(null);
      return true;
    } catch (error) {
      console.error("Erro ao iniciar gravação:", error);
      Alert.alert("Erro", `Não foi possível iniciar a gravação: ${error}`);
      if (onError) onError(error);
      return false;
    }
  }

  async function stopRecording() {
    try {
      const uri = await recorder.stop();
      setIsRecording(false);
      setAudioUri(uri ?? null);

      // Restaura o modo de áudio para reprodução
      await setAudioModeAsync({
        allowsRecording: false,
        playsInSilentMode: true,
      });

      if (uri !== null && uri !== undefined) {
        if (onFinish) onFinish(uri);
        Alert.alert("Gravação concluída", "O áudio foi salvo com sucesso.");
        return uri;
      }
      return null;
    } catch (error) {
      console.error("Erro ao parar gravação:", error);
      Alert.alert("Erro", "Não foi possível parar a gravação.");
      if (onError) onError(error);
      setIsRecording(false);
      return null;
    }
  }

  async function toggleRecording() {
    if (isRecording || recorder.isRecording) {
      return await stopRecording();
    } else {
      await startRecording();
      return null;
    }
  }

  function clearAudioUri() {
    setAudioUri(null);
  }

  return {
    audioUri,
    isRecording: isRecording || recorder.isRecording,
    startRecording,
    stopRecording,
    toggleRecording,
    clearAudioUri,
    recorder,
  };
}
