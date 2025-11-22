import {
  RecordingOptions,
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
  useAudioRecorder as useExpoAudioRecorder,
  type RecordingStatus
} from "expo-audio";
import { useEffect, useRef, useState } from "react";
// Removidos alerts para comportamento silencioso

interface UseAudioRecorderOptions {
  onFinish?: (uri: string) => void;
  onError?: (error: unknown) => void;
  onStatus?: (status: RecordingStatus) => void; // listener opcional de status
  maxDurationMs?: number; // duração máxima em milissegundos
}

// Use presets oficiais para garantir compatibilidade especialmente no iOS
const recordingOptions: RecordingOptions = {
  ...RecordingPresets.HIGH_QUALITY,
  // Mantém config de Web
  web: {
    mimeType: "audio/webm",
    bitsPerSecond: 128000,
  },
};

const DEFAULT_MAX_DURATION_MS = 120000; // 2 minutos em milissegundos

export function useAudioRecorder({ onFinish, onError, onStatus, maxDurationMs = DEFAULT_MAX_DURATION_MS }: UseAudioRecorderOptions = {}) {
  const recorder = useExpoAudioRecorder(
    recordingOptions,
    (status) => {
      // repassa status ao consumidor e loga quando debug
      if (onStatus) onStatus(status);
    }
  );
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const maxDurationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function startRecording() {
    try {
      // Solicita permissões antes de gravar
      const permission = await requestRecordingPermissionsAsync();

      if (!permission.granted) {
        // Permissão negada: notifica via callback de erro e retorna false
        if (onError) onError(new Error("Microphone permission not granted"));
        return false;
      }

      // Configura o modo de áudio para permitir gravação no iOS
      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });

      // Prepara a gravação (boa prática conforme docs)
      await recorder.prepareToRecordAsync();

      await recorder.record();
      setIsRecording(true);
      setAudioUri(null);

      // Configura timer para parar automaticamente após o tempo máximo
      maxDurationTimerRef.current = setTimeout(async () => {
        console.log('Tempo máximo de gravação atingido');
        await stopRecording();
      }, maxDurationMs);

      return true;
    } catch (error) {
      if (onError) onError(error);
      return false;
    }
  }

  async function stopRecording() {
    try {
      // Limpa o timer se existir
      if (maxDurationTimerRef.current) {
        clearTimeout(maxDurationTimerRef.current);
        maxDurationTimerRef.current = null;
      }

      await recorder.stop();
      setIsRecording(false);

      // O URI da gravação fica disponível na propriedade recorder.uri
      const uri = recorder.uri;
      setAudioUri(uri ?? null);

      // Restaura o modo de áudio para reprodução
      await setAudioModeAsync({
        allowsRecording: false,
        playsInSilentMode: true,
      });

      if (uri !== null && uri !== undefined) {
        if (onFinish) onFinish(uri);
        return uri;
      }
      return null;
    } catch (error) {
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

  // Cleanup do timer quando o componente desmontar
  useEffect(() => {
    return () => {
      if (maxDurationTimerRef.current) {
        clearTimeout(maxDurationTimerRef.current);
      }
    };
  }, []);

  return {
    audioUri,
    isRecording: isRecording || recorder.isRecording,
    startRecording,
    stopRecording,
    toggleRecording,
    clearAudioUri,
    recorder,
    maxDurationMs, // expõe a duração máxima configurada
  };
}
