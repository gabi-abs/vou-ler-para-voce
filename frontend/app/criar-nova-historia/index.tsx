import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CriarNovaHistoria() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [capaSelecionada, setCapaSelecionada] = useState(false);
  const router = useRouter();

  async function handleSelecionarCapa() {
    // Pede permissão pra acessar a galeria
    const { status } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permissão negada",
        "É necessário permitir o acesso à galeria para adicionar uma capa."
      );
      return;
    }

    // Abre a galeria
    const result = await ImagePicker.launchImageLibraryAsync({
      // ✅ API nova: em vez de MediaTypeOptions / MediaType enum
      mediaTypes: ["images"], // só imagens
      allowsEditing: true,
      quality: 1,
    });

    // Se o usuário escolheu algo
    if (!result.canceled) {
      // futuramente você pode guardar result.assets[0].uri
      setCapaSelecionada(true);
    }
  }

  function handleSalvar() {
    if (!titulo.trim()) {
      Alert.alert("Atenção", "Por favor, insira o título da história.");
      return;
    }

    Alert.alert(
      "História salva!",
      `Título: ${titulo}\nDescrição: ${descricao}\nCapa: ${
        capaSelecionada ? "Selecionada" : "Nenhuma"
      }`
    );

    return router.navigate('/(historias)/historias/minhas');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Criar Nova História</Text>

      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o título"
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Digite uma breve descrição"
        multiline
        numberOfLines={4}
        value={descricao}
        onChangeText={setDescricao}
      />

      <TouchableOpacity style={styles.botaoCapa} onPress={handleSelecionarCapa}>
        <Text style={styles.textoBotaoCapa}>Adicionar capa</Text>
      </TouchableOpacity>

      {capaSelecionada && (
        <Text style={styles.mensagemCapa}>✅ Capa selecionada!</Text>
      )}

      <View style={{ marginTop: 24 }}>
        <Button title="Salvar História" onPress={handleSalvar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  botaoCapa: {
    backgroundColor: "#6C63FF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  textoBotaoCapa: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  mensagemCapa: {
    color: "green",
    fontSize: 14,
    marginBottom: 12,
  },
});
