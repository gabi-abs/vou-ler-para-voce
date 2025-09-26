package com.voulerparavoce.service;

import com.voulerparavoce.dto.request.UsuarioDTORequest;
import com.voulerparavoce.dto.response.UsuarioDTOResponse;
import com.voulerparavoce.entity.Usuario;
import com.voulerparavoce.repository.UsuarioRepository;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    private UsuarioRepository usuarioRepository;
    @Autowired
    private ModelMapper modelMapper;

    public UsuarioService(UsuarioRepository usuarioRepository, ModelMapper modelMapper) {
        this.usuarioRepository = usuarioRepository;
        this.modelMapper = modelMapper;
    }

    @Transactional
    public UsuarioDTOResponse criarUsuario(UsuarioDTORequest usuarioDTORequest) {
        Usuario usuario= modelMapper.map(usuarioDTORequest, Usuario.class);
        usuario.setStatus(1);
        usuario.setDataCriacao(LocalDateTime.now());
        Usuario usuarioSave = this.usuarioRepository.save(usuario);
        UsuarioDTOResponse usuarioDTOResponse = modelMapper.map(usuarioSave, UsuarioDTOResponse.class);
        return usuarioDTOResponse;
    }

    public List<UsuarioDTOResponse> listarUsuarios() {
        List<Usuario> usuarios = usuarioRepository.listarUsuariosAtivos();
        return usuarios.stream()
                .map(usuario -> modelMapper.map(usuario, UsuarioDTOResponse.class))
                .collect(Collectors.toList());
    }


    public UsuarioDTOResponse listarPorUsuarioId(Integer usuarioId) {
        Usuario usuario = usuarioRepository.ObterUsuarioPeloId(usuarioId);
        return modelMapper.map(usuario, UsuarioDTOResponse.class);
    }

    @Transactional
    public UsuarioDTOResponse atualizarUsuario(Integer usuarioId, UsuarioDTORequest usuarioDTORequest) {
        // se não existir, lança NoSuchElementException
        Usuario usuario = usuarioRepository.findById(usuarioId).get();

        usuario.setNome(usuarioDTORequest.getNome());
        usuario.setEmail(usuarioDTORequest.getEmail());
        usuario.setSenha(usuarioDTORequest.getSenha());

        Usuario usuarioAtualizado = usuarioRepository.save(usuario);
        return modelMapper.map(usuarioAtualizado, UsuarioDTOResponse.class);
    }

    @Transactional
    public void deletarPorUsuarioId(Integer usuarioId) {
        usuarioRepository.apagarUsuario(usuarioId);
    }

}
