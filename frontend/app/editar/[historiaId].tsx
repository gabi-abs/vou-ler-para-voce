import { historiaService } from "@/api/historiaService";
import CapaSelector from "@/components/ui/CapaSelector";
import { useDialog } from "@/context/DialogContext";
import Historia from "@/interfaces/HistoriaInterface";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput
} from "react-native";

export default function EditarHistoriaScreen() {
  const { historiaId, historia: historiaParam } = useLocalSearchParams() as {
    historiaId: string;
    historia: string;
  };
  const router = useRouter();

  const historiaAtual: Historia = JSON.parse(historiaParam);

  const [titulo, setTitulo] = useState(historiaAtual.titulo || "");
  const [texto, setTexto] = useState(historiaAtual.texto || "");
  const [capaUri, setCapaUri] = useState<string | undefined>(
    historiaAtual.capa
  );
  const [isLoading, setIsLoading] = useState(false);

  const { abrirDialog, fecharDialog } = useDialog();

  async function handleSalvar() {
    if (!titulo.trim()) {
      abrirDialog({
        title: "Atenção",
        message: "Por favor, insira o título da história.",
        confirmText: "Confirmar",
      });
      return;
    }

    if (!texto.trim()) {
      abrirDialog({
        title: "Atenção",
        message: "Por favor, insira o texto da história.",
        confirmText: "Confirmar",
      });
      //
      return;
    }

    setIsLoading(true);

    try {
      const dados = {
        titulo: titulo.trim(),
        texto: texto.trim(),
        status: historiaAtual.status,
        usuarioId: historiaAtual.usuarioId,
        trilhaSonoraId: historiaAtual.trilhaSonoraId,
      };

      // Verifica se a capa foi alterada e prepara arquivo para upload
      let arquivo: { uri: string; name: string; type: string } | undefined;
      if (capaUri && capaUri !== historiaAtual.capa) {
        const fileName = capaUri.split("/").pop() || `capa_${Date.now()}.jpg`;
        const extension = fileName.split('.').pop()?.toLowerCase() || 'jpg';

        const mimeTypes: { [key: string]: string } = {
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'webp': 'image/webp',
          'gif': 'image/gif',
        };

        const fileType = mimeTypes[extension] || 'image/jpeg';

        const uriForUpload = Platform.OS === 'ios' ? capaUri.replace('file://', '') : capaUri;

        arquivo = {
          uri: uriForUpload,
          name: fileName,
          type: fileType,
        };
      }

      await historiaService.atualizar(historiaAtual.id, dados, arquivo);

      abrirDialog({
        title: "Sucesso!",
        message: "História atualizada com sucesso.",
        confirmText: "Confirmar"
      });

      router.back();
    } catch (error: any) {
      abrirDialog({
        title: "Erro",
        message:
          error.response?.data?.message ||
          "Não foi possível atualizar a história. Tente novamente.",
        confirmText: "Confirmar",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 20, paddingBottom: 80 }}
      >
        <Text style={styles.titulo}>Editar História</Text>

        <CapaSelector
          value={capaUri ?? null}
          onChange={(uri) => setCapaUri(uri ?? undefined)}
        />

        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o título.."
          placeholderTextColor="#AF9D8D"
          value={titulo}
          onChangeText={setTitulo}
        />

        <Text style={styles.label}>Texto da História</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Edite a sua história aqui.."
          placeholderTextColor="#AF9D8D"
          multiline
          numberOfLines={4}
          value={texto}
          onChangeText={setTexto}
        />

        <Pressable
          style={styles.botaoSalvar}
          onPress={handleSalvar}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#D16314" />
          ) : (
            <Text style={styles.textoBotaoSalvar}>Salvar alterações</Text>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8E2",
    // padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#D87443",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: "#EEE5DE",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
    backgroundColor: "#fff",
  },
  // estilos de capa movidos para CapaSelector
  botaoSalvar: {
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFE187',
    borderColor: "#E9C66C",
    height: 60
  },
  textoBotaoSalvar: {
    // color: "#D16314",
    textAlign: "center",
    // fontWeight: "bold",
    // fontSize: 22,
    fontSize: 18,
    color: '#C3782C',
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  botaoDesabilitado: {
    opacity: 0.6,
  },
});
