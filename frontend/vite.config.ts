import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcss from 'postcss';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './build',
  },
  css: {
    postcss,
  },
});
