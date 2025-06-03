// FILE: vite.config.js

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import path from 'path'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),

    quasar({
      sassVariables: '@/quasar-variables.sass'
    }),
    vueDevTools(),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.json'], // 导入时想要省略的扩展名列表
    alias: {
      "@": path.resolve(__dirname, "./src"), // 核心配置
      // 可添加更多别名
      "@components": path.resolve(__dirname, "./src/components"),
      "@page": path.resolve(__dirname, "./src/page"),
    },
  }
})




