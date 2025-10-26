package com.voulerparavoce.service;

import com.voulerparavoce.dto.request.FavoritoDTORequest;
import com.voulerparavoce.dto.response.FavoritoDTOResponse;
import com.voulerparavoce.entity.Favorito;
import com.voulerparavoce.entity.Historia;
import com.voulerparavoce.entity.Usuario;
import com.voulerparavoce.repository.FavoritoRepository;
import com.voulerparavoce.repository.HistoriaRepository;
import com.voulerparavoce.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class FavoritoService {

    private FavoritoRepository favoritoRepository;
    private UsuarioRepository usuarioRepository;
    private HistoriaRepository historiaRepository;

    @Autowired
    private ModelMapper modelMapper;


    public FavoritoService(FavoritoRepository favoritoRepository, UsuarioRepository usuarioRepository, HistoriaRepository historiaRepository) {
        this.favoritoRepository = favoritoRepository;
        this.usuarioRepository = usuarioRepository;
        this.historiaRepository = historiaRepository;
    }


    public FavoritoDTOResponse adicionarFavorito(Integer usuarioId, Integer historiaId) {
        Usuario usuario = usuarioRepository.findById(usuarioId).get();
        Historia historia = historiaRepository.findById(historiaId).get();

        // se já existe, só dispara exceção simples
        favoritoRepository.findByUsuarioIdAndHistoriaId(usuarioId, historiaId)
                .ifPresent(f -> { throw new RuntimeException("História já favoritada"); });

        Favorito favorito = new Favorito();
        favorito.setUsuario(usuario);
        favorito.setHistoria(historia);
        favorito.setDataCriacao(LocalDateTime.now());

        Favorito salvo = favoritoRepository.save(favorito);

        return new FavoritoDTOResponse(
                salvo.getId(),
                salvo.getDataCriacao(),
                salvo.getUsuario().getId(),
                salvo.getHistoria().getId(),
                salvo.getHistoria().getTitulo(),
                salvo.getHistoria().getCapa()
        );
    }

    public List<FavoritoDTOResponse> listarPorUsuario(Integer usuarioId) {
        return favoritoRepository.findByUsuarioId(usuarioId)
                .stream()
                .map(f -> new FavoritoDTOResponse(
                        f.getId(),
                        f.getDataCriacao(),
                        f.getUsuario().getId(),
                        f.getHistoria().getId(),
                        f.getHistoria().getTitulo(),
                        f.getHistoria().getCapa()
                ))
                .toList();
    }

    @Transactional
    public void removerFavorito(Integer usuarioId, Integer historiaId) {
        Favorito favorito = favoritoRepository.findByUsuarioIdAndHistoriaId(usuarioId, historiaId).get();
        favoritoRepository.delete(favorito);
    }

}
