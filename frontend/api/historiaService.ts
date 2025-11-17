import Historia from "@/interfaces/HistoriaInterface";
import { httpClient } from "./httpClient";

export const historiaService = {
  async listar(): Promise<Historia[]> {
    const { data } = await httpClient.get("/api/historia/listar");
    return data;
  },
  
  async favoritas(): Promise<Historia[]> {
    const { data } = await httpClient.get("/api/historia/favoritas");
    return data;
  }

};