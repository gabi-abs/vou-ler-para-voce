import Historia from "@/interfaces/HistoriaInterface";
import { httpClient } from "./httpClient";

interface CriarHistoriaDTO {
  titulo: string;
  texto: string;
  status: number;
  usuarioId: number;
  trilhaSonoraId?: number[];
}

interface AtualizarHistoriaDTO {
  titulo: string;
  texto: string;
  status: number;
  usuarioId: number;
  trilhaSonoraId?: number[];
}

export const historiaService = {
  async listar(): Promise<Historia[]> {
    const { data } = await httpClient.get("/api/historia/listar");

    const newData = data.map((item: any) => ({
      ...item,
      capa: item.capa.includes("http") ? item.capa : `${process.env.EXPO_PUBLIC_API_URL}${item.capa}`, // mapear capaUrl para capa
    }));

    console.log("listar historias data:", newData);
    return newData;
  },

  async criar(dados: CriarHistoriaDTO, arquivo?: { uri: string; name: string; type: string }): Promise<Historia> {
    const formData = new FormData();

    // Adiciona os dados da história como JSON string
    formData.append('dados', JSON.stringify(dados));

    // Adiciona o arquivo da capa, se fornecido
    if (arquivo) {
      // FormData no React Native aceita objetos com uri, name e type
      formData.append('arquivo', {
        uri: arquivo.uri,
        name: arquivo.name,
        type: arquivo.type,
      } as any);
    }

    const { data } = await httpClient.post("/api/historia/criar", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  },

  async atualizar(historiaId: number, dados: AtualizarHistoriaDTO, arquivo?: { uri: string; name: string; type: string }): Promise<Historia> {
    const formData = new FormData();

    // Adiciona os dados da história como JSON string
    formData.append('dados', JSON.stringify(dados));

    // Adiciona o arquivo da capa, se fornecido
    if (arquivo) {
      formData.append('arquivo', {
        uri: arquivo.uri,
        name: arquivo.name,
        type: arquivo.type,
      } as any);
    }

    const { data } = await httpClient.put(`/api/historia/atualizar/${historiaId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  }
};