import { usuarioService } from "@/api/usuarioService";
import { useDialog } from "@/context/DialogContext";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

interface CriarUsuarioProps {
  onVoltar: () => void;
  onCadastroSucesso?: () => void;
}

export default function CriarUsuario({ onVoltar, onCadastroSucesso }: CriarUsuarioProps) {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const { abrirDialog } = useDialog();

  const handleCadastro = async () => {
    // Validações
    if (!email || !nome || !senha || !confirmarSenha) {
      abrirDialog({
        title: "Erro",
        message: "Por favor, preencha todos os campos.",
        confirmText: "Confirmar",
      });
      return;
    }

    if (senha !== confirmarSenha) {
      abrirDialog({
        title: "Erro",
        message: "As senhas não coincidem.",
        confirmText: "Confirmar",
      });
      //
      return;
    }

    if (senha.length < 6) {
      abrirDialog({
        title: "Erro",
        message: "A senha deve ter pelo menos 6 caracteres.",
        confirmText: "Confirmar",
      });
      //
      return;
    }

    setLoading(true);
    try {
      const registerForm = {
        email: email.trim(),
        nome: nome.trim(),
        senha: senha,
      };

      await usuarioService.criar(registerForm);


      abrirDialog({
        title: "Sucesso",
        message: "Cadastro realizado com sucesso!",
        confirmText: "Confirmar",
        onConfirm: () => {
          onCadastroSucesso?.();
          onVoltar();
        }
      });
      
    } catch (error: any) {
      const mensagemErro = error.response?.data?.message || "Erro ao realizar cadastro. Tente novamente.";

      abrirDialog({
        title: "Erro",
        message: mensagemErro,
        confirmText: "Confirmar",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titulo}>Cadastre-se</Text>
      </View>

      <TextInput 
        placeholder="Nome completo" 
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        editable={!loading}
      />

      <TextInput 
        placeholder="Email" 
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        editable={!loading}
      />

      <TextInput 
        placeholder="Senha" 
        value={senha}
        onChangeText={setSenha}
        secureTextEntry 
        style={styles.input}
        editable={!loading}
      />

      <TextInput 
        placeholder="Confirmar senha" 
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry 
        style={styles.input}
        editable={!loading}
      />

      <Pressable 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleCadastro}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Text>
      </Pressable>

      <Pressable onPress={onVoltar} disabled={loading}>
        <Text style={styles.voltarText}>Já tem conta? Faça login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    color: "#D87443",
    fontWeight: "bold",
    fontSize: 50,
    marginBottom: 40,
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#EAE0EF",
    borderRadius: 10,
    padding: 12,
    width: 300,
    backgroundColor: "#FFFFFD",
  },
  button: {
    backgroundColor: "#fee19c",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    width: 300,
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#804825",
    fontWeight: "bold",
    fontSize: 18,
  },
  voltarText: {
    color: "#1D0E85",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20,
  },
});
