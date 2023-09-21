import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/rw5-green-house/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['react-qr-code']
  }
})
