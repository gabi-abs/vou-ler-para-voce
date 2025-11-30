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

const tratarEnderecoCapa = (capa: string): string => {
  if (capa?.includes("http")) {
    return capa;
  }
  return `${process.env.EXPO_PUBLIC_API_URL}${capa}`;
};

export const historiaService = {
  async listar(): Promise<Historia[]> {
    const { data } = await httpClient.get("/api/historia/listar");

    const newData = data.map((item: any) => ({
      ...item,
      capa: tratarEnderecoCapa(item.capa), // mapear capaUrl para capa
    }));

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
  },

  async favoritas(): Promise<Historia[]> {
    const { data } = await httpClient.get("/api/historia/favoritas");

    const newData = data.map((item: any) => ({
      ...item,
      capa: tratarEnderecoCapa(item.capa),
    }));


    return newData;
  },

  async listarPorHistoriaId(historiaId: number): Promise<Historia> {
    const { data } = await httpClient.get(`/api/historia/listarPorHistoriaId/${historiaId}`);

    // Mapear URLs dos áudios para incluir o endereço base
    const historiaComAudios = {
      ...data,
      capa: data.capa?.includes("http") ? data.capa : `${process.env.EXPO_PUBLIC_API_URL}${data.capa}`,
      audios: data.audios?.map((audio: any) => ({
        ...audio,
        audioUrl: audio.audio?.includes("http")
          ? audio.audio
          : `${process.env.EXPO_PUBLIC_API_URL}${audio.audio}`
      })) || []
    };

    return historiaComAudios;
  },

  async deletar(historiaId: number): Promise<void> {
    await httpClient.delete(`/api/historia/deletar/${historiaId}`);
  }

};