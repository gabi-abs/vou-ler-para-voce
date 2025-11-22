import { useQuery } from "@tanstack/react-query";
import { usuarioService } from "@/api/usuarioService";
import type { Usuario } from "@/api/usuarioService";

export function useUserInfo() {
  return useQuery<Usuario>({
    queryKey: ["user-info"],
    queryFn: usuarioService.getUserInfo,
    staleTime: 5 * 60 * 1000,
  });
}
