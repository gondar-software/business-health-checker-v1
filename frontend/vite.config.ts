import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
    ]
  },
  build: {
    outDir: "./dist",
    emptyOutDir: true,
    chunkSizeWarningLimit: 5120,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
    allowedHosts: [
      "business-health-checker-v1.portfolio-app.online",
      "www.business-health-checker-v1.portfolio-app.online"
    ]
  },
});