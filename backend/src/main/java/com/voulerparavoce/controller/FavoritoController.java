package com.voulerparavoce.controller;

import com.voulerparavoce.dto.request.FavoritoDTORequest;
import com.voulerparavoce.dto.response.FavoritoDTOResponse;
import com.voulerparavoce.service.FavoritoService;
import com.voulerparavoce.service.HistoriaService;
import com.voulerparavoce.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorito")
@Tag(name="Favorito", description = "Api de gerenciamento de favorito")
public class FavoritoController {

    private FavoritoService favoritoService;

    public FavoritoController(FavoritoService favoritoService) {
        this.favoritoService = favoritoService;
    }

    @PostMapping("/adicionar")
    @Operation(summary = "Adicionar favorito", description = "Favorita uma história para o usuário")
    public ResponseEntity<FavoritoDTOResponse> adicionar(@RequestBody FavoritoDTORequest request) {
        FavoritoDTOResponse response =
                favoritoService.adicionarFavorito(request.getUsuarioId(), request.getHistoriaId());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/usuario/{usuarioId}")
    @Operation(summary = "Listar favoritos de um usuário", description = "Lista todas as histórias favoritedas por um usuário")
    public ResponseEntity<List<FavoritoDTOResponse>> listarPorUsuario(@PathVariable Integer usuarioId) {
        return ResponseEntity.ok(favoritoService.listarPorUsuario(usuarioId));
    }

    @DeleteMapping("/remover")
    @Operation(summary = "Remover favorito", description = "Remove uma história dos favoritos do usuário")
    public ResponseEntity<Void> remover(@RequestBody FavoritoDTORequest request) {
        favoritoService.removerFavorito(request.getUsuarioId(), request.getHistoriaId());
        return ResponseEntity.noContent().build();
    }
}
