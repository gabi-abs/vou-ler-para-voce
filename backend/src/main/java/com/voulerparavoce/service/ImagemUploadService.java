package com.voulerparavoce.service;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ImagemUploadService {

    // Diretório fora do classpath para upload de arquivos
    private static final String UPLOAD_DIR = "uploads/imagens/";

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

    /**
     * Atualiza uma imagem, deletando a anterior e fazendo upload da nova
     * @param conteudo bytes da nova imagem
     * @param nomeOriginal nome original do arquivo
     * @param urlImagemAntiga URL da imagem anterior (ex: "/imagens/uuid.jpg")
     * @return URL da nova imagem
     */
    public String atualizarImagem(byte[] conteudo, String nomeOriginal, byte[] urlImagemAntiga) throws IOException {
        // Remove a imagem antiga se existir
        if (urlImagemAntiga != null && urlImagemAntiga.length > 0) {
            String urlAntiga = new String(urlImagemAntiga);
            deletarImagem(urlAntiga);
        }

        // Faz upload da nova imagem
        return uploadImagem(conteudo, nomeOriginal);
    }

    /**
     * Deleta uma imagem do sistema de arquivos
     * @param urlImagem URL da imagem (ex: "/imagens/uuid.jpg")
     */
    private void deletarImagem(String urlImagem) {
        try {
            // Remove o prefixo "/imagens/" para obter apenas o nome do arquivo
            String nomeArquivo = urlImagem.replace("/imagens/", "");
            Path arquivoPath = Paths.get(UPLOAD_DIR).resolve(nomeArquivo);

            // Deleta o arquivo se existir
            if (Files.exists(arquivoPath)) {
                Files.delete(arquivoPath);
            }
        } catch (IOException e) {
            // Log do erro mas não falha a operação de atualização
            System.err.println("Erro ao deletar imagem antiga: " + urlImagem + " - " + e.getMessage());
        }
    }
}

