import { historiaService } from "@/api/historiaService";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import TelaBloqueada from "@/components/TelaBloqueada/TelaBloqueada";
import { useDialog } from "@/context/DialogContext";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import Historia from "@/interfaces/HistoriaInterface";
import { theme } from "@/themes";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function OuvirHistoriaScreen() {
  const { historiaId } = useLocalSearchParams() as { historiaId: string };
  const [historia, setHistoria] = useState<Historia | null>(null);
  const [loading, setLoading] = useState(true);
  const [telaBloqueada, setTelaBloqueada] = useState(false);

  const { abrirDialog, fecharDialog } = useDialog();
  
  // Pega o primeiro áudio da lista de áudios da história
  const audioUrl = historia?.audios?.sort((a, b) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime())?.[0]?.audioUrl;
  
  // Hook do player de áudio - passa o audioUrl do primeiro áudio
  const { isPlaying, duracaoMs, posicaoMs, togglePlayPause, formatarMs } = useAudioPlayer(audioUrl);


  function bloquearTela(){
    setTelaBloqueada(bloqueado => {
      if (bloqueado) {
        return false;
      }
      togglePlayPause();
      return true;
    });
  }

  useEffect(() => {
    if (!isPlaying) {
      setTelaBloqueada(false);
    }
  }, [isPlaying]);


  async function buscarHistoria() {
    try {
      setLoading(true);
      const historiaData = await historiaService.listarPorHistoriaId(Number(historiaId));
      setHistoria(historiaData);
    } catch (error: any) {
      abrirDialog({
        title: "Erro",
        message: error?.response?.data?.message || "Não foi possível carregar a história.",
        confirmText: "Confirmar",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (historiaId) {
      buscarHistoria();
    }
  }, [historiaId]);

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={theme.colors.button.secondary.color} />
        <Text style={styles.loadingText}>Carregando história...</Text>
      </View>
    );
  }

  return telaBloqueada ? (
    <TelaBloqueada onDesbloquear={bloquearTela} />
  ) : (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.titulo}>{historia?.titulo}</Text>
        <View style={styles.capa}>
          {historia && historia.capa ? (
            <>
              <Image
                source={{ uri: historia.capa }}
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
          <Pressable onPress={togglePlayPause} disabled={!audioUrl}>
            <MaterialIcons 
              name={isPlaying ? "pause-circle-filled" : "play-circle-filled"} 
              color={!audioUrl ? "#ccc" : theme.colors.button.secondary.color} 
              size={64} 
            />
          </Pressable>
          <Pressable onPress={bloquearTela}>
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
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: theme.colors.text,
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
