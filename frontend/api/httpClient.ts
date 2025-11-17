import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const httpClient = axios.create({
<<<<<<< HEAD
  baseURL: "http://192.168.0.5:9090/",
=======
  baseURL: process.env.EXPO_PUBLIC_API_URL || "http://localhost:8080/",
>>>>>>> 02e112c57ce3f1b0e1a5909e5d717534f2c17702
});

httpClient.interceptors.request.use(async config => {
  // Não adiciona o token para requisições de /api/usuarios
  if (config.url?.includes("/api/usuario/login")) {
    return config;
  }

  const token = SecureStore.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});