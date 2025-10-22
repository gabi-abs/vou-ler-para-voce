package com.voulerparavoce.controller;

import com.voulerparavoce.dto.LoginUserDto;
import com.voulerparavoce.dto.RecoveryJwtTokenDto;
import com.voulerparavoce.dto.request.UsuarioDTORequest;
import com.voulerparavoce.dto.response.UsuarioDTOResponse;
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
@RequestMapping("/api/usuario")
@Tag(name="Usuario", description = "Api de gerenciamento de usuarios")

public class UsuarioController {

    private UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }


    @PostMapping("/login")
    public ResponseEntity<RecoveryJwtTokenDto> authenticateUser(@RequestBody LoginUserDto loginUserDto) {
        RecoveryJwtTokenDto token = usuarioService.autentificaUsuario(loginUserDto);
        return new ResponseEntity<>(token, HttpStatus.OK);
    }

    @PostMapping("/criar")
    @Operation(summary="Criar usuarios", description="Endpoint para cadastrar um novo usuarios")
    public ResponseEntity<Void> criarUsuario(@Valid @RequestBody UsuarioDTORequest usuario){
        usuarioService.criarUsuario(usuario);
        return new ResponseEntity <> (HttpStatus.CREATED);

    }

    @GetMapping("/listar")
    @Operation(summary="Listar usuario", description="Endpoint para listar todos os usuarios")
    public ResponseEntity<List<UsuarioDTOResponse>> listarUsuarios() {
        return ResponseEntity.ok(usuarioService.listarUsuarios());
    }

    @GetMapping("/listarPorUsuarioId/{usuarioId}")
    @Operation(summary="Listar usuarios pelo id", description="Endpoint para listar o usuario pelo id")
    public ResponseEntity<UsuarioDTOResponse> listarPorUsuarioId(@PathVariable("usuarioId") Integer usuarioId) {
        UsuarioDTOResponse usuarioDTO = usuarioService.listarPorUsuarioId(usuarioId);
        return ResponseEntity.ok(usuarioDTO);
    }

    @PutMapping("/atualizarUsuario/{usuarioId}")
    @Operation(summary = "Atualizar usuário por ID")
    public ResponseEntity<UsuarioDTOResponse> atualizarUsuario(
            @PathVariable Integer usuarioId,
            @Valid @RequestBody UsuarioDTORequest usuarioDTORequest
    ) {
        UsuarioDTOResponse usuarioAtualizado = usuarioService.atualizarUsuario(usuarioId, usuarioDTORequest);
        return ResponseEntity.ok(usuarioAtualizado);
    }

    @DeleteMapping("/deletar/{usuarioId}")
    @Operation(summary = "Deletar usuário por ID", description = "Endpoint para inativar (status = -1) um usuário")
    public ResponseEntity<Void> deletarUsuario(@PathVariable Integer usuarioId) {
        usuarioService.deletarPorUsuarioId(usuarioId);
        return ResponseEntity.noContent().build(); // 204 sem corpo
    }

}
