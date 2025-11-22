import { httpClient } from "./httpClient";

interface CriarAudioDTO {
  ordem: number;
  usuarioId: number;
  historiaId: number;
}

export const audioService = {
  async criar(
    dados: CriarAudioDTO,
    arquivo: { uri: string; name: string; type: string }
  ): Promise<any> {
    const formData = new FormData();

    // Adiciona os dados do áudio como JSON string
    formData.append('dados', JSON.stringify(dados));

    // Adiciona o arquivo de áudio
    formData.append('arquivo', {
      uri: arquivo.uri,
      name: arquivo.name,
      type: arquivo.type,
    } as any);

    const { data } = await httpClient.post("/api/audio/criar", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  },
};
