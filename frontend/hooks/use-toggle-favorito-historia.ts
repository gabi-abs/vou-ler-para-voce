import { favoritoService } from "@/api/favoritoService";
import { useUserInfo } from "@/hooks/use-user-info";
import type Historia from "@/interfaces/HistoriaInterface";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ToggleArgs = {
  historia: Historia;
};

export function useToggleFavoritoHistoria() {
  const queryClient = useQueryClient();
  const { data: usuario } = useUserInfo();
  const usuarioId = usuario?.id;

  return useMutation({
    mutationFn: async ({ historia }: ToggleArgs) => {
      if (!usuarioId) {
        throw new Error("Usuário não autenticado.");
      }

      const historiaId = Number(historia.id);

      if (historia.favoritado) {
        // se JÁ era favorita → remover
        return favoritoService.remover(usuarioId, historiaId);
      } else {
        // se NÃO era favorita → adicionar
        return favoritoService.adicionar(usuarioId, historiaId);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["historias"] });
      queryClient.invalidateQueries({ queryKey: ["historias-favoritas"] });
    },

    onError: (error) => {
      console.log("Erro ao favoritar/desfavoritar:", error?.message);
    },
  });
}
