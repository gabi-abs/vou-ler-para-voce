package com.voulerparavoce.repository;

import com.voulerparavoce.entity.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface FavoritoRepository extends JpaRepository<Favorito, Integer> {

    Optional<Favorito> findByUsuarioIdAndHistoriaId(Integer usuarioId, Integer historiaId);

    List<Favorito> findByUsuarioId(Integer usuarioId);

}
