# Sistema de Upload de Áudio

## Visão Geral

O sistema de upload de áudio foi implementado seguindo o mesmo padrão utilizado para upload de imagens, com duas etapas principais:

1. **Conversão para MP3** - Utilizando o `AudioConversionService`
2. **Upload para o sistema de arquivos** - Utilizando o `AudioUploadService`

## Estrutura de Classes

### 1. AudioConversionService

Responsável pela conversão de arquivos de áudio para o formato MP3.

**Características:**
- Converte qualquer formato de áudio suportado pelo FFmpeg para MP3
- Utiliza a biblioteca JAVE2 (Java wrapper do FFmpeg)
- Configurações de áudio:
  - Codec: libmp3lame
  - BitRate: 128 kbps
  - Canais: 2 (Stereo)
  - Sampling Rate: 44.1 kHz
- Se o arquivo já for MP3, retorna o conteúdo original sem conversão
- Utiliza arquivos temporários para processamento, que são removidos automaticamente

**Método Principal:**
```java
public byte[] converterParaMp3(byte[] conteudo, String nomeOriginal) throws IOException, EncoderException
```

### 2. AudioUploadService

Responsável pelo upload e gerenciamento de arquivos de áudio no sistema de arquivos.

**Características:**
- Salva arquivos no diretório: `src/main/resources/static/audios/`
- Gera nomes únicos usando UUID para evitar conflitos
- Retorna URLs relativas no formato: `/audios/{uuid}.mp3`
- Suporta operações de upload, atualização e exclusão

**Métodos Principais:**
```java
public String uploadAudio(byte[] conteudo, String nomeOriginal) throws IOException
public String atualizarAudio(byte[] conteudo, String nomeOriginal, String urlAudioAnterior) throws IOException
public void deletarAudio(String urlAudio)
```

### 3. AudioService

Orquestra o processo completo de criação de áudio.

**Fluxo de Processamento:**
1. Valida e busca usuário e história
2. Converte o áudio para MP3 usando `AudioConversionService`
3. Faz upload do áudio convertido usando `AudioUploadService`
4. Salva a URL do áudio no banco de dados
5. Retorna o DTO de resposta

### 4. AudioController

Endpoint REST para criação de áudios.

**Endpoint:**
```
POST /api/audio/criar
Content-Type: multipart/form-data
```

**Parâmetros:**
- `dados` (String JSON): Informações do áudio (ordem, usuarioId, historiaId)
- `arquivo` (MultipartFile): Arquivo de áudio a ser enviado

## Dependências Maven

```xml
<!-- JAVE2 para conversão de áudio -->
<dependency>
    <groupId>ws.schild</groupId>
    <artifactId>jave-core</artifactId>
    <version>3.5.0</version>
</dependency>
<dependency>
    <groupId>ws.schild</groupId>
    <artifactId>jave-nativebin-win64</artifactId>
    <version>3.5.0</version>
</dependency>
```

**Nota:** A dependência `jave-nativebin-win64` é específica para Windows 64-bit. Para outros sistemas operacionais, use:
- Linux 64-bit: `jave-nativebin-linux64`
- Mac OS X 64-bit: `jave-nativebin-osx64`
- Ou use `jave-all-deps` para incluir todas as plataformas

## Estrutura de Diretórios

```
src/main/resources/static/
├── audios/          # Arquivos de áudio MP3 convertidos
│   └── {uuid}.mp3
└── imagens/         # Arquivos de imagem
    └── {uuid}.{ext}
```

## Exemplo de Uso

### Request (usando FormData no JavaScript)

```javascript
const formData = new FormData();

// Dados do áudio
const dados = {
    ordem: 1,
    usuarioId: 123,
    historiaId: 456
};
formData.append('dados', JSON.stringify(dados));

// Arquivo de áudio
formData.append('arquivo', audioFile);

// Enviar request
fetch('/api/audio/criar', {
    method: 'POST',
    body: formData,
    headers: {
        'Authorization': 'Bearer ' + token
    }
})
.then(response => response.json())
.then(data => console.log('Áudio criado:', data));
```

### Response

```json
{
    "id": 1,
    "ordem": 1,
    "audio": "/audios/abc123-def456-ghi789.mp3",
    "status": 1,
    "usuarioId": 123,
    "historiaId": 456,
    "dataCriacao": "2025-11-21T10:30:00"
}
```

## Tratamento de Erros

- **IOException**: Erros de leitura/escrita de arquivos
- **EncoderException**: Erros na conversão de áudio
- **RuntimeException**: Usuário ou história não encontrados

## Considerações de Performance

1. A conversão de áudio pode ser demorada para arquivos grandes
2. Arquivos temporários são criados durante a conversão e removidos automaticamente
3. O diretório de upload é criado automaticamente se não existir
4. Considere implementar processamento assíncrono para arquivos grandes

## Melhorias Futuras

1. Processamento assíncrono de conversão
2. Validação de tamanho máximo de arquivo
3. Validação de formatos de áudio aceitos
4. Compressão adicional para reduzir tamanho
5. Armazenamento em cloud (AWS S3, Google Cloud Storage, etc.)
6. Cache de áudios convertidos

