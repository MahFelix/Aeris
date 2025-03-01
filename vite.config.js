import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa'; // Importe o plugin

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "Aeris-Smart",
        short_name: "Aeris",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "/assets/Aeris.png", // Caminho relativo à raiz do projeto
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/assets/Aerus.png", // Caminho relativo à raiz do projeto
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ],
  server: {
    port: 3000, // Porta do servidor de desenvolvimento
  },
  build: {
    outDir: 'dist', // Pasta de saída do build
  }
});