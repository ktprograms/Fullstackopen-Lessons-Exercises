import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    proxy: {
      // '/absproxy/5173/api': {
      //   target: 'https://vscode.home.test:8080/proxy/3000/api',
      //   secure: false,
      //   rewrite: (path) => path.replace(/^\/absproxy\/5173\/api/, '')
      // },
      '/api': {
        target: 'https://3000.vscode.home.test:8080/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
