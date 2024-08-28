
import path from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': path.resolve('src/renderer/src'),
        '@': fileURLToPath(new URL('src/renderer/src', import.meta.url)),
        '~bootstrap': path.resolve('node_modules/bootstrap')
      }
    },
    plugins: [vue()]
  }
})
