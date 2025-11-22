package com.voulerparavoce.service;

import org.springframework.stereotype.Service;
import ws.schild.jave.Encoder;
import ws.schild.jave.EncoderException;
import ws.schild.jave.MultimediaObject;
import ws.schild.jave.encode.AudioAttributes;
import ws.schild.jave.encode.EncodingAttributes;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@Service
public class AudioConversionService {

    private static final String TEMP_DIR = System.getProperty("java.io.tmpdir");

    /**
     * Converte um arquivo de áudio para MP3
     * @param conteudo bytes do arquivo original
     * @param nomeOriginal nome do arquivo original
     * @return bytes do arquivo convertido para MP3
     * @throws IOException se houver erro na leitura/escrita de arquivos
     * @throws EncoderException se houver erro na conversão
     */
    public byte[] converterParaMp3(byte[] conteudo, String nomeOriginal) throws IOException, EncoderException {
        File arquivoOriginal = null;
        File arquivoConvertido = null;

        try {
            // Cria arquivo temporário com o conteúdo original
            String extensaoOriginal = obterExtensao(nomeOriginal);
            arquivoOriginal = criarArquivoTemporario(conteudo, extensaoOriginal);

            // Cria arquivo temporário para o MP3 convertido
            arquivoConvertido = File.createTempFile("audio-converted-", ".mp3", new File(TEMP_DIR));

            // Verifica se o arquivo já é MP3
            if (extensaoOriginal.equalsIgnoreCase(".mp3")) {
                // Se já for MP3, retorna o conteúdo original
                return conteudo;
            }

            // Configura os atributos de áudio para MP3
            AudioAttributes audio = new AudioAttributes();
            audio.setCodec("libmp3lame");
            audio.setBitRate(128000); // 128 kbps
            audio.setChannels(2); // Stereo
            audio.setSamplingRate(44100); // 44.1 kHz

            // Configura os atributos de codificação
            EncodingAttributes attrs = new EncodingAttributes();
            attrs.setOutputFormat("mp3");
            attrs.setAudioAttributes(audio);

            // Realiza a conversão
            Encoder encoder = new Encoder();
            encoder.encode(new MultimediaObject(arquivoOriginal), arquivoConvertido, attrs);

            // Lê o arquivo convertido e retorna os bytes
            return Files.readAllBytes(arquivoConvertido.toPath());

        } finally {
            // Limpa os arquivos temporários
            if (arquivoOriginal != null && arquivoOriginal.exists()) {
                if (!arquivoOriginal.delete()) {
                    System.err.println("Não foi possível deletar o arquivo temporário: " + arquivoOriginal.getPath());
                }
            }
            if (arquivoConvertido != null && arquivoConvertido.exists()) {
                if (!arquivoConvertido.delete()) {
                    System.err.println("Não foi possível deletar o arquivo convertido: " + arquivoConvertido.getPath());
                }
            }
        }
    }

    /**
     * Cria um arquivo temporário com o conteúdo fornecido
     */
    private File criarArquivoTemporario(byte[] conteudo, String extensao) throws IOException {
        File arquivo = File.createTempFile("audio-original-", extensao, new File(TEMP_DIR));
        Files.write(arquivo.toPath(), conteudo);
        return arquivo;
    }

    /**
     * Obtém a extensão do arquivo
     */
    private String obterExtensao(String nomeArquivo) {
        if (nomeArquivo == null || !nomeArquivo.contains(".")) {
            return ".mp3"; // extensão padrão
        }
        return nomeArquivo.substring(nomeArquivo.lastIndexOf("."));
    }
}

