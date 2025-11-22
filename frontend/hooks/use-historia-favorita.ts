import { historiaService } from "@/api/historiaService";
import { useQuery } from "@tanstack/react-query";
import type Historia from "@/interfaces/HistoriaInterface";

// se quiser manter o normalize genérico para outras listas
function normalizeGenerico(resp: any): Historia[] {
  const list = Array.isArray(resp)
    ? resp
    : Array.isArray(resp?.data)
    ? resp.data
    : Array.isArray(resp?.content)
    ? resp.content
    : [];

  return list.map((h: any) => ({
    id: String(
      h.id ??
        h.uuid ??
        h._id ??
        `${Math.random().toString(36).slice(2)}${Date.now()}`
    ),
    titulo: h.titulo ?? h.nome ?? "Sem título",
    texto: h.texto ?? h.descricao ?? "",
    capa: h.capa ?? h.capaUrl ?? h.coverUrl ?? "",
    // aqui deixamos genérico para outros usos
    favoritado: Boolean(h.favoritado ?? h.favorita ?? h.isFavorite ?? false),
  })) as Historia[];
}

// para FAVORITAS, a gente garante favoritado = true
function normalizeFavoritas(resp: any): Historia[] {
  const base = normalizeGenerico(resp);
  return base.map((h) => ({
    ...h,
    favoritado: true, // 👈 TUDO AQUI É FAVORITA MESMO
  }));
}

export function useHistoriasFavoritas() {
  return useQuery<Historia[]>({
    queryKey: ["historias-favoritas"],
    queryFn: async () => {
      const resp = await historiaService.favoritas();
      return resp;
    },
    select: normalizeFavoritas, 
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}
