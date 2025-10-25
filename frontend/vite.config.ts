import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import path from 'path'

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd())

  return defineConfig({
    base: env.VITE_BASE_URL,
    plugins: [
      vue({ template: { transformAssetUrls } }),
      quasar()
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  })
}
