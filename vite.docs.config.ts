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
      '@': new URL('./src', import.meta.url).pathname,
      '@docs': new URL('./docs', import.meta.url).pathname,
    },
  },
  build: {
    outDir: '../dist-docs',
    emptyOutDir: true,
  },
})
