// src/services/geminiService.js
import axios from 'axios';

const GEMINI_API_KEY = 'AIzaSyDEP0ECT9U7Z2MBzaGIM3VH4n35cH_Iiww'; // Substitua pela sua chave
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'; // URL da API do Gemini (exemplo)

const geminiClient = axios.create({
  baseURL: GEMINI_API_URL,
  headers: {
    'Authorization': `Bearer ${GEMINI_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const sendMessageToGemini = async (prompt, context) => {
  try {
    const response = await geminiClient.post('/messages', {
      prompt,
      context,
    });
    return response.data; // Retorna a resposta da IA
  } catch (error) {
    console.error('Erro ao enviar mensagem para o Gemini:', error);
    throw error;
  }
};