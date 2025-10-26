import { Audio, AVPlaybackSource, AVPlaybackStatusSuccess } from "expo-av";
import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";

interface UseAudioPlayerReturn {
  isPlaying: boolean;
  duracaoMs: number | null;
  posicaoMs: number | null;
  togglePlayPause: () => Promise<void>;
  formatarMs: (ms: number | null) => string;
}

export function useAudioPlayer(source?: AVPlaybackSource | null): UseAudioPlayerReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duracaoMs, setDuracaoMs] = useState<number | null>(null);
  const [posicaoMs, setPosicaoMs] = useState<number | null>(null);

  // vamos manter a instância do som viva entre renders
  const soundRef = useRef<Audio.Sound | null>(null);

  // carrega o som quando tiver uma URI nova
  async function carregarSom() {
    if (!source) {
      Alert.alert("Nada para tocar", "Nenhum áudio foi selecionado ainda.");
      return;
    }

    try {
      // se já existe um sound carregado antigo, descarrega
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      const { sound, status } = await Audio.Sound.createAsync(
        source,
        { shouldPlay: false, progressUpdateIntervalMillis: 250 }, // não toca imediatamente
        onPlaybackStatusUpdate
      );

      soundRef.current = sound;

      if ((status as AVPlaybackStatusSuccess).isLoaded) {
        setDuracaoMs((status as AVPlaybackStatusSuccess).durationMillis ?? null);
        setPosicaoMs((status as AVPlaybackStatusSuccess).positionMillis ?? null);
      }
    } catch (err) {
      console.error("Erro ao carregar áudio:", err);
      Alert.alert("Erro", "Não foi possível carregar o áudio.");
    }
  }

  // callback chamado toda vez que o status do player muda
  function onPlaybackStatusUpdate(status: any) {
    if (!status.isLoaded) {
      return;
    }

    const successStatus = status as AVPlaybackStatusSuccess;

    setIsPlaying(successStatus.isPlaying);
    setPosicaoMs(successStatus.positionMillis ?? null);
    setDuracaoMs(successStatus.durationMillis ?? null);

    // se o áudio terminou naturalmente, volta pro início
    if (successStatus.didJustFinish) {
      soundRef.current?.setPositionAsync(0);
      setIsPlaying(false);
    }
  }

  async function togglePlayPause() {
    if (!source) {
      Alert.alert("Nada para tocar", "Nenhum áudio foi selecionado ainda.");
      return;
    }

    // se não carregamos o som ainda nessa sessão, carrega agora
    if (!soundRef.current) {
      await carregarSom();
    }

    if (!soundRef.current) {
      return;
    }

    const status = (await soundRef.current.getStatusAsync()) as AVPlaybackStatusSuccess;

    if (!status.isLoaded) {
      return;
    }

    if (status.isPlaying) {
      await soundRef.current.pauseAsync();
    } else {
      await soundRef.current.playAsync();
    }
  }

  // limpar recurso de áudio quando o componente desmontar
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    };
  }, []);

  // se a URI mudar externamente (por ex: gravou outro áudio), recarrega o som
  useEffect(() => {
    if (source) {
      carregarSom();
    } else {
      // sem uri => reseta estado
      setIsPlaying(false);
      setDuracaoMs(null);
      setPosicaoMs(null);

      if (soundRef.current) {
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    }
  }, [source]);

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
