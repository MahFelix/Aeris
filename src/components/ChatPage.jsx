import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sendMessageToGemini } from '../services/geminiService';
import { getPromptForTopic } from '../utils/prompts.js';
import formatPlanText from '../utils/formatPlanText';
import styled from 'styled-components';
import BGMOBILE from '../assets/BGMOBILE.webp';
import AerisImage from '../assets/Aeris.png';



// Estilos globais
const GlobalStyles = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
  font-family: 'Poppins', sans-serif;
`;

// Componentes estilizados
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
  background-color: #f0f0f0;
  padding: 10px;
  font-family: 'Poppins', sans-serif;
`;

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  padding: 10px;
  background-image: url(${BGMOBILE});
  background-size: cover;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Message = styled.div`
  max-width: 70%;
  padding: 10px;
  border-radius: 10px;
  background-color: ${props => (props.isUser ? '#007bff' : '#e9ecef')};
  color: ${props => (props.isUser ? '#fff' : '#000')};
  align-self: ${props => (props.isUser ? 'flex-end' : 'flex-start')};
  word-wrap: break-word;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  opacity: 0.9;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const AerisProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const AerisImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #007bff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const AerisImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
`;

// Componente principal
export const ChatPage = () => {
  const { topic } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Scroll automático
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Mensagem de boas-vindas
  useEffect(() => {
    const { welcome } = getPromptForTopic(topic, '');
    setMessages([{ text: welcome, isUser: false }]);
    toast.info(`Bem-vindo ao chat de ${topic}`);
  }, [topic]);

  // Envio de mensagem
  const handleSend = useCallback(async () => {
    if (input.trim()) {
      const userMessage = { text: input, isUser: true };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        const { instruction } = getPromptForTopic(topic, input);
        const response = await sendMessageToGemini(instruction, input);
        const formattedText = formatPlanText(response.response);
        const aiMessage = { text: formattedText, isUser: false };
        setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        toast.error(`Erro: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }
  }, [input, topic]);

  return (
    <React.Fragment>
      <GlobalStyles />
      <Container>
        <ChatContainer ref={chatContainerRef}>
          <AerisProfile>
            <AerisImageWrapper>
              <AerisImg src={AerisImage} alt="Aeris" />
            </AerisImageWrapper>
          </AerisProfile>
          {messages.map((msg, index) => (
            <Message
              key={index}
              isUser={msg.isUser}
              dangerouslySetInnerHTML={{ __html: msg.text }}
            />
          ))}
        </ChatContainer>
        <InputContainer>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
            placeholder="Digite sua mensagem..."
            aria-label="Digite sua mensagem"
          />
          <Button onClick={handleSend} disabled={isLoading}>
            {isLoading ? 'Enviando...' : 'Enviar'}
          </Button>
        </InputContainer>
      </Container>
    </React.Fragment>
  );
};