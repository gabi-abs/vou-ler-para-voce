import { usuarioService } from "@/api/usuarioService";
import { useQuery } from "@tanstack/react-query";

export function useUsuario() {
  return useQuery({
    queryKey: ["usuario"],
    queryFn: usuarioService.login,
  });
}