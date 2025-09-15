import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Make sure there is NOT a 'base' property here, like:
  // base: '/my-app/',
})