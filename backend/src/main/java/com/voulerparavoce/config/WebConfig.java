package com.voulerparavoce.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Diretório externo para armazenar uploads (fora do classpath)
        Path uploadDir = Paths.get("uploads").toAbsolutePath().normalize();
        String uploadPath = uploadDir.toUri().toString();

        // Mapeia /audios/** para o diretório uploads/audios/
        registry.addResourceHandler("/audios/**")
                .addResourceLocations(uploadPath + "audios/")
                .setCachePeriod(0); // Desabilita cache para sempre buscar arquivos novos

        // Mapeia /imagens/** para o diretório uploads/imagens/
        registry.addResourceHandler("/imagens/**")
                .addResourceLocations(uploadPath + "imagens/")
                .setCachePeriod(0); // Desabilita cache para sempre buscar arquivos novos
    }
}

