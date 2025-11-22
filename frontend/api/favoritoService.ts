import { httpClient } from "./httpClient";

export const favoritoService = {
  async adicionar(usuarioId: number, historiaId: number) {
    return httpClient.post("/api/favorito/adicionar", {
      usuarioId,
      historiaId,
    });
  },

  async remover(usuarioId: number, historiaId: number) {
    return httpClient.delete("/api/favorito/remover", {
      data: { usuarioId, historiaId },
    });
  },
};
