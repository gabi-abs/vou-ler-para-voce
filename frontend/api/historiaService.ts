import Historia from "@/interfaces/HistoriaInterface";
import { httpClient } from "./httpClient";

export const historiaService = {
  async listar(): Promise<Historia[]> {
    const { data } = await httpClient.get("/api/historia/listar");
    console.log("listar historias data:", data);
    return data;
  }
};