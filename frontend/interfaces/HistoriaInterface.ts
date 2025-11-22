export interface HistoriaAudio {
  id: number;
  ordem: number;
  audio: string;
  audioUrl?: string;
  dataCriacao: string;
  status: number;
  usuarioId: number;
  historiaId: number;
}

export default interface Historia {
  id: number;
  titulo: string;
  capa: string;
  dataCriacao: string;
  status: number;
  texto: string;
  usuarioId: number;
  audios: HistoriaAudio[];
  trilhaSonoraId: number[];
  favoritado: boolean;
}