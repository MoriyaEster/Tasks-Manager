import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Trello/',
  server: {
    port: 5174
  },
  plugins: [react()],
})
