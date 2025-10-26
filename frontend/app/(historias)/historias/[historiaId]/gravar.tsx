import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function GravarHistoriaScreen() {
  const { historiaId } = useLocalSearchParams(); // pega o :id da URL
  const router = useRouter();

  function handleIniciarGravacao() {
    // futuramente aqui entra a lógica de microfone
    Alert.alert("Gravação", `Iniciando gravação da história ${historiaId}...`);
  }

  function handleFinalizarGravacao() {
    Alert.alert("Gravação finalizada", "Sua narração foi salva (mock).");
    // você poderia fazer router.back() pra voltar pra lista
    router.back();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitulo}>Gravar história</Text>
      <Text style={styles.subtitulo}>
        História ID: {historiaId}
      </Text>

      <View style={styles.areaGravacao}>
        <Text style={styles.statusText}>Status: pronto para gravar</Text>

        <TouchableOpacity
          style={[styles.botao, styles.botaoPrimario]}
          onPress={handleIniciarGravacao}
        >
          <Text style={styles.botaoTexto}>Iniciar gravação</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, styles.botaoSecundario]}
          onPress={handleFinalizarGravacao}
        >
          <Text style={styles.botaoTexto}>Finalizar e salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
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
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 16,
    padding: 20,
    backgroundColor: "#fafafa",
    gap: 16,
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
});
