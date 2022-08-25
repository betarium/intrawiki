import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import envCompatible from 'vite-plugin-env-compatible'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    envCompatible({ prefix: "REACT_APP_", mountedPath: "process.env" }),
  ],
  build: {
    outDir: "build",
  },
  server: {
    open: true,
    proxy: {
      '/intrawiki-manage/api': 'http://localhost:4000',
    }
  },
})
