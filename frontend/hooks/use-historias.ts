import { historiaService } from "@/api/historiaService";
import { useQuery } from "@tanstack/react-query";

export function useHistorias() {
  return useQuery({
    queryKey: ["historias"],
    queryFn: historiaService.listar,
  });
}
