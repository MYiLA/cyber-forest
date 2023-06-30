import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import * as path from 'path'

const clientDir = path.join(__dirname, '..', 'client')

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@api': resolve(clientDir, './src/core/api/'),
      '@core': resolve(clientDir, './src/core/'),
      '@config': resolve(clientDir, './src/core/config/'),
      '@router': resolve(clientDir, './src/core/router/'),
      '@store': resolve(clientDir, './src/core/store/'),
      '@pages': resolve(clientDir, './src/pages/'),
      '@shared': resolve(clientDir, './src/shared/'),
      '@hooks': resolve(clientDir, './src/shared/hooks/'),
      '@layouts': resolve(clientDir, './src/shared/layouts/'),
      '@ui': resolve(clientDir, './src/shared/ui/'),
      '@utils': resolve(clientDir, './src/shared/utils/'),
      '@scss': resolve(clientDir, './src/core/scss/'),
      '@images': resolve(clientDir, './src/assets/images/'),
      '@fonts': resolve(clientDir, './src/assets/fonts/'),
    },
  },
})
