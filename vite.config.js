import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all network addresses (localhost, 127.0.0.1 & Wi-Fi LAN IP for Mobile/Tablet)
    port: 5173,
    strictPort: false,
    cors: true
  },
  preview: {
    host: '0.0.0.0',
    port: 4173
  }
})
