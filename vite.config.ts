import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { analyzer } from 'vite-bundle-analyzer'
import { resolve } from 'path'
// import react from "@vitejs/plugin-react";

console.log('🚀  ', resolve(__dirname, 'lib'))
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // react(), default is plugin in development
    dts({ include: ['lib'], exclude: ['src'] }) as any,
    analyzer({
      openAnalyzer: false,
      enabled: false,
      fileName: 'bundle-analyzer.html',
    }),
  ],

  server: {
    port: 10006,
    host: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'lib'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es'],
    },
    copyPublicDir: false,
    rollupOptions: {
      external: (id) =>
        !id.startsWith('.') && !id.startsWith('/') && !id.startsWith('@/'),
      output: {
        preserveModules: true,
        preserveModulesRoot: 'lib',
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: (chunkInfo) => `${chunkInfo.name}.js`,
      },
    },
  },
})
