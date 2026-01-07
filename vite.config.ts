import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@sonex/sdk-browser': path.resolve(__dirname, 'C:/Users/Lenovo/Documents/mono-repos/sonex/packages/sdk-browser/dist/index.mjs'),
      '@sonex/sdk-core': path.resolve(__dirname, 'C:/Users/Lenovo/Documents/mono-repos/sonex/packages/sdk-core/dist/index.mjs')
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})

