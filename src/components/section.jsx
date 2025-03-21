import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import BGBUTTON from '../assets/BGBUTTON.jpg';
import { BookOpen, GraduationCap, Lightbulb, HelpCircle, Code, HeartHandshake, Globe } from 'lucide-react';

// Animação de ponto de luz girando ao redor do botão
const rotateGlow = keyframes`
  0% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
`;

// Animação de brilho na borda do botão
const borderGlow = keyframes`
  0% { box-shadow: 0 0 5px #11faff, 0 0 10px #11faff, 0 0 20px #11faff; }
  50% { box-shadow: 0 0 10px #11faff, 0 0 20px #11faff, 0 0 40px #11faff; }
  100% { box-shadow: 0 0 5px #11faff, 0 0 10px #11faff, 0 0 20px #11faff; }
`;

const ContainerSection = styled.div`
  width: 100%;
  height: 100%; /* Ocupa 100% da altura disponível */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5%; /* Adiciona um padding para evitar que o conteúdo encoste nas bordas */
  box-sizing: border-box; /* Garante que o padding não aumente o tamanho total */
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 colunas */
  gap: 5%; /* Espaçamento entre os botões em porcentagem */
  width: 100%; /* Ocupa 100% da largura disponível */
  max-width: 600px; /* Define uma largura máxima para evitar que os botões fiquem muito grandes */
`;

const ButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%; /* Ocupa 100% da largura disponível */
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px 15px; /* Padding ajustado */
  background-image: url(${BGBUTTON});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: ${borderGlow} 2s linear infinite;
  width: 100%; /* Ocupa 100% da largura disponível */
  height: 100%; /* Ocupa 100% da altura disponível */
  min-height: 60px; /* Altura mínima para garantir consistência */

  &:hover {
    transform: scale(1.05);
  }

  svg {
    color: white;
    width: 24px;
    height: 24px;
  }
`;

const Glow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  background-color: #11faff;
  border-radius: 50%;
  box-shadow: 0 0 10px #11faff;
  animation: ${rotateGlow} 2s linear infinite;
  transform-origin: -40px 0;
`;

export function Section() {
  return (
    <ContainerSection>
      <ButtonContainer>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}>
          <ButtonWrapper>
            <Glow />
            <Button onClick={() => (window.location.href = '/chat/idiomas')}>
              <Globe /> Idiomas
            </Button>
          </ButtonWrapper>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}>
          <ButtonWrapper>
            <Glow />
            <Button onClick={() => (window.location.href = '/chat/libras')}>
              <Globe /> Libras
            </Button>
          </ButtonWrapper>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
          <ButtonWrapper>
            <Glow />
            <Button onClick={() => (window.location.href = '/chat/programacao')}>
              <Code /> Programação
            </Button>
          </ButtonWrapper>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
          <ButtonWrapper>
            <Glow />
            <Button onClick={() => (window.location.href = '/chat/terapeuta')}>
              <HeartHandshake /> Terapia
            </Button>
          </ButtonWrapper>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <ButtonWrapper>
            <Glow />
            <Button onClick={() => (window.location.href = '/chat/fundamental')}>
              <BookOpen /> Ensino Fundamental
            </Button>
          </ButtonWrapper>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <ButtonWrapper>
            <Glow />
            <Button onClick={() => (window.location.href = '/chat/medio')}>
              <GraduationCap /> Ensino Médio
            </Button>
          </ButtonWrapper>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <ButtonWrapper>
            <Glow />
            <Button onClick={() => (window.location.href = '/chat/gerais')}>
              <Lightbulb /> Conhecimentos Gerais
            </Button>
          </ButtonWrapper>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <ButtonWrapper>
            <Glow />
            <Button onClick={() => (window.location.href = '/chat/duvidas')}>
              <HelpCircle /> Tirar Dúvidas
            </Button>
          </ButtonWrapper>
        </motion.div>
      </ButtonContainer>
    </ContainerSection>
  );
}

export default Section;