package com.voulerparavoce.service;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class AudioUploadService {

    // Diretório fora do classpath para upload de arquivos
    private static final String UPLOAD_DIR = "uploads/audios/";

    /**
     * Faz upload de um arquivo de áudio MP3
     * @param conteudo bytes do arquivo de áudio (já convertido para MP3)
     * @param nomeOriginal nome original do arquivo (não utilizado, mas mantido para consistência da API)
     * @return URL relativa do arquivo salvo
     * @throws IOException se houver erro ao salvar o arquivo
     */
    public String uploadAudio(byte[] conteudo, String nomeOriginal) throws IOException {
        // Cria o diretório se não existir
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Gera um nome único para o arquivo (sempre .mp3)
        String nomeArquivo = UUID.randomUUID() + ".mp3";

        // Salva o arquivo
        Path arquivoPath = uploadPath.resolve(nomeArquivo);
        Files.write(arquivoPath, conteudo);

        // Retorna a URL relativa
        return "/audios/" + nomeArquivo;
    }

    /**
     * Atualiza um áudio, deletando o anterior e fazendo upload do novo
     * @param conteudo bytes do novo áudio (já convertido para MP3)
     * @param nomeOriginal nome original do arquivo
     * @param urlAudioAnterior URL do áudio anterior (ex: "/audios/uuid.mp3")
     * @return URL do novo áudio
     * @throws IOException se houver erro ao salvar/deletar arquivos
     */
    public String atualizarAudio(byte[] conteudo, String nomeOriginal, String urlAudioAnterior) throws IOException {
        // Remove o áudio antigo se existir
        if (urlAudioAnterior != null && !urlAudioAnterior.isEmpty()) {
            deletarAudio(urlAudioAnterior);
        }

        // Faz upload do novo áudio
        return uploadAudio(conteudo, nomeOriginal);
    }

    /**
     * Deleta um áudio do sistema de arquivos
     * @param urlAudio URL do áudio (ex: "/audios/uuid.mp3")
     */
    public void deletarAudio(String urlAudio) {
        try {
            // Remove o prefixo "/audios/" para obter apenas o nome do arquivo
            String nomeArquivo = urlAudio.replace("/audios/", "");
            Path arquivoPath = Paths.get(UPLOAD_DIR).resolve(nomeArquivo);

            // Deleta o arquivo se existir
            if (Files.exists(arquivoPath)) {
                Files.delete(arquivoPath);
            }
        } catch (IOException e) {
            // Log do erro mas não falha a operação
            System.err.println("Erro ao deletar áudio: " + urlAudio + " - " + e.getMessage());
        }
    }
}

