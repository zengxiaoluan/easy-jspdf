import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base:'./',
  root: '.',
  build: {
    outDir: 'dist'
  },
  server: {
    port: 3001
  },
  resolve: {
    alias: {
    }
  }
})