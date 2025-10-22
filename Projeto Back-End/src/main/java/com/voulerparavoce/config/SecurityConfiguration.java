package com.voulerparavoce.config;

import jakarta.servlet.Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Autowired
    private UserAuthenticationFilter userAuthenticationFilter;

    public static final String [] ENDPOINTS_WITH_AUTHENTICATION_NOT_REQUIRED = {
            "/api/usuario/login", // Url que usaremos para fazer login
            "/api/usuario/criar", // Url que usaremos para criar um usuário

            // 🔓 Swagger/OpenAPI UI
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/swagger-ui/index.html"
    };

    // Endpoints que requerem autenticação para serem acessados
    public static final String [] ENDPOINTS_WITH_AUTHENTICATION_REQUIRED = {
            // Histórias (listar / visualizar)
            "/api/historia/listar",
            "/api/historia/listarPorHistoriaid/**",
            "/api/historia/usuario/**",

            // Trilhas (listar / visualizar)
            "/api/trilhasonora/listar",
            "/api/trilhasonora/{id}",

            // Áudio (listar/baixar/play) — criação / deleção restritas abaixo
            "/api/audio/**"


    };

    // Endpoints que só podem ser acessador por usuários com permissão de cliente
    public static final String [] ENDPOINTS_CUSTOMER = {
            // História (ações do próprio usuário)
            "/api/historia/criar",
            "/api/historia/atualizar/**",
            "/api/historia/deletar/**",         // deleta próprias histórias
            "/api/historia/vincularTrilha/**", // vincular/remover trilha de uma história (opcional)

            // Áudio (ações do próprio usuário)
            "/api/audio/criar",
            "/api/audio/atualizar/**",
            "/api/audio/deletar/**",

            // Favoritos (somente do usuário)
            "/api/favorito/adicionar",
            "/api/favorito/remover",
            "/api/favorito/usuario/**"

    };

    // Endpoints que só podem ser acessador por usuários com permissão de administrador
    public static final String [] ENDPOINTS_ADMIN = {
            "/api/trilhasonora/criar",
            "/api/trilhasonora/atualizar/**",
            "/api/trilhasonora/deletar/**",

            // Usuário (admin full control)
            "/api/usuario/listar",
            "/api/usuario/atualizarUsuario/**",
            "/api/usuario/deletar/**",
            "/api/usuario/listarPorUsuarioid/**",

            // Moderação / gestão global (admin pode deletar/editar histórias e áudios de qualquer usuário se necessário)
            "/api/historia/deletar/**",
            "/api/historia/atualizar/**",
            "/api/audio/deletar/**",
            "/api/audio/atualizar/**"

    };

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(ENDPOINTS_WITH_AUTHENTICATION_NOT_REQUIRED).permitAll()
                        .requestMatchers(ENDPOINTS_ADMIN).hasRole("ADMINISTRADOR")
                        .requestMatchers(ENDPOINTS_CUSTOMER).hasRole("USUARIO")
                        .requestMatchers(ENDPOINTS_WITH_AUTHENTICATION_REQUIRED).authenticated()
                        .anyRequest().denyAll()
                )
                .addFilterBefore((Filter) userAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
