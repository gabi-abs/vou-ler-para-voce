import { usuarioService } from "@/api/usuarioService";
import Usuario from "@/interfaces/Usuario";
import * as SecureStore from "expo-secure-store";
import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextData {
  usuario?: Usuario | null;
  login: (authForm: any) => Promise<void>;
  logout?: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function logout() {
    SecureStore.deleteItemAsync("token");
    setUsuario(null);
    setIsAuthenticated(false);
  }

  async function login(authForm: any) {
    setLoading(true);
    try {
      const { token } = await usuarioService.login(authForm);
      SecureStore.setItem("token", token);
      setIsAuthenticated(true);
      
      // Buscar informações do usuário após o login
      const usuarioInfo = await usuarioService.getUserInfo();
      setUsuario(usuarioInfo);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
}


// hook customizado para facilitar o uso
export function useAuth() {
  return useContext(AuthContext);
}