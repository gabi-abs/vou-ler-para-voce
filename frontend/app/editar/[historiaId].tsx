import HistoriasMock from "@/mocks/historias";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Historia {
  id: string;
  titulo: string;
  descricao?: string;
  capaUrl?: string;
}

export default function EditarHistoriaScreen() {
  const { historiaId } = useLocalSearchParams() as { historiaId: string };
  const router = useRouter();

  const historiaAtual: Historia | undefined = useMemo(() => {
    return (HistoriasMock as Historia[]).find((h) => h.id === historiaId);
  }, [historiaId]);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [capaSelecionada, setCapaSelecionada] = useState(false);
  const [capaUri, setCapaUri] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (historiaAtual) {
      setTitulo(historiaAtual.titulo || "");
      setDescricao(historiaAtual.descricao || "");
      setCapaSelecionada(!!historiaAtual.capaUrl);
      setCapaUri(historiaAtual.capaUrl);
    }
  }, [historiaAtual]);

  async function handleSelecionarCapa() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permissão negada",
        "É necessário permitir o acesso à galeria para adicionar uma capa."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setCapaSelecionada(true);
      setCapaUri(result.assets?.[0]?.uri);
    }
  }

  function handleSalvar() {
    if (!titulo.trim()) {
      Alert.alert("Atenção", "Por favor, insira o título da história.");
      return;
    }

    // Atualiza no mock em memória (efeito apenas durante a execução do app)
    const lista = HistoriasMock as Historia[];
    const index = lista.findIndex((h) => h.id === historiaId);
    if (index >= 0) {
      lista[index] = {
        ...lista[index],
        titulo: titulo.trim(),
        descricao: descricao,
        capaUrl: capaUri || lista[index].capaUrl,
      };
    }

    Alert.alert("História atualizada!", "Suas alterações foram salvas.");
    router.navigate("/minhas");
  }

  if (!historiaAtual) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <Text style={{ textAlign: "center" }}>
          História não encontrada. Volte e tente novamente.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Editar História</Text>

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
        placeholder="Edite a sua história aqui.."
        placeholderTextColor="#AF9D8D"
        multiline
        numberOfLines={4}
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Capa</Text>
      <TouchableOpacity style={styles.botaoCapa} onPress={handleSelecionarCapa}>
        <Ionicons name="camera-outline" size={40} color="#573212" />
        <Text style={styles.textoBotaoCapa}>
          {capaSelecionada ? "Trocar capa" : "+ Adicionar capa"}
        </Text>
      </TouchableOpacity>

      {capaSelecionada && (
        <Text style={styles.mensagemCapa}>✅ Capa selecionada!</Text>
      )}

      <View>
        <Pressable style={styles.botaoSalvar} onPress={handleSalvar}>
          <Text style={styles.textoBotaoSalvar}>Salvar alterações</Text>
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
    paddingVertical: 8,
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
    paddingVertical: 12,
  },
  textoBotaoSalvar: {
    color: "#D16314",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});