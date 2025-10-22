package com.voulerparavoce.service;

import com.voulerparavoce.dto.request.HistoriaDTORequest;
import com.voulerparavoce.dto.response.HistoriaDTOResponse;
import com.voulerparavoce.dto.response.UsuarioDTOResponse;
import com.voulerparavoce.entity.Historia;
import com.voulerparavoce.entity.TrilhaSonora;
import com.voulerparavoce.entity.Usuario;
import com.voulerparavoce.repository.HistoriaRepository;
import com.voulerparavoce.repository.TrilhaSonoraRepository;
import com.voulerparavoce.repository.UsuarioRepository;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HistoriaService {

    private HistoriaRepository historiaRepository;
    private UsuarioRepository usuarioRepository;
    private TrilhaSonoraRepository trilhaSonoraRepository;

    @Autowired
    private ModelMapper modelMapper;

    public HistoriaService(TrilhaSonoraRepository trilhaSonoraRepository, UsuarioRepository usuarioRepository, HistoriaRepository historiaRepository) {
        this.trilhaSonoraRepository = trilhaSonoraRepository;
        this.usuarioRepository = usuarioRepository;
        this.historiaRepository = historiaRepository;
    }


    @Transactional
    public HistoriaDTOResponse criarHistoria(HistoriaDTORequest historiaDTORequest, byte[] conteudo) {
        Historia historia = new Historia();
        historia.setTitulo(historiaDTORequest.getTitulo());
        historia.setCapa(historiaDTORequest.getCapa() != null ? historiaDTORequest.getCapa() : conteudo);
        historia.setTexto(historiaDTORequest.getTexto());
        historia.setDataCriacao(LocalDateTime.now());
        historia.setStatus(historiaDTORequest.getStatus());

        Usuario usuario = usuarioRepository.findById(historiaDTORequest.getUsuarioId()).get();
        historia.setUsuario(usuario);

        if (historiaDTORequest.getTrilhaSonoraId() != null) {
            List<TrilhaSonora> trilhas = trilhaSonoraRepository.findAllById(historiaDTORequest.getTrilhaSonoraId());
            historia.getTrilhasSonoras().addAll(trilhas);
        }

        Historia historiaSave = historiaRepository.save(historia);

        HistoriaDTOResponse response = modelMapper.map(historiaSave, HistoriaDTOResponse.class);
        response.setTrilhaSonoraId(historiaSave.getTrilhasSonoras().stream()
                .map(TrilhaSonora::getId)
                .toList());

        return response;
    }

    public List<HistoriaDTOResponse> listarHistorias() {
        List<Historia> historias = historiaRepository.listarHistoriasAtivos();
        return historias.stream()
                .map(historia -> {
                    HistoriaDTOResponse dto = modelMapper.map(historia, HistoriaDTOResponse.class);
                    dto.setTrilhaSonoraId(
                            historia.getTrilhasSonoras().stream()
                                    .map(TrilhaSonora::getId)
                                    .toList()
                    );
                    return dto;
                })
                .toList();
    }

    public HistoriaDTOResponse listarPorHistoriaId(Integer historiaId) {
        Historia historia = historiaRepository.ObterHistoriaPeloId(historiaId);
        HistoriaDTOResponse dto = modelMapper.map(historia, HistoriaDTOResponse.class);

        dto.setTrilhaSonoraId(
                historia.getTrilhasSonoras().stream()
                        .map(TrilhaSonora::getId)
                        .toList()
        );

        return dto;
    }

    @Transactional
    public HistoriaDTOResponse atualizarHistoria(Integer historiaId, HistoriaDTORequest historiaDTORequest, byte[] conteudo) {
        Historia historia = historiaRepository.findById(historiaId)
                .orElseThrow(() -> new EntityNotFoundException("História não encontrada com id: " + historiaId));

        // Atualiza campos básicos
        historia.setTitulo(historiaDTORequest.getTitulo());
        historia.setTexto(historiaDTORequest.getTexto());
        historia.setStatus(historiaDTORequest.getStatus());

        // Atualiza capa: mantém a antiga se não vier nada novo
        if (historiaDTORequest.getCapa() != null) {
            historia.setCapa(historiaDTORequest.getCapa());
        } else if (conteudo != null) {
            historia.setCapa(conteudo);
        } else {
            // se mandou null explicitamente e não tem arquivo, apaga a capa
            historia.setCapa(null);
        }


        // Atualiza usuário (se informado)
        if (historiaDTORequest.getUsuarioId() != null) {
            Usuario usuario = usuarioRepository.findById(historiaDTORequest.getUsuarioId())
                    .orElseThrow(() -> new EntityNotFoundException(
                            "Usuário não encontrado com id: " + historiaDTORequest.getUsuarioId()));
            historia.setUsuario(usuario);
        }

        if (historiaDTORequest.getTrilhaSonoraId() != null) {
            if (historiaDTORequest.getTrilhaSonoraId().isEmpty()) {
                historia.getTrilhasSonoras().clear(); // desvincula todas
            } else {
                List<TrilhaSonora> trilhas = trilhaSonoraRepository.findAllById(historiaDTORequest.getTrilhaSonoraId());
                historia.getTrilhasSonoras().clear();
                historia.getTrilhasSonoras().addAll(trilhas);
            }
        }


        Historia historiaAtualizada = historiaRepository.save(historia);

        HistoriaDTOResponse response = modelMapper.map(historiaAtualizada, HistoriaDTOResponse.class);
        response.setTrilhaSonoraId(
                historiaAtualizada.getTrilhasSonoras().stream()
                        .map(TrilhaSonora::getId)
                        .toList()
        );

        return response;
    }

    @Transactional
    public void deletarPorHistoriaId(Integer historiaId) {
        historiaRepository.apagarHistoria(historiaId);
    }


    public List<HistoriaDTOResponse> listarHistoriasPorUsuario(Integer usuarioId) {
        List<Historia> historias = historiaRepository.findByUsuarioIdAndStatusGreaterThanEqual(usuarioId, 1);
        return historias.stream()
                .map(historia -> {
                    HistoriaDTOResponse dto = modelMapper.map(historia, HistoriaDTOResponse.class);
                    dto.setTrilhaSonoraId(
                            historia.getTrilhasSonoras().stream()
                                    .map(TrilhaSonora::getId)
                                    .toList()
                    );
                    return dto;
                })
                .toList();
    }





}
