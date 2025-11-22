import Usuario from "@/interfaces/Usuario";
import { httpClient } from "./httpClient";

export const usuarioService = {
  async login(authForm: any): Promise<any> {
    const { data } = await httpClient.post("/api/usuario/login", authForm);
    console.log("login data:", data);
    return data;
  },

  async getUserInfo(): Promise<Usuario> {
    const { data } = await httpClient.get("/api/usuario/user-info");
    return data;
  }
};

export { Usuario };
