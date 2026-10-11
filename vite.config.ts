import react from '@vitejs/plugin-react';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import {defineConfig} from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: browserslistToEsbuild(),
  },
  server: {
    open: true,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  plugins: [react()],
  // Also runs the api/ tests, which need api/node_modules installed
  // (npm ci --prefix api)
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'setupTest.js',
  },
});
