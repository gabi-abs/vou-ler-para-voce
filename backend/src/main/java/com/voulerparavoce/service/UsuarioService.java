package com.voulerparavoce.service;

import com.voulerparavoce.config.SecurityConfiguration;
import com.voulerparavoce.config.UserDetailsImpl;
import com.voulerparavoce.dto.LoginUserDto;
import com.voulerparavoce.dto.RecoveryJwtTokenDto;
import com.voulerparavoce.dto.request.UsuarioDTORequest;
import com.voulerparavoce.dto.response.UsuarioDTOResponse;
import com.voulerparavoce.entity.Role;
import com.voulerparavoce.entity.RoleName;
import com.voulerparavoce.entity.Usuario;
import com.voulerparavoce.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private SecurityConfiguration securityConfiguration;



   // / Método responsável por autenticar um usuário e retornar um token JWT
    public RecoveryJwtTokenDto autentificaUsuario(LoginUserDto loginUserDto) {
        // Cria um objeto de autenticação com o email e a senha do usuário
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(loginUserDto.email(), loginUserDto.senha());

        // Autentica o usuário com as credenciais fornecidas
        Authentication authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken);

        // Obtém o objeto UserDetails do usuário autenticado
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        // Gera um token JWT para o usuário autenticado
        return new RecoveryJwtTokenDto(jwtTokenService.generateToken(userDetails));
    }

    public void criarUsuario(UsuarioDTORequest usuarioDTORequest) {
        // Criação do Role, se necessário
        Role role = new Role();

        if (usuarioDTORequest.getRole() == null) {
            role.setName(RoleName.ROLE_USUARIO); // Define um valor padrão se nenhum papel for fornecido
        } else {
            role.setName(usuarioDTORequest.getRole());
        }

        // Criação do Usuario com todos os campos necessários
        Usuario usuario = new Usuario();
        usuario.setEmail(usuarioDTORequest.getEmail());
        usuario.setNome(usuarioDTORequest.getNome());  // Preenche o nome
        usuario.setSenha(securityConfiguration.passwordEncoder().encode(usuarioDTORequest.getSenha()));
        usuario.setRoles(List.of(role));

        // Preenchendo o status e a data de criação
        usuario.setStatus(1);  // Status como ativo (1)
        usuario.setDataCriacao(LocalDateTime.now());  // Definindo a data de criação como o momento atual

        // Salvando o usuário no banco de dados
        usuarioRepository.save(usuario);
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

    /**
     * Retorna as informações do usuário autenticado no contexto de segurança
     */
    public UsuarioDTOResponse obterInfoUsuarioAutenticado() {
        String emailUsuario = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuario = usuarioRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return modelMapper.map(usuario, UsuarioDTOResponse.class);
    }

}
