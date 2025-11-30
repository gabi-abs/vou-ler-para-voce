import { historiaService } from "@/api/historiaService";
import CapaSelector from "@/components/ui/CapaSelector";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput } from "react-native";

export default function CriarNovaHistoria() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [capaUri, setCapaUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { usuario } = useAuth();

  async function handleSalvar() {
    if (!titulo.trim()) {
      Alert.alert("Atenção", "Por favor, insira o título da história.");
      return;
    }

    if (!descricao.trim()) {
      Alert.alert("Atenção", "Por favor, insira a descrição da história.");
      return;
    }

    if (!usuario?.id) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    setLoading(true);
    
    try {
      const dados = {
        titulo,
        texto: descricao,
        status: 1,
        usuarioId: usuario.id,
        trilhaSonoraId: []
      };

      let arquivo = undefined;
      if (capaUri) {
        const fileName = capaUri.split('/').pop() || 'capa.jpg';
        // Detectar extensão do arquivo
        const extension = fileName.split('.').pop()?.toLowerCase() || 'jpg';
        
        // Mapear extensão para tipo MIME correto
        const mimeTypes: { [key: string]: string } = {
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'webp': 'image/webp',
          'gif': 'image/gif',
        };
        
        const fileType = mimeTypes[extension] || 'image/jpeg';
        
        // iOS precisa remover file://, Android mantém como está
        arquivo = {
          uri: Platform.OS === 'ios' ? capaUri.replace('file://', '') : capaUri,
          name: fileName,
          type: fileType
        };
        
        console.log('Arquivo preparado para upload:', arquivo);
      }

      await historiaService.criar(dados, arquivo);
      
      Alert.alert(
        "Sucesso!",
        "História criada com sucesso!",
        [
          {
            text: "OK",
            onPress: () => router.navigate("/(historias)/minhas")
          }
        ]
      );
    } catch (error: any) {
      console.error("Erro ao criar história:", error);
      Alert.alert(
        "Erro",
        error?.response?.data?.message || "Não foi possível criar a história. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ padding: 20, paddingBottom: 80 }}
        >
          <Text style={styles.titulo}>Criar Nova História</Text>

          <CapaSelector value={capaUri} onChange={setCapaUri} />

          <Text style={styles.label}>Título</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o título da sua história.."
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

          <Pressable 
            style={[styles.botaoSalvar, loading && styles.botaoDesabilitado]} 
            onPress={handleSalvar}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#C3782C" />
            ) : (
              <Text style={styles.textoBotaoSalvar}>Salvar História</Text>
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
