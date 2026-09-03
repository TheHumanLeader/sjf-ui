import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  root: 'docs',
  base: '/sjf-ui/',
  plugins: [
    vue({
      features: {
        vapor: true,
        optionsAPI: false,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@docs': fileURLToPath(new URL('./docs', import.meta.url)),
    },
  },
  build: {
    outDir: '../dist-docs',
    emptyOutDir: true,
  },
})
