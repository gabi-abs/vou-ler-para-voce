import CapaSelector from "@/components/ui/CapaSelector";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function CriarNovaHistoria() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [capaUri, setCapaUri] = useState<string | null>(null);
  const router = useRouter();

  function handleSalvar() {
    if (!titulo.trim()) {
      Alert.alert("Atenção", "Por favor, insira o título da história.");
      return;
    }

    Alert.alert(
      "História salva!",
      `Título: ${titulo}\nDescrição: ${descricao}\nCapa: ${capaUri ? "Selecionada" : "Nenhuma"}`
    );

    router.navigate("/minhas");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Criar Nova História</Text>

      <CapaSelector value={capaUri} onChange={setCapaUri} />

      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o título.."
        placeholderTextColor="#AF9D8D"
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Digite a sua história aqui.."
        placeholderTextColor="#AF9D8D"
        multiline
        numberOfLines={4}
        value={descricao}
        onChangeText={setDescricao}
      />

      <View>
        <Pressable style={styles.botaoSalvar} onPress={handleSalvar}>
          <Text style={styles.textoBotaoSalvar}>Salvar História</Text>
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
