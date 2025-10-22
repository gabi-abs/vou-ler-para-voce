package com.voulerparavoce.controller;

import com.voulerparavoce.dto.request.TrilhaSonoraDTORequest;
import com.voulerparavoce.dto.response.TrilhaSonoraDTOResponse;
import com.voulerparavoce.entity.TrilhaSonora;
import com.voulerparavoce.service.TrilhaSonoraService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/trilhasonora")
@Tag(name="Trilha Sonora", description = "Api de gerenciamento de trilha sonora")
public class TrilhaSonoraController {

    private TrilhaSonoraService trilhaSonoraService;

    public TrilhaSonoraController(TrilhaSonoraService trilhaSonoraService) {
        this.trilhaSonoraService = trilhaSonoraService;
    }

    @PostMapping(value = "/criar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Criar trilha sonora", description = "Permite que o administrador faça upload de uma trilha sonora")
    public ResponseEntity<TrilhaSonoraDTOResponse> criar(
            @RequestParam("nome") String nome,
            @RequestParam("arquivo") MultipartFile arquivo) throws IOException {

        TrilhaSonoraDTORequest request = new TrilhaSonoraDTORequest();
        request.setNome(nome);

        TrilhaSonoraDTOResponse response =
                trilhaSonoraService.criarTrilhaSonora(request, arquivo.getBytes());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/listar")
    @Operation(summary = "Listar trilhas sonoras", description = "Retorna todas as trilhas sonoras cadastradas")
    public ResponseEntity<List<TrilhaSonoraDTOResponse>> listar() {
        return ResponseEntity.ok(trilhaSonoraService.listarTrilhas());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar trilha sonora por ID", description = "Retorna os dados de uma trilha sonora específica")
    public ResponseEntity<TrilhaSonoraDTOResponse> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(trilhaSonoraService.buscarPorId(id));
    }

    @DeleteMapping("/deletar/{id}")
    @Operation(summary = "Deletar trilha sonora", description = "Permite que o administrador remova uma trilha sonora")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        trilhaSonoraService.deletarTrilha(id);
        return ResponseEntity.noContent().build();
    }



}
