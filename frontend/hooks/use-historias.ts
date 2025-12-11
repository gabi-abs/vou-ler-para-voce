import { historiaService } from "@/api/historiaService";
import Historia from "@/interfaces/HistoriaInterface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useHistorias() {
  return useQuery({
    queryKey: ["historias"],
    queryFn: historiaService.listar,
  });
}

type AtualizarHistoriaParams = {
  historiaId: number;
  dados: any;
  arquivo?: {
    uri: string;
    name: string;
    type: string;
  };
};

export function useUpdateHistorias() {
  const queryClient = useQueryClient();

  return useMutation<Historia, Error, AtualizarHistoriaParams>({
    mutationFn: ({ historiaId, dados, arquivo }) => {
      return historiaService.atualizar(historiaId, dados, arquivo)
    },

    onMutate: async ({ historiaId, dados, arquivo }) => {
      queryClient.getQueryData<Historia[]>(["historias"]);

      queryClient.setQueryData<Historia[]>(["historias"], (oldData) => {
        if (!oldData) return oldData;
        return oldData.map((h) =>
          h.id === historiaId ? { ...h, ...dados } : h
        );
      });
    },

    onError: (error: Error) => {
      console.error("Erro ao atualizar história:", error.message);
      queryClient.invalidateQueries({ queryKey: ["historias"] });
    }
  });
}
