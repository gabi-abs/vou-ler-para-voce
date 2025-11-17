import CapaSelector from "@/components/ui/CapaSelector";
import { historiaService } from "@/api/historiaService";
import Historia from "@/interfaces/HistoriaInterface";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View, ActivityIndicator } from "react-native";

export default function EditarHistoriaScreen() {
  const { historiaId, historia: historiaParam } = useLocalSearchParams() as { historiaId: string; historia: string };
  const router = useRouter();

  const historiaAtual: Historia = JSON.parse(historiaParam);

  const [titulo, setTitulo] = useState(historiaAtual.titulo || "");
  const [texto, setTexto] = useState(historiaAtual.texto || "");
  const [capaUri, setCapaUri] = useState<string | undefined>(historiaAtual.capa);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSalvar() {
    if (!titulo.trim()) {
      Alert.alert("Atenção", "Por favor, insira o título da história.");
      return;
    }

    if (!texto.trim()) {
      Alert.alert("Atenção", "Por favor, insira o texto da história.");
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

      // Verifica se a capa foi alterada
      let arquivo: { uri: string; name: string; type: string } | undefined;
      if (capaUri && capaUri !== historiaAtual.capa) {
        arquivo = {
          uri: capaUri,
          name: `capa_${Date.now()}.jpg`,
          type: 'image/jpeg',
        };
      }

      await historiaService.atualizar(historiaAtual.id, dados, arquivo);
      
      Alert.alert("Sucesso!", "História atualizada com sucesso.");
      router.back();
    } catch (error: any) {
      console.error('Erro ao atualizar história:', error);
      Alert.alert(
        "Erro",
        error.response?.data?.message || "Não foi possível atualizar a história. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Editar História</Text>

      <CapaSelector value={capaUri ?? null} onChange={(uri) => setCapaUri(uri ?? undefined)} />

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

      <View>
        <Pressable style={styles.botaoSalvar} onPress={handleSalvar} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#D16314" />
          ) : (
            <Text style={styles.textoBotaoSalvar}>Salvar alterações</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8E2",
    padding: 20,
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
    margin: 24,
    backgroundColor: "#FFE187",
    borderRadius: 20,
    height: 50,
    borderWidth: 2,
    borderColor: "#E9C66C",
    paddingVertical: 12,
  },
  textoBotaoSalvar: {
    color: "#D16314",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});