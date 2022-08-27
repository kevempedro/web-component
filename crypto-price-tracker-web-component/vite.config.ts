import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: "./src/web-component.js",
      formats: ['es', 'cjs'],
      name: 'crypto-price-tracker-web-component',
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs')
    },
    sourcemap: true,
    target: 'esnext',
    minify: false,
  }
})
