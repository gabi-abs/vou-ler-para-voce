package com.voulerparavoce.service;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ImagemUploadService {

    private static final String UPLOAD_DIR = "src/main/resources/static/imagens/";

    public String uploadImagem(byte[] conteudo, String nomeOriginal) throws IOException {
        // Cria o diretório se não existir
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Gera um nome único para o arquivo
        String extensao = obterExtensao(nomeOriginal);
        String nomeArquivo = UUID.randomUUID().toString() + extensao;

        // Salva o arquivo
        Path arquivoPath = uploadPath.resolve(nomeArquivo);
        Files.write(arquivoPath, conteudo);

        // Retorna a URL relativa
        return "/imagens/" + nomeArquivo;
    }

    private String obterExtensao(String nomeArquivo) {
        if (nomeArquivo == null || !nomeArquivo.contains(".")) {
            return ".jpg"; // extensão padrão
        }
        return nomeArquivo.substring(nomeArquivo.lastIndexOf("."));
    }
}

