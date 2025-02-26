import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sendMessageToGemini } from '../services/geminiService';
import { getPromptForTopic } from '../utils/prompts';
import formatPlanText from '../utils/formatPlanText';
import styled from 'styled-components';
import BGMOBILE from '../assets/BGMOBILE.webp';
import AerisImage from '../assets/Aerismini.png'; 

// Importando a fonte Poppins do Google Fonts
const FontImport = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 95vh;
  background-color: #f0f0f0;
  padding: 10px;
  font-family: 'Poppins', sans-serif; /* Aplicando a fonte Poppins globalmente */
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
  font-family: 'Poppins', sans-serif; /* Aplicando a fonte Poppins */
`;

const Message = styled.div`
  max-width: 70%;
  padding: 10px;
  border-radius: 10px;
  background-color: ${props => props.isUser ? '#007bff' : '#e9ecef'};
  color: ${props => props.isUser ? '#fff' : '#000'};
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  word-wrap: break-word;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  opacity: 0.9;
  font-family: 'Poppins', sans-serif; /* Aplicando a fonte Poppins */
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', sans-serif; /* Aplicando a fonte Poppins */
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 16px;
  outline: none;
  font-family: 'Poppins', sans-serif; /* Aplicando a fonte Poppins */

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
  font-family: 'Poppins', sans-serif; /* Aplicando a fonte Poppins */

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
  border-radius: 50%; // Garantindo que a imagem seja redonda
`;


export const ChatPage = () => {
  const { topic } = useParams(); // Obtém o tópico da URL
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Efeito para scroll automático
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Efeito para enviar a mensagem de boas-vindas ao montar o componente
  useEffect(() => {
    // Obtém a mensagem de boas-vindas para o tópico selecionado
    const { welcome } = getPromptForTopic(topic, '');

    // Adiciona a mensagem de boas-vindas ao estado `messages`
    setMessages([{ text: welcome, isUser: false }]);

    // Exibe um toast informativo
    toast.info(`Bem-vindo ao chat de ${topic}`);
  }, [topic]);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, isUser: true };
      setMessages([...messages, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        // Gera o prompt personalizado com base no tópico e na mensagem do usuário
        const { instruction } = getPromptForTopic(topic, input);

        // Envia a mensagem para o Gemini
        const response = await sendMessageToGemini(instruction, input);

        // Formata o texto da resposta da IA
        const formattedText = formatPlanText(response.response);

        const aiMessage = { text: formattedText, isUser: false };
        setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        toast.error(error.message); // Exibe a mensagem de erro específica
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {/* Importando a fonte Poppins */}
      <FontImport />
      <Container>
        <ChatContainer ref={chatContainerRef}>
          {/* Adicionando a foto da Aeris no início do chat */}
       <AerisProfile>
           <AerisImageWrapper>
             <AerisImg src={AerisImage} alt="Aeris" />
           </AerisImageWrapper>
         </AerisProfile>
          {messages.map((msg, index) => (
            <Message
              key={index}
              isUser={msg.isUser}
              dangerouslySetInnerHTML={{ __html: msg.text }} // Renderiza HTML formatado
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
          />
          <Button onClick={handleSend} disabled={isLoading}>
            {isLoading ? 'Enviando...' : 'Enviar'}
          </Button>
        </InputContainer>
      </Container>
    </>
  );
};