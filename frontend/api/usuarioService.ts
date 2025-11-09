import { httpClient } from "./httpClient";

export const usuarioService = {
  async login(): Promise<any> {
    console.log("usuarioService.login called");
    const form = {
      email: "gabriella@gmail.com",
      senha: "gb",
    }
    const { data } = await httpClient.post("/api/usuario/login", form);
    console.log("login data:", data);
    return data;
  }
};