package com.voulerparavoce.repository;

import com.voulerparavoce.entity.Usuario;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    @Query("SELECT u FROM Usuario u WHERE u.status >= 0")
    List<Usuario> listarUsuariosAtivos();

    @Query("SELECT u FROM Usuario u WHERE u.id = :id AND u.status >=0")
    Usuario ObterUsuarioPeloId(@Param("id")Integer usuarioId);

    @Modifying
    @Transactional
    @Query("UPDATE Usuario u SET u.status = -1 WHERE u.id = :id")
    void apagarUsuario(@Param("id")Integer usuarioId);

    Optional<Usuario> findByEmail(String email);
}
