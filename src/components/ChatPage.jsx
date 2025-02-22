/* eslint-disable no-unused-vars */
// src/pages/ChatPage.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sendMessageToGemini } from '../services/geminiService';
import { getPromptForTopic } from '../utils/prompts';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const ChatContainer = styled.div`
  width: 80%;
  max-width: 600px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Message = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${props => props.isUser ? '#007bff' : '#e9ecef'};
  color: ${props => props.isUser ? '#fff' : '#000'};
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
`;

export const ChatPage = () => {
  const { topic } = useParams(); // Obtém o tópico da URL
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Define o prompt personalizado com base no tópico
  const prompt = getPromptForTopic(topic);

  useEffect(() => {
    toast.info(`Bem-vindo ao chat de ${topic}`);
  }, [topic]);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, isUser: true };
      setMessages([...messages, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        // Envia a mensagem para o Gemini
        const response = await sendMessageToGemini(prompt, input);
        const aiMessage = { text: response.data.message, isUser: false };
        setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        toast.error('Erro ao enviar mensagem para a IA');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Container>
      <ChatContainer>
        {messages.map((msg, index) => (
          <Message key={index} isUser={msg.isUser}>{msg.text}</Message>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          disabled={isLoading}
        />
        <button onClick={handleSend} disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar'}
        </button>
      </ChatContainer>
    </Container>
  );
};