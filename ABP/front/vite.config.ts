
import tailwindcss from "@tailwindcss/vite";

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Se você usa "@/..." nos imports
    },
  },
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
});


