import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
  },
  server: {
    host: 'local.engine9.io',
    port: 3000,
    hmr: {
      overlay: false,

    },
  },
  resolve: {
    alias: [
      {
        find: '@crema',
        replacement: fileURLToPath(new URL('./src/@crema', import.meta.url)),
      },
      {
        find: '@engine9',
        replacement: fileURLToPath(new URL('./src/@engine9', import.meta.url)),
      },
      {
        find: '@market',
        replacement: fileURLToPath(new URL('./src/@market', import.meta.url)),
      },
    ],
  },
});
