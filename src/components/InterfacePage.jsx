import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import auroraimg from '../assets/auroraimg.png';
import backgroundVideo from '../assets/BG.webm';
import Section from '../components/section';
import GlobalStyles from '../globalStyles';

// Estilos do container principal
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
  overflow: hidden;

  
`;

// Estilos do vídeo de fundo
const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

// Estilos do conteúdo principal
const Content = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// Estilos da imagem do robô com animação
const AuroraImage = styled(motion.img)`
  width: 100%;
  max-width: 400px;
  height: auto;
  margin-top: 35px;
  cursor: pointer;
`;

// Estilos da caixa de mensagem flutuante
const MessageBubble = styled(motion.div)`
  position: absolute;
  top: 0%;
  left: 52%;
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 127px;
  font-size: 16px;
  text-align: left;
  line-height: 1.5;
  font-family: 'Arial', sans-serif;

  @media (max-width: 768px) {
    position: absolute;
  top: 0%;
  left: 60%;
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 127px;
  font-size: 16px;
  text-align: left;
  line-height: 1.5;
  font-family: 'Arial', sans-serif;
  }
`;

// Mensagens que o robô pode "falar"
const messages = [
  "Oi, eu sou a Aéris, sua Tutora de ensino! 😊",
  "Vamos aprender juntos? Escolha uma opção abaixo!",
  "Estou aqui para ajudar você a dominar novos conhecimentos!",
  "Que tal começarmos com uma aula de matemática?",
];

export const InterfacePage = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    // Troca de mensagem a cada 3 segundos
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 5000);

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  return (
    <>
    <GlobalStyles/>
    <Container>
      {/* Vídeo de fundo */}
      <VideoBackground autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
      </VideoBackground>

      {/* Conteúdo */}
      <Content>
        {/* Imagem do robô com animação */}
        <AuroraImage
          src={auroraimg}
          alt="Aurora"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Imagem da Aurora"
        />

        {/* Caixa de mensagem flutuante com animação de fade */}
        <AnimatePresence mode="wait">
          <MessageBubble
            key={currentMessageIndex} // Força a recriação do componente para animar a entrada/saída
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {messages[currentMessageIndex]}
          </MessageBubble>
        </AnimatePresence>

        {/* Componente Section */}
        <Section />
      </Content>
    </Container>
    </>
  );
};