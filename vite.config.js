import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Served at https://xiliu8006.github.io/Lang-SVG/
export default defineConfig({
  plugins: [vue()],
  base: '/Lang-SVG/',
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
