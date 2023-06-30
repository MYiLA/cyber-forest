import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import { resolve } from 'node:path'
import { viteStaticCopy } from 'vite-plugin-static-copy'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: resolve(__dirname, './src/assets'),
          dest: '',
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        app: './index.html',
        'service-worker': './src/service-worker.ts',
      },
      output: {
        entryFileNames: assetInfo => {
          return assetInfo.name === 'service-worker'
            ? '[name].js'
            : 'assets/[name].[hash].js'
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
