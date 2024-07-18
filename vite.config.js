// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ['revlib']  // Ensure 'revlib' is included in optimization
  },
  resolve: {
    alias: {
      'revlib': 'revlib/dist/index.esm.js',
      '@revlib': 'revlib/dist/index.js'  // Add CommonJS alias if needed
    }
  }
});