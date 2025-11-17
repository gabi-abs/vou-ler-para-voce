// hooks/useHistoriasFavoritas.ts
import { historiaService } from "@/api/historiaService";
import { useQuery } from "@tanstack/react-query";
import type Historia from "@/interfaces/HistoriaInterface";

function normalize(resp: any): Historia[] {
  const list = Array.isArray(resp) ? resp
    : Array.isArray(resp?.data) ? resp.data
    : Array.isArray(resp?.content) ? resp.content
    : [];
  return list.map((h: any) => ({
    id: String(h.id ?? h.uuid ?? h._id ?? `${Math.random().toString(36).slice(2)}${Date.now()}`),
    titulo: h.titulo ?? h.nome ?? "Sem título",
    texto: h.texto ?? h.descricao ?? "",
    capa: h.capa ?? h.capaUrl ?? h.coverUrl ?? "",
    favoritado: Boolean(h.favoritado ?? h.favorita ?? h.isFavorite ?? true),
  })) as Historia[];
}

export function useHistoriasFavoritas() {
  return useQuery<Historia[]>({
    queryKey: ["historias-favoritas"],
    queryFn: async () => {
      const resp = await historiaService.favoritas(); // <-- CHAMAR a função
      return resp;
    },
    select: normalize, // opcional, mas ajuda a padronizar
    staleTime: 5 * 60 * 1000,        // 5 min sem refetch ao remontar
    gcTime: 30 * 60 * 1000,          // 30 min no cache
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}
