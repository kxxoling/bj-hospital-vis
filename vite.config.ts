import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [tailwindcss(), svelte()],
  server: {
    port: 4100,
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1800,
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('maplibre-gl')) return 'maplibre'
            if (id.includes('@turf')) return 'turf'
            return 'vendor'
          }
        },
      },
    },
  },
})
