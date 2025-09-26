package com.voulerparavoce.service;

import com.voulerparavoce.dto.request.AudioDTORequest;
import com.voulerparavoce.dto.response.AudioDTOResponse;
import com.voulerparavoce.entity.Audio;
import com.voulerparavoce.entity.Historia;
import com.voulerparavoce.entity.Usuario;
import com.voulerparavoce.repository.AudioRepository;
import com.voulerparavoce.repository.HistoriaRepository;
import com.voulerparavoce.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AudioService {

    private final AudioRepository audioRepository;
    private final UsuarioRepository usuarioRepository;
    private final HistoriaRepository historiaRepository;

    @Autowired
    private ModelMapper modelMapper;

    public AudioService(AudioRepository audioRepository,
                        HistoriaRepository historiaRepository,
                        UsuarioRepository usuarioRepository) {
        this.audioRepository = audioRepository;
        this.historiaRepository = historiaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Transactional
    public AudioDTOResponse criarAudio(AudioDTORequest audioDTORequest, byte[] conteudo) {
        Audio audio = new Audio();
        audio.setOrdem(audioDTORequest.getOrdem());
        audio.setStatus(1);


        Usuario usuario = usuarioRepository.findById(audioDTORequest.getUsuarioId())
                .orElseThrow(() -> new RuntimeException(
                        "Usuário não encontrado para o id: " + audioDTORequest.getUsuarioId()));

        Historia historia = historiaRepository.findById(audioDTORequest.getHistoriaId())
                .orElseThrow(() -> new RuntimeException(
                        "História não encontrada para o id: " + audioDTORequest.getHistoriaId()));

        audio.setUsuario(usuario);
        audio.setHistoria(historia);
        audio.setAudio(conteudo); // ← campo byte[] na entidade
        audio.setDataCriacao(LocalDateTime.now());

        Audio audioSalvo = audioRepository.save(audio);
        return modelMapper.map(audioSalvo, AudioDTOResponse.class);
    }

    @Transactional
    public void deletarPorAudioId(Integer audioId) {
        audioRepository.apagarAudio(audioId);
    }
}
