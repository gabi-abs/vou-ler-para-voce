# Exemplos de Uso - API de Upload de Áudio

## 1. Exemplo JavaScript (React/React Native)

### Upload de Áudio

```javascript
// Função para fazer upload de áudio
async function uploadAudio(audioFile, ordem, usuarioId, historiaId, token) {
  try {
    // Cria o FormData
    const formData = new FormData();
    
    // Adiciona os dados do áudio como JSON string
    const dados = {
      ordem: ordem,
      usuarioId: usuarioId,
      historiaId: historiaId
    };
    formData.append('dados', JSON.stringify(dados));
    
    // Adiciona o arquivo de áudio
    formData.append('arquivo', audioFile);
    
    // Faz a requisição
    const response = await fetch('http://localhost:8080/api/audio/criar', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        // NÃO adicione Content-Type aqui - o browser define automaticamente para multipart/form-data
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`Erro no upload: ${response.status}`);
    }
    
    const resultado = await response.json();
    console.log('Áudio criado com sucesso:', resultado);
    return resultado;
    
  } catch (error) {
    console.error('Erro ao fazer upload do áudio:', error);
    throw error;
  }
}

// Exemplo de uso
const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener('change', async (event) => {
  const arquivo = event.target.files[0];
  
  if (arquivo) {
    const resultado = await uploadAudio(
      arquivo,
      1,        // ordem
      123,      // usuarioId
      456,      // historiaId
      'seu-token-jwt-aqui'
    );
    
    console.log('URL do áudio:', resultado.audio);
    // Exemplo: "/audios/abc123-def456-ghi789.mp3"
  }
});
```

### React Component Example

```jsx
import React, { useState } from 'react';

function AudioUploader({ usuarioId, historiaId, token }) {
  const [uploading, setUploading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Verifica se é um arquivo de áudio
    if (!file.type.startsWith('audio/')) {
      alert('Por favor, selecione um arquivo de áudio');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      
      const dados = {
        ordem: 1,
        usuarioId: usuarioId,
        historiaId: historiaId
      };
      
      formData.append('dados', JSON.stringify(dados));
      formData.append('arquivo', file);

      const response = await fetch('http://localhost:8080/api/audio/criar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer upload');
      }

      const resultado = await response.json();
      setAudioUrl(`http://localhost:8080${resultado.audio}`);
      alert('Áudio enviado com sucesso!');
      
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao fazer upload do áudio');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h3>Upload de Áudio</h3>
      
      <input 
        type="file" 
        accept="audio/*"
        onChange={handleFileChange}
        disabled={uploading}
      />
      
      {uploading && <p>Convertendo e fazendo upload...</p>}
      
      {audioUrl && (
        <div>
          <p>Áudio enviado com sucesso!</p>
          <audio controls src={audioUrl}>
            Seu navegador não suporta o elemento de áudio.
          </audio>
        </div>
      )}
    </div>
  );
}

export default AudioUploader;
```

## 2. Exemplo React Native

```javascript
import React, { useState } from 'react';
import { View, Button, Text, ActivityIndicator } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

function AudioUploadScreen({ usuarioId, historiaId, token }) {
  const [uploading, setUploading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const pickAndUploadAudio = async () => {
    try {
      // Seleciona o arquivo
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });

      setUploading(true);

      // Cria o FormData
      const formData = new FormData();
      
      const dados = {
        ordem: 1,
        usuarioId: usuarioId,
        historiaId: historiaId
      };
      
      formData.append('dados', JSON.stringify(dados));
      formData.append('arquivo', {
        uri: result[0].uri,
        type: result[0].type,
        name: result[0].name
      });

      // Faz o upload
      const response = await fetch('http://localhost:8080/api/audio/criar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer upload');
      }

      const resultado = await response.json();
      setAudioUrl(`http://localhost:8080${resultado.audio}`);
      alert('Áudio enviado com sucesso!');
      
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('Usuário cancelou a seleção');
      } else {
        console.error('Erro:', error);
        alert('Erro ao fazer upload do áudio');
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button 
        title="Selecionar e Enviar Áudio"
        onPress={pickAndUploadAudio}
        disabled={uploading}
      />
      
      {uploading && (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator size="large" />
          <Text>Convertendo e fazendo upload...</Text>
        </View>
      )}
      
      {audioUrl && (
        <Text style={{ marginTop: 20 }}>
          Áudio salvo em: {audioUrl}
        </Text>
      )}
    </View>
  );
}

export default AudioUploadScreen;
```

## 3. Exemplo Axios (JavaScript)

```javascript
import axios from 'axios';

async function uploadAudioComAxios(audioFile, ordem, usuarioId, historiaId, token) {
  const formData = new FormData();
  
  const dados = {
    ordem: ordem,
    usuarioId: usuarioId,
    historiaId: historiaId
  };
  
  formData.append('dados', JSON.stringify(dados));
  formData.append('arquivo', audioFile);
  
  try {
    const response = await axios.post(
      'http://localhost:8080/api/audio/criar',
      formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Upload: ${percentCompleted}%`);
        }
      }
    );
    
    console.log('Sucesso:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Erro:', error.response?.data || error.message);
    throw error;
  }
}
```

## 4. Exemplo cURL (para testes)

```bash
# Criar áudio com arquivo .wav (será convertido para .mp3)
curl -X POST http://localhost:8080/api/audio/criar \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -F "dados={\"ordem\":1,\"usuarioId\":123,\"historiaId\":456}" \
  -F "arquivo=@/caminho/para/seu/audio.wav"

# Criar áudio com arquivo já em .mp3
curl -X POST http://localhost:8080/api/audio/criar \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -F "dados={\"ordem\":1,\"usuarioId\":123,\"historiaId\":456}" \
  -F "arquivo=@/caminho/para/seu/audio.mp3"

# Deletar áudio
curl -X DELETE http://localhost:8080/api/audio/deletar/1 \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

## 5. Formatos de Áudio Suportados

O sistema aceita diversos formatos de áudio e os converte automaticamente para MP3:

- **MP3** (mantido sem conversão)
- **WAV** (convertido)
- **FLAC** (convertido)
- **OGG** (convertido)
- **M4A** (convertido)
- **AAC** (convertido)
- **WMA** (convertido)
- E outros formatos suportados pelo FFmpeg

## 6. Response da API

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

## 7. Tratamento de Erros

```javascript
try {
  const resultado = await uploadAudio(...);
} catch (error) {
  if (error.response) {
    // Erro da API
    console.error('Erro da API:', error.response.status);
    console.error('Mensagem:', error.response.data);
  } else if (error.request) {
    // Sem resposta do servidor
    console.error('Sem resposta do servidor');
  } else {
    // Erro ao configurar a requisição
    console.error('Erro:', error.message);
  }
}
```

## 8. Dicas Importantes

1. **Tamanho do arquivo**: Configure limites no Spring Boot se necessário
   ```properties
   # application.properties
   spring.servlet.multipart.max-file-size=50MB
   spring.servlet.multipart.max-request-size=50MB
   ```

2. **Tempo de processamento**: A conversão pode demorar para arquivos grandes. Considere:
   - Mostrar feedback visual (loading)
   - Implementar timeout adequado
   - Processar de forma assíncrona (futura melhoria)

3. **Validação no frontend**: Valide tipo e tamanho antes de enviar

4. **Segurança**: Sempre use HTTPS em produção para upload de arquivos

