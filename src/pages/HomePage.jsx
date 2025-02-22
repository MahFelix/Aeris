// src/pages/HomePage.jsx
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const AuroraImage = styled(motion.img)`
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
`;

export const HomePage = () => {
  return (
    <Container>
      <AuroraImage
        src="/assets/aurora.png"
        alt="Aurora"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      />
      <Button onClick={() => window.location.href = '/interface'}>Iniciar</Button>
    </Container>
  );
};