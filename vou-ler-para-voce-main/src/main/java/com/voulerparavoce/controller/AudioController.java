package com.voulerparavoce.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.voulerparavoce.dto.request.AudioDTORequest;
import com.voulerparavoce.dto.response.AudioDTOResponse;
import com.voulerparavoce.service.AudioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;

@RestController
@RequestMapping("/api/audio")
@Tag(name="Audio", description = "Api de gerenciamento de audios")
public class AudioController {

    private AudioService audioService;
    private final ObjectMapper objectMapper;

    public AudioController(AudioService audioService, ObjectMapper objectMapper) {
        this.audioService = audioService;
        this.objectMapper = objectMapper;
    }


    @PostMapping(value = "/criar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Criar áudios", description = "Endpoint para criar áudios com arquivo")
    public ResponseEntity<?> criarAudio(
            @RequestParam("dados") String dadosJson,
            @RequestPart("arquivo") MultipartFile arquivo) throws IOException {

        AudioDTORequest audioDTORequest = objectMapper.readValue(dadosJson, AudioDTORequest.class);

        byte[] conteudo = arquivo.getBytes();

        AudioDTOResponse response = audioService.criarAudio(audioDTORequest, conteudo);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/deletar/{audioId}")
    @Operation(summary = "Deletar audio por ID", description = "Endpoint para inativar (status = 0) um audio")
    public ResponseEntity<Void> deletarAudio(@PathVariable Integer audioId) {
        audioService.deletarPorAudioId(audioId);
        return ResponseEntity.noContent().build(); // 204 sem corpo
    }


}
