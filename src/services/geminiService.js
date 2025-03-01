import axios from 'axios';

const BACKEND_URL = 'https://aeris-backend.onrender.com/api/chat'; // URL do backend

export const sendMessageToGemini = async (prompt, userMessage) => {
  try {
    const response = await axios.post(
      BACKEND_URL,
      { prompt, message: userMessage },
      {
        timeout: 50000, // Timeout de 50 segundos
        withCredentials: true, // Tente habilitar se for necessário
      }
    );

    if (!response.data || !response.data.response) {
      throw new Error('Resposta inválida do backend.');
    }

    return response.data;
  } catch (error) {
    console.error('Erro ao enviar mensagem para o Gemini:', error);
    
    // Detalhes mais claros para depuração
    if (error.response) {
      console.error('Resposta do servidor:', error.response.data);
      console.error('Status:', error.response.status);
    } else if (error.request) {
      console.error('Erro na requisição:', error.request);
    } else {
      console.error('Erro desconhecido:', error.message);
    }

    return new Error(error.message);
  }
};
