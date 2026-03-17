import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/paystack': {
        target: 'https://api.paystack.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/paystack/, '')
      }
    }
  }
})
