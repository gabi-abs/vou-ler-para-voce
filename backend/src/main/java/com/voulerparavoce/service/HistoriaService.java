package com.voulerparavoce.service;

import com.voulerparavoce.dto.request.HistoriaDTORequest;
import com.voulerparavoce.dto.response.HistoriaDTOResponse;
import com.voulerparavoce.entity.Historia;
import com.voulerparavoce.entity.TrilhaSonora;
import com.voulerparavoce.entity.Usuario;
import com.voulerparavoce.repository.HistoriaRepository;
import com.voulerparavoce.repository.TrilhaSonoraRepository;
import com.voulerparavoce.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class HistoriaService {

    private HistoriaRepository historiaRepository;
    private UsuarioRepository usuarioRepository;
    private TrilhaSonoraRepository trilhaSonoraRepository;
    private ImagemUploadService imagemUploadService;

    @Autowired
    private ModelMapper modelMapper;

    public HistoriaService(TrilhaSonoraRepository trilhaSonoraRepository,
                          UsuarioRepository usuarioRepository,
                          HistoriaRepository historiaRepository,
                          ImagemUploadService imagemUploadService) {
        this.trilhaSonoraRepository = trilhaSonoraRepository;
        this.usuarioRepository = usuarioRepository;
        this.historiaRepository = historiaRepository;
        this.imagemUploadService = imagemUploadService;
    }


    @Transactional
    public HistoriaDTOResponse criarHistoria(HistoriaDTORequest historiaDTORequest, byte[] conteudo, String nomeArquivo) throws IOException {
        Historia historia = new Historia();
        historia.setTitulo(historiaDTORequest.getTitulo());

        // Faz upload da imagem e obtém a URL
        if (conteudo != null && nomeArquivo != null) {
            String urlImagem = imagemUploadService.uploadImagem(conteudo, nomeArquivo);
            historia.setCapa(urlImagem.getBytes());
        }

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

    public List<HistoriaDTOResponse> listarHistoriasAtivosDoUsuario() {
        String emailUsuario = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuario = usuarioRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        List<Historia> historias = historiaRepository.listarHistoriasAtivosPorUsuario(usuario.getId());

        return mapParaDTO(historias);
    }

    public List<HistoriaDTOResponse> listarHistoriasFavoritasDoUsuario() {
        String emailUsuario = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuario = usuarioRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        List<Historia> historias = historiaRepository.listarHistoriasFavoritadasPorUsuario(usuario.getId());

        return mapParaDTO(historias);
    }

    // Método auxiliar para evitar repetir código
    private List<HistoriaDTOResponse> mapParaDTO(List<Historia> historias) {
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
        historia.setCapa(conteudo);

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
