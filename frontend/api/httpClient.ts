import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const httpClient = axios.create({
  baseURL: "http://192.168.0.5:9090/",
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