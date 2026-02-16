import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),        // ✅ REQUIRED for React HMR
    tailwindcss(),
  ],
  server: {
    watch: {
      usePolling: true, // ✅ Fixes Windows refresh issue
    },
    hmr: true,
  },
});
