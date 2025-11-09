import { usuarioService } from "@/api/usuarioService";
import * as SecureStore from "expo-secure-store";
import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextData {
  // usuario?: Usuario | null;
  // login?: (email: string, senha: string) => Promise<void>;
  // logout?: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthProvider mounted");
    login("email", "senha");
  }, []);

  async function login(email: string, senha: string) {
    console.log("login called with", email, senha);
    setLoading(true);
    try {
      const { token } = await usuarioService.login();
      SecureStore.setItemAsync("token", token);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ /* usuario, login, logout, */ loading }}>
      {children}
    </AuthContext.Provider>
  );
}
