package com.voulerparavoce.repository;

import com.voulerparavoce.entity.Historia;
import com.voulerparavoce.entity.Usuario;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HistoriaRepository extends JpaRepository<Historia, Integer> {
    @Query("""
    SELECT DISTINCT h
    FROM Historia h
    JOIN h.favoritos f
    WHERE h.status = 1 AND f.usuario.id = :usuarioId
""")
    List<Historia> listarHistoriasFavoritadasPorUsuario(@Param("usuarioId") Integer usuarioId);

    @Query("SELECT h FROM Historia h WHERE h.status = 1 AND h.usuario.id = :usuarioId")
    List<Historia> listarHistoriasAtivosPorUsuario(@Param("usuarioId") Integer usuarioId);

    @Query(
    """
    SELECT DISTINCT h 
    FROM Historia h
    LEFT JOIN FETCH h.audios a
    WHERE h.id = :id
      AND h.status = 1
      AND (a IS NULL OR a.status = 1)
    """)
    Historia ObterHistoriaPeloId(@Param("id")Integer historiaId);

    @Modifying
    @Transactional
    @Query("UPDATE Historia h SET h.status = 0 WHERE h.id = :id")
    void apagarHistoria(@Param("id")Integer historiaId);

    List<Historia> findByUsuarioIdAndStatusGreaterThanEqual(Integer usuarioId, int i);
}
