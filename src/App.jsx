import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { InterfacePage } from "./components/InterfacePage";
import { ChatPage } from "./components/ChatPage";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import styled from "styled-components";


// Mockup do celular
const MockupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;


  .mockup {
    width: 775px; /* Largura de um iPhone padrão */
    height: 862px; /* Altura de um iPhone padrão */
    border-radius: 40px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    border: 10px solid black;
    display: flex;
    flex-direction: column;
    overflow: hidden;

  }

  /* Esconde o mockup no mobile */
  @media (max-width: 768px) {
    .mockup {
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 0;
      box-shadow: none;
    }
  }
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <MockupContainer>
        <div className="mockup">
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/interface" element={<InterfacePage />} />
              <Route path="/chat/:topic" element={<ChatPage />} />
            </Routes>
          </Router>
        </div>
      </MockupContainer>
    </ThemeProvider>
  );
};

export default App;