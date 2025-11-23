import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const httpClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "http://academico3.rj.senac.br/voulerparavoce",
});

httpClient.interceptors.request.use(async config => {
  // Não adiciona o token para requisições de /api/usuarios
  if (["/api/usuario/login", "/api/usuario/criar"].includes(config.url as string)) {
    return config;
  }

  const token = await SecureStore.getItemAsync("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});