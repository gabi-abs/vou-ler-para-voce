import { audioService } from "@/api/audioService";
import { historiaService } from "@/api/historiaService";
import AudioRecorder from "@/components/audio/AudioRecord";
import { useAuth } from "@/context/AuthContext";
import { useDialog } from "@/context/DialogContext";
import Historia from "@/interfaces/HistoriaInterface";
import { theme } from "@/themes";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";

export default function GravarHistoriaScreen() {
  const { historiaId } = useLocalSearchParams() as { historiaId: string }; // pega o :id da URL
  const [historia, setHistoria] = useState<Historia | null>(null);
  const [ultimoAudioUri, setUltimoAudioUri] = useState<string | null>(null);
  const { usuario } = useAuth();
  const [enviando, setEnviando] = useState(false);
  const [loading, setLoading] = useState(true);

  const { abrirDialog, fecharDialog } = useDialog();

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

  async function salvarAudioUri(uri: string) {
    setUltimoAudioUri(uri);
    setHistoria((prev) => (prev ? { ...prev, audioUrl: uri } : prev));

    if (!usuario?.id) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    setEnviando(true);

    try {
      const fileName = uri.split('/').pop() || 'audio.m4a';
      const extension = fileName.split('.').pop()?.toLowerCase() || 'm4a';
      
      // Mapear extensão para tipo MIME correto
      const mimeTypes: { [key: string]: string } = {
        'm4a': 'audio/mp4',
        'mp4': 'audio/mp4',
        'caf': 'audio/x-caf',
        'webm': 'audio/webm',
        'wav': 'audio/wav',
      };
      
      const fileType = mimeTypes[extension] || 'audio/mp4';
      
      const arquivo = {
        uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
        name: fileName,
        type: fileType
      };

      console.log('Enviando áudio:', arquivo);

      const dados = {
        ordem: 1,
        usuarioId: usuario.id,
        historiaId: Number(historiaId)
      };

      const resultado = await audioService.criar(dados, arquivo);
      
      console.log('Áudio enviado com sucesso:', resultado);


      abrirDialog({
        title: "Sucesso!",
        message: "Áudio enviado com sucesso.",
        confirmText: "Confirmar",
      });
    } catch (error: any) {
      abrirDialog({
        title: "Erro",
        message: error?.response?.data?.message || "Não foi possível enviar o áudio. Tente novamente.",
        confirmText: "Confirmar",
      });
    } finally {
      setEnviando(false);
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

  return (
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

      <ScrollView style={styles.scrollView}>
        <Text style={styles.descricao}>
          {historia?.texto || "Descrição não disponível."}
        </Text>
      </ScrollView>

      <View style={styles.areaGravacao}>
        <AudioRecorder
          onFinish={(uri) => {
            salvarAudioUri(uri);
          }}
        />
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
    borderColor: theme.colors.border,
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
  headerTitulo: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: "#555",
    marginBottom: 24,
  },
  areaGravacao: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  statusText: {
    fontSize: 14,
    color: "#333",
  },
  botao: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  botaoPrimario: {
    backgroundColor: "#6C63FF",
  },
  botaoSecundario: {
    backgroundColor: "#4CAF50",
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  descricao: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
    textAlign: "justify",
    lineHeight: 22,
  },
  scrollView: { 
    flex: 1, 
    marginBottom: 16,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    padding: 20,
   },
});
