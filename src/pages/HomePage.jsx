import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import backgroundVideo from '../assets/BGAURORAFRONT.webm';
import BGFRONT from '../assets/BGFRONT.png';
import GlobalStyles from '../globalStyles';

// Carregando a fonte Share Tech Mono do Google Fonts
const FontImport = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
  overflow: hidden;
  font-family: 'Share Tech Mono', monospace; /* Aplicando a fonte globalmente */
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const AuroraImage = styled(motion.img)`
  width: 400px;
  height: 400px;
  margin-bottom: 20px;
`;

// Estilos do botão com efeito neon e pulse
const NeonButton = styled(motion.button)`
  background-color: transparent;
  color: #00ffea; /* Cor do texto */
  font-family: 'Share Tech Mono', monospace; /* Aplicando a fonte */
  font-size: 1.5rem;
  font-weight: bold;
  padding: 15px 30px;
  border: 2px solid #00ffea;
  border-radius: 50px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  outline: none;
  transition: all 0.3s ease;

  /* Efeito de borda neon */
  box-shadow: 0 0 10px #00ffea, 0 0 20px #00ffea, 0 0 40px #00ffea, 0 0 80px #00ffea;
  animation: neon-glow 1.5s infinite alternate;

  /* Efeito de hover */
  &:hover {
    background-color: #00ffea;
    color: #000;
    box-shadow: 0 0 20px #00ffea, 0 0 40px #00ffea, 0 0 80px #00ffea, 0 0 120px #00ffea;
  }

  /* Efeito de clique */
  &:active {
    transform: scale(0.95);
  }

  /* Animação de brilho neon */
  @keyframes neon-glow {
    0% {
      box-shadow: 0 0 10px #00ffea, 0 0 20px #00ffea, 0 0 40px #00ffea, 0 0 80px #00ffea;
    }
    100% {
      box-shadow: 0 0 20px #00ffea, 0 0 40px #00ffea, 0 0 80px #00ffea, 0 0 120px #00ffea;
    }
  }
`;

// Estilos da caixa de texto de apresentação
const PresentationText = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.8); /* Fundo escuro semi-transparente */
  color: #00ffea; /* Cor do texto neon */
  font-family: 'Share Tech Mono', monospace; /* Aplicando a fonte */
  padding: 20px;
  border-radius: 15px;
  font-size: 1.2rem;
  text-align: center;
  max-width: 400px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px #00ffea, 0 0 20px #00ffea; /* Efeito neon */
`;

export const HomePage = () => {
  const presentationMessage = "Olá! Eu sou a Aéris, sua tutora de ensino. Estou aqui para guiar você em sua jornada de aprendizado. Vamos começar?";

  return (
    <>
   
      {/* Importando a fonte Share Tech Mono */}
      <FontImport />
      <GlobalStyles/>
      <Container>
        <VideoBackground autoPlay loop muted>
          <source src={backgroundVideo} type="video/mp4" />
          Seu navegador não suporta vídeos HTML5.
        </VideoBackground>
        <AuroraImage
          src={BGFRONT}
          alt="Aurora"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />
        <AnimatePresence>
          <PresentationText
            key="presentation-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {presentationMessage}
          </PresentationText>
        </AnimatePresence>
        <NeonButton
          onClick={() => (window.location.href = '/interface')}
          whileHover={{ scale: 1.1 }} /* Efeito de escala ao passar o mouse */
          whileTap={{ scale: 0.9 }} /* Efeito de clique */
          animate={{ scale: [1, 1.05, 1], transition: { duration: 1.5, repeat: Infinity } }} /* Efeito de pulse */
        >
          Iniciar
        </NeonButton>
      </Container>
    </>
  );
};