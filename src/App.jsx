// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { InterfacePage } from './components/InterfacePage';
import { ChatPage } from './components/ChatPage';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/interface" element={<InterfacePage />} />
          <Route path="/chat/:topic" element={<ChatPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App; // ✅ Agora a importação funcionará corretamente
