import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const httpClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "http://localhost:8080/",
});

httpClient.interceptors.request.use(config => {
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