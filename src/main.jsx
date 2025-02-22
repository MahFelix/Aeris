import React from 'react';
import ReactDOM from 'react-dom/client'; // 🚀 Use 'react-dom/client' no React 18+
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // ✅ Crie a raiz corretamente

root.render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>
);
