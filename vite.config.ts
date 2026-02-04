import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      open: false, // Set to true to auto-open report
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html'
    })
  ],
})
