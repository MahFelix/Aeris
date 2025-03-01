// src/services/geminiService.js
import axios from 'axios';

const BACKEND_URL = 'https://aerisbackend.onrender.com/api/chat'; // URL do backend

export const sendMessageToGemini = async (prompt, userMessage) => {
  try {
    // Faz a requisição para o backend
    const response = await axios.post(
      BACKEND_URL,
      { prompt, message: userMessage },
      {
        timeout: 30000, // Timeout de 20 segundos
      }
    );

    // Verifica se a resposta é válida
    if (!response.data || !response.data.response) {
      throw new Error('Resposta inválida do backend.');
    }

    // Retorna a resposta da IA
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar mensagem para o Gemini:', error);

    // Tratamento de erros específicos
    if (error.response) {
      // Erro de resposta da API (4xx ou 5xx)
      throw new Error(`Erro na API: ${error.response.data.error || 'Erro desconhecido'}`);
    } else if (error.request) {
      // Erro de rede (sem resposta da API)
      throw new Error('Erro de rede: Não foi possível conectar ao backend.');
    } else if (error.code === 'ECONNABORTED') {
      // Erro de timeout
      throw new Error('Timeout: A requisição demorou muito para ser processada.');
    } else {
      // Outros erros
      throw new Error(`Erro ao processar a requisição: ${error.message}`);
    }
  }
};