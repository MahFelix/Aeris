// src/services/geminiService.js
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000/api/chat'; // URL do backend

export const sendMessageToGemini = async (prompt, userMessage) => {
  try {
    const response = await axios.post(BACKEND_URL, {
      prompt,
      message: userMessage,
    });
    return response.data; // Retorna a resposta da IA
  } catch (error) {
    console.error('Erro ao enviar mensagem para o Gemini:', error);
    throw error;
  }
};