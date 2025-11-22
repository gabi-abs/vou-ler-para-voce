package com.voulerparavoce;

import com.voulerparavoce.service.AudioConversionService;
import com.voulerparavoce.service.AudioUploadService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Teste de integração para demonstrar o uso dos serviços de conversão e upload de áudio
 *
 * IMPORTANTE: Este teste requer um arquivo de áudio de exemplo para funcionar.
 * Você pode desabilitar ou pular este teste se não tiver arquivos de exemplo.
 */
@SpringBootTest
public class AudioUploadIntegrationTest {

    @Autowired
    private AudioConversionService audioConversionService;

    @Autowired
    private AudioUploadService audioUploadService;

    /**
     * Exemplo de como usar os serviços de conversão e upload
     *
     * Este teste está desabilitado por padrão porque requer um arquivo de áudio real.
     * Para testar:
     * 1. Remova o comentário @Test
     * 2. Coloque um arquivo de áudio em src/test/resources/test-audio.wav (ou outro formato)
     * 3. Execute o teste
     */
    // @Test
    public void testConversaoEUploadDeAudio() throws Exception {
        // Caminho para um arquivo de áudio de teste
        Path arquivoTeste = Paths.get("src/test/resources/test-audio.wav");

        if (!Files.exists(arquivoTeste)) {
            System.out.println("Arquivo de teste não encontrado. Pulando teste.");
            return;
        }

        // 1. Lê o arquivo de teste
        byte[] conteudoOriginal = Files.readAllBytes(arquivoTeste);
        String nomeOriginal = "test-audio.wav";

        // 2. Converte para MP3
        byte[] audioConvertido = audioConversionService.converterParaMp3(conteudoOriginal, nomeOriginal);

        System.out.println("✓ Áudio convertido com sucesso!");
        System.out.println("  Tamanho original: " + conteudoOriginal.length + " bytes");
        System.out.println("  Tamanho convertido: " + audioConvertido.length + " bytes");

        // 3. Faz upload do áudio convertido
        String urlAudio = audioUploadService.uploadAudio(audioConvertido, nomeOriginal);

        System.out.println("✓ Upload realizado com sucesso!");
        System.out.println("  URL do áudio: " + urlAudio);

        // 4. Verifica se o arquivo foi criado
        String nomeArquivo = urlAudio.replace("/audios/", "");
        Path arquivoSalvo = Paths.get("src/main/resources/static/audios").resolve(nomeArquivo);

        assert Files.exists(arquivoSalvo) : "Arquivo de áudio não foi salvo corretamente";

        System.out.println("✓ Arquivo verificado no sistema de arquivos!");

        // 5. Limpa o arquivo de teste (opcional)
        audioUploadService.deletarAudio(urlAudio);
        System.out.println("✓ Arquivo de teste deletado!");
    }

    /**
     * Teste simples que sempre passa - apenas para verificar que o contexto Spring está funcionando
     */
    @Test
    public void testContextLoads() {
        assert audioConversionService != null : "AudioConversionService não foi injetado";
        assert audioUploadService != null : "AudioUploadService não foi injetado";
        System.out.println("✓ Contexto Spring carregado com sucesso!");
        System.out.println("✓ Serviços de áudio disponíveis!");
    }
}

