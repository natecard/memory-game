import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/memory-game/',
  plugins: [react()],
  indexHTML: './index.html',
  jsx: 'react',
  assetsDir: './static',
  rollupInputOptions: {
    input: './src/main.jsx',
  },
});
