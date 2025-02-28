import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Porta do servidor de desenvolvimento
  },
  build: {
    outDir: 'dist', // Pasta de saída do build
  },
});