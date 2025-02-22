// src/pages/InterfacePage.jsx
import styled from 'styled-components';
import { Button } from '../components/Button';
import { BookOpen, GraduationCapIcon, LightbulbIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
`;

export const InterfacePage = () => {
  return (
    <Container>
      <h1>Escolha uma opção</h1>
      <ButtonContainer>
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    <Button onClick={() => window.location.href = '/chat/fundamental'}>
      <BookOpen /> Ensino Fundamental
    </Button>
  </motion.div>
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
  >
    <Button onClick={() => window.location.href = '/chat/medio'}>
      <GraduationCapIcon /> Ensino Médio
    </Button>
  </motion.div>
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 }}
  >
    <Button onClick={() => window.location.href = '/chat/gerais'}>
      <LightbulbIcon/> Conhecimentos Gerais
    </Button>
  </motion.div>
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
  >
    <Button onClick={() => window.location.href = '/chat/duvidas'}>
      <QuestionMarkCircledIcon /> Tirar Dúvidas
    </Button>
  </motion.div>
</ButtonContainer>
    </Container>
  );
};