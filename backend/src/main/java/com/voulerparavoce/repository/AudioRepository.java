package com.voulerparavoce.repository;

import com.voulerparavoce.entity.Audio;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AudioRepository extends JpaRepository<Audio, Integer> {

    @Modifying
    @Transactional
    @Query("UPDATE Audio a SET a.status = 0 WHERE a.id = :id")
    void apagarAudio(Integer id);

    @Query("SELECT a FROM Audio a WHERE a.historia.id = :historiaId AND a.usuario.id = :usuarioId AND a.status >= 1 ORDER BY a.ordem ASC")
    List<Audio> findByHistoriaAndUsuario(@Param("historiaId") Integer historiaId, @Param("usuarioId") Integer usuarioId);

}
