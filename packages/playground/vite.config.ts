import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist'
  },
  server: {
    port: 3001
  },
  resolve: {
    alias: {
      'easy-jspdf': resolve(__dirname, '../easy-jspdf/src/lib/index.ts')
    }
  }
})