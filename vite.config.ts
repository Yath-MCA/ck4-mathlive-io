import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/ck4-mathlive-io',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
