import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    const form = {
      email: email,
      senha: senha,
    };
    login(form);
  };

  return (
    <View style={styles.container}>
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
        <Text style={styles.buttonText}>LOGIN</Text>
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
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    width: 250,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    width: 250,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },  
});