import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import CriarUsuario from "../CriarUsuario/CriarUsuario";

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarCadastro, setMostrarCadastro] = useState(false);

  const handleLogin = () => {
    const form = {
      email: email,
      senha: senha,
    };
    login(form);
  };

  if (mostrarCadastro) {
    return (
      <CriarUsuario 
        onVoltar={() => setMostrarCadastro(false)}
        onCadastroSucesso={() => {
          // Limpar os campos de login para o usuário poder fazer login
          setEmail("");
          setSenha("");
        }}
      />
    );
  }

  return (
    
    <View style={styles.container}>

    <View>
    <Text style={styles.titulo} > Vou ler</Text>
    </View>

    <View>
      <Text style={styles.titulo2}> para você </Text>
    </View>

      <TextInput 
        placeholder="Email" 
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input} 
        
      />
      <TextInput 
        placeholder="Senha" 
        value={senha}
        onChangeText={setSenha}
        secureTextEntry 
        style={styles.input} 
      />


      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>

      <Pressable>
        <Text style={styles.buttonText3} >Esqueci minha senha</Text>
      </Pressable>

      <View>
        <Text style={styles.text} >Ainda não tem conta?</Text>
      </View>

      <View>
        <Pressable onPress={() => setMostrarCadastro(true)}>
          <Text style={styles.buttonText2}>Cadastre-se</Text>
        </Pressable>
      </View>

    </View>
    

  );
}

const styles = StyleSheet.create({

  titulo:{
    color: "#D87443",
    fontWeight: "bold",
    fontSize: 60,
    
    
  },
  titulo2:{
    color: "#D87443",
    fontWeight: "bold",
    fontSize: 66,
    paddingBottom: 28

  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  buttonText: {
    color: "#804825",
    fontWeight: "bold",
    fontSize: 18
  },  
  text:{
    color: "#766964",
    marginTop: 35,
    fontSize: 20,
   
  },
  buttonText2:{
    color: "#1D0E85",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 8,
  },
  buttonText3:{
    color: "#1D0E85",
    fontSize: 15,
    marginTop: 8,
    fontWeight: "medium"
  }
});