package com.voulerparavoce.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.voulerparavoce.dto.request.HistoriaDTORequest;
import com.voulerparavoce.dto.response.HistoriaDTOResponse;
import com.voulerparavoce.service.HistoriaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/historia")
@Tag(name="Historia", description = "Api de gerenciamento de historias")
public class HistoriaController {

    private HistoriaService historiaService;
    private final ObjectMapper objectMapper;

    public HistoriaController(HistoriaService historiaService, ObjectMapper objectMapper) {
        this.historiaService = historiaService;
        this.objectMapper = objectMapper;
    }

    @PostMapping(value = "/criar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Criar histórias", description = "Endpoint para criar historias com arquivo")
    public ResponseEntity<?> criarHistoria(
            @RequestParam("dados") String dadosJson,
            @RequestParam(value = "arquivo", required = false) MultipartFile arquivo
    ) throws IOException {

        byte[] conteudo = (arquivo != null) ? arquivo.getBytes() : null;
        String nomeArquivo = (arquivo != null) ? arquivo.getOriginalFilename() : null;

        HistoriaDTORequest historiaDTORequest = objectMapper.readValue(dadosJson, HistoriaDTORequest.class);
        HistoriaDTOResponse response = historiaService.criarHistoria(historiaDTORequest, conteudo, nomeArquivo);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/listar")
    @Operation(summary="Listar historias ativas", description="Endpoint para listar todos as historias ativas do usuário logado")
    public ResponseEntity<List<HistoriaDTOResponse>> listarHistorias() {
        return ResponseEntity.ok(historiaService.listarHistoriasAtivosDoUsuario());
    }

    @GetMapping("/favoritas")
    @Operation(summary="Minhas histórias favoritas", description="Lista apenas as histórias que o usuário favoritou")
    public ResponseEntity<List<HistoriaDTOResponse>> listarHistoriasFavoritas() {
        return ResponseEntity.ok(historiaService.listarHistoriasFavoritasDoUsuario());
    }


    @GetMapping("/listarPorHistoriaId/{historiaId}")
    @Operation(summary="Listar historias pelo id", description="Endpoint para listar a historia pelo id")
    public ResponseEntity<HistoriaDTOResponse> listarPorHistoriaId(@PathVariable("historiaId") Integer historiaId) {
        HistoriaDTOResponse historiaDTO = historiaService.listarPorHistoriaId(historiaId);
        return ResponseEntity.ok(historiaDTO);
    }

    @PutMapping(value = "/atualizar/{historiaId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Atualizar história", description = "Endpoint para atualizar uma história existente com capa opcional")
    public ResponseEntity<?> atualizarHistoria(
            @PathVariable("historiaId") Integer historiaId,
            @RequestParam("dados") String dadosJson,
            @RequestParam(value = "arquivo", required = false) MultipartFile arquivo
    ) throws IOException {
        byte[] conteudo = (arquivo != null) ? arquivo.getBytes() : null;
        String nomeArquivo = (arquivo != null) ? arquivo.getOriginalFilename() : null;

        HistoriaDTORequest historiaDTORequest = objectMapper.readValue(dadosJson, HistoriaDTORequest.class);
        HistoriaDTOResponse response = historiaService.atualizarHistoria(historiaId, historiaDTORequest, conteudo, nomeArquivo);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/deletar/{historiaId}")
    @Operation(summary = "Deletar historia por ID", description = "Endpoint para inativar (status = 0) uma história")
    public ResponseEntity<Void> deletarHistoria(@PathVariable Integer historiaId) {
        historiaService.deletarPorHistoriaId(historiaId);
        return ResponseEntity.noContent().build(); // 204 sem corpo
    }

// Endpoint Extra - LISTA TODAS AS HISTORIAS
//    @GetMapping("/usuario/{usuarioId}")
//    @Operation(summary = "Listar histórias de um usuário", description = "Retorna todas as histórias criadas por um usuário específico")
//    public ResponseEntity<List<HistoriaDTOResponse>> listarPorUsuario(@PathVariable Integer usuarioId) {
//        List<HistoriaDTOResponse> historias = historiaService.listarHistoriasPorUsuario(usuarioId);
//        return ResponseEntity.ok(historias);
//    }

    //Lista somente as historias ativas
    @GetMapping("/usuario/{usuarioId}")
    @Operation(summary = "Listar histórias de um usuário",
            description = "Retorna todas as histórias ativas de um usuário específico")
    public ResponseEntity<List<HistoriaDTOResponse>> listarPorUsuario(@PathVariable Integer usuarioId) {
        List<HistoriaDTOResponse> historias = historiaService.listarHistoriasPorUsuario(usuarioId);
        return ResponseEntity.ok(historias);
    }

}
