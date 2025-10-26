import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
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

    return router.navigate('/minhas');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Criar Nova História</Text>

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
      <Text style={styles.label}>Capa</Text>
      <TouchableOpacity style={styles.botaoCapa} onPress={handleSelecionarCapa}>
      <Ionicons name="camera-outline" size={40} color="#573212" />
        <Text style={styles.textoBotaoCapa}>+ Adicionar capa</Text>
      </TouchableOpacity>

      {capaSelecionada && (
        <Text style={styles.mensagemCapa}>✅ Capa selecionada!</Text>
      )}

     
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
    color: "#D87443"
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
   // color: "#AF9D8D"
    
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
    backgroundColor: "#fff",
  
  },
  botaoCapa: {
    backgroundColor: "#F5FAEA",
    paddingVertical: 12,
    borderRadius: 8,
    borderColor: "#DEE9DC",
    borderWidth: 2,
    alignItems: "center",
    marginBottom: 8,
    height: 110,
    width: 110,
  
  },
  textoBotaoCapa: {
    color: "#573212",
    fontWeight: "500",
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 8
  },
  mensagemCapa: {
    color: "green",
    fontSize: 14,
    marginBottom: 12,
  },

  botaoSalvar: {
    margin: 24, 
    backgroundColor: "#FFE187", 
    borderRadius: 20, 
    height: 50, 
    borderWidth: 2,
    borderColor: "#E9C66C", 
    paddingVertical: 12

  },

  textoBotaoSalvar: {
    color: "#D16314", 
    textAlign: "center", 
    fontWeight: "bold", 
    fontSize: 20

  }
  
});
