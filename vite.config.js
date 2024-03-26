import react from '@vitejs/plugin-react';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: browserslistToEsbuild(),
  },
  server: true,
  plugins: [react()],
  test: {
    global: true,
    environment: 'jsdom',
  },
});
