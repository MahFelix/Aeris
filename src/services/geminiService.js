// src/services/geminiService.js
import axios from 'axios';
import { toast } from 'react-toastify';

const BACKEND_URL = 'https://aerisbackend.onrender.com/api/chat'; // URL do backend

let isFirstMessage = true; // Variável de estado para controlar o timeout

export const sendMessageToGemini = async (prompt, userMessage) => {
  let toastId;

  try {
    // Define o timeout com base no estado da variável isFirstMessage
    const timeout = isFirstMessage ? 70000 : 10000; // 10s para a primeira mensagem, 5s para as próximas

    // Exibe um aviso enquanto a primeira mensagem é enviada
    if (isFirstMessage) {
      toastId = toast.info('Enviando primeira mensagem... Aguarde...', {
        autoClose: false, // Impede que o toast feche automaticamente
        closeButton: false, // Remove o botão de fechar
      });
    }

    // Faz a requisição para o backend
    const response = await axios.post(
      BACKEND_URL,
      { prompt, message: userMessage },
      {
        timeout: timeout, // Usa o timeout definido
      }
    );

    // Após o primeiro envio, altera o estado da variável para false
    if (isFirstMessage) {
      isFirstMessage = false;
      toast.dismiss(toastId); // Fecha o toast quando a requisição é concluída
    }

    // Verifica se a resposta é válida
    if (!response.data || !response.data.response) {
      throw new Error('Resposta inválida do backend.');
    }

    // Retorna a resposta da IA
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar mensagem para o Gemini:', error);

    // Fecha o toast de "Enviando primeira mensagem..." em caso de erro
    if (toastId) {
      toast.dismiss(toastId);
    }

    // Exibe uma mensagem de erro específica
    if (error.response) {
      // Erro de resposta da API (4xx ou 5xx)
      toast.error(`Erro na API: ${error.response.data.error || 'Erro desconhecido'}`);
    } else if (error.request) {
      // Erro de rede (sem resposta da API)
      toast.error('Erro de rede: Não foi possível conectar ao backend. Tente novamente.');
    } else if (error.code === 'ECONNABORTED') {
      // Erro de timeout
      toast.error('Timeout: A requisição demorou muito para ser processada. Tente novamente.');
    } else {
      // Outros erros
      toast.error(`Erro ao processar a requisição: ${error.message}`);
    }

    // Lança o erro novamente para ser tratado por quem chamou a função
    throw error;
  }
};