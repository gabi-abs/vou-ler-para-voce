import { AudioSource, setAudioModeAsync, useAudioPlayer as useExpoAudioPlayer } from "expo-audio";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert, Platform } from "react-native";

interface UseAudioPlayerReturn {
  isPlaying: boolean;
  duracaoMs: number | null;
  posicaoMs: number | null;
  togglePlayPause: () => Promise<void>;
  formatarMs: (ms: number | null) => string;
}

export function useAudioPlayer(source?: AudioSource | null): UseAudioPlayerReturn {
  // Memoriza o source para evitar recriações desnecessárias do player
  const memoizedSource = useMemo(() => source ?? undefined, [source]);
  const player = useExpoAudioPlayer(memoizedSource);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duracaoMs, setDuracaoMs] = useState<number | null>(null);
  const [posicaoMs, setPosicaoMs] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastSourceRef = useRef<AudioSource | null | undefined>(null);

  // Configura o modo de áudio para iOS
  useEffect(() => {
    const setupAudioMode = async () => {
      try {
        await setAudioModeAsync({
          playsInSilentMode: true,
          shouldPlayInBackground: false,
        });
      } catch (error) {
        // Ignora erros silenciosamente
      }
    };

    if (Platform.OS === 'ios') {
      setupAudioMode();
    }
  }, []);

  // Limpa o intervalo anterior
  const clearUpdateInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Atualiza progresso do áudio
  const updateProgress = useCallback(() => {
    try {
      // Verifica se o player está disponível
      if (!player) return;

      const currentTimeMs = player.currentTime * 1000;
      const durationMs = player.duration ? player.duration * 1000 : null;

      setPosicaoMs(currentTimeMs);
      setDuracaoMs(durationMs);
    } catch (error) {
      // Silenciosamente ignora erros de player liberado
    }
  }, [player]);

  // Gerencia a atualização periódica baseada no estado de playing
  useEffect(() => {
    // Sincroniza o estado local com o player
    setIsPlaying(player.playing);

    clearUpdateInterval();

    // Atualiza imediatamente
    updateProgress();

    // Se estiver tocando, inicia intervalo de atualização
    if (player.playing) {
      intervalRef.current = setInterval(() => {
        updateProgress();
      }, 250);
    }

    return () => clearUpdateInterval();
  }, [player.playing, updateProgress, clearUpdateInterval]);

  // Atualiza quando mudar a source
  useEffect(() => {
    // Se a source mudou, para o player atual
    if (lastSourceRef.current !== source) {
      clearUpdateInterval();
      setIsPlaying(false);

      // Não tenta pausar, apenas limpa o intervalo
      // O useAudioPlayer do expo-audio gerencia o ciclo de vida internamente

      lastSourceRef.current = source;
    }

    if (source) {
      // Pequeno delay para garantir que o player está pronto
      setTimeout(() => {
        updateProgress();
      }, 100);
    } else {
      setPosicaoMs(null);
      setDuracaoMs(null);
      setIsPlaying(false);
    }
  }, [source, updateProgress, clearUpdateInterval]);

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      clearUpdateInterval();
      // Não tenta pausar o player aqui pois ele pode já estar liberado
    };
  }, [clearUpdateInterval]);

  async function togglePlayPause() {
    if (!source) {
      Alert.alert("Nada para tocar", "Nenhum áudio foi selecionado ainda.");
      return;
    }

    try {
      if (player.playing) {
        player.pause();
        setIsPlaying(false);
      } else {
        await player.play();
        setIsPlaying(true);
      }

      // Força atualização imediata do estado após um pequeno delay
      setTimeout(() => {
        try {
          updateProgress();
          // Garante sincronização com o estado real do player
          setIsPlaying(player.playing);
        } catch (error) {
          // Ignora erros silenciosamente
        }
      }, 100);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível reproduzir o áudio. Tente novamente.");
    }
  }

  function formatarMs(ms: number | null): string {
    if (ms == null) return "00:00";
    // transformar ms em mm:ss
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;

    // garantir dois dígitos em sec
    const secStr = sec < 10 ? "0" + sec : String(sec);
    const minStr = min < 10 ? "0" + min : String(min);
    return `${minStr}:${secStr}`;
  }

  return {
    isPlaying,
    duracaoMs,
    posicaoMs,
    togglePlayPause,
    formatarMs,
  };
}
