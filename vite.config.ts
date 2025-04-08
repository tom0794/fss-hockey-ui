import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const backendHost = env.BACKEND_HOST || 'http://localhost'
  const backendPort = env.BACKEND_PORT || '8080'
  const backendUrl = `${backendHost}:${backendPort}`
  console.log(`[vite] Proxy target: ${backendUrl}`)

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: backendUrl,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
