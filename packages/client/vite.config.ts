import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { resolve } from 'node:path'
import dotenv from 'dotenv'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    supported: {
      'top-level-await': true,
    },
  },
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [react(), svgr()],
  build: {
    minify: true,
    rollupOptions: {
      input: {
        app: './index.html',
        'service-worker': './service-worker.ts',
        'entry-server': './src/entry-server.tsx',
      },
      output: {
        entryFileNames: assetInfo => {
          switch (assetInfo.name) {
            case 'service-worker':
              return '[name].js'
              break
            case 'entry-server':
              return '[name].js'
              break
            default:
              return 'assets/[name].[hash].js'
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      '@api': resolve(__dirname, './src/core/api/'),
      '@core': resolve(__dirname, './src/core/'),
      '@config': resolve(__dirname, './src/core/config/'),
      '@router': resolve(__dirname, './src/core/router/'),
      '@store': resolve(__dirname, './src/core/store/'),
      '@pages': resolve(__dirname, './src/pages/'),
      '@shared': resolve(__dirname, './src/shared/'),
      '@hooks': resolve(__dirname, './src/shared/hooks/'),
      '@layouts': resolve(__dirname, './src/shared/layouts/'),
      '@ui': resolve(__dirname, './src/shared/ui/'),
      '@utils': resolve(__dirname, './src/shared/utils/'),
      '@scss': resolve(__dirname, './src/core/scss/'),
      '@images': resolve(__dirname, './src/assets/images/'),
      '@fonts': resolve(__dirname, './src/assets/fonts/'),
    },
  },
})
