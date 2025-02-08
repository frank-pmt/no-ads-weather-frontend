import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { dirname, resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.mts'],
    include: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
    exclude: ['node_modules', '.next', 'cypress'],
    alias: {
      '@': resolve(__dirname, './src/app')
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src/app')
    }
  }
})