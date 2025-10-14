import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig, BuildOptions } from 'vite'
import * as path from 'path'
import vue from '@vitejs/plugin-vue'
import ElementPlus from 'unplugin-element-plus/vite'
import legacy from '@vitejs/plugin-legacy'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import tailwindcss from '@tailwindcss/vite'
import sass from 'sass'
import MotionResolver from 'motion-v/resolver'
import Components from 'unplugin-vue-components/vite' // 自动引入插件
const isProd = process.env.VITE_BUILD_ENV === 'prod'

const buildConf = (): BuildOptions => {
  const conf: BuildOptions = {
    outDir: 'dist',
    sourcemap: !isProd,
    rollupOptions: {
      output: {
        manualChunks: {
          lodash: ['lodash-es'],
          elementPlus: ['element-plus']
        }
      }
    }
  }
  // conf.target = 'chrome63'
  // 兼容国产低版本浏览器，红莲花和奇安信浏览器
  conf.target = 'es2015'
  return conf

}
export default () => {
  return defineConfig({
    base: './',
    build: buildConf(),
    server: {
      port: 4500,
      host: true,
      proxy: {
        // api proxy
        '/java_main_api': {
          // target: 'http://192.168.0.103:8196',
          // target: 'http://175.27.162.246:8196', // 线上
          target: 'http://36.213.68.154:8099', // 测试
          // target: 'https://www.afgxq.com:17087', // 测试
          changeOrigin: true,
          rewrite: path =>
            path.replace(
              new RegExp('^/java_main_api'),
              '/api'
            )
        },
        '/dify-api': {
          target: 'http://175.27.162.246:16130',
          changeOrigin: true,
          rewrite: path =>
            path.replace(
              new RegExp('^/dify-api'),
              '/dify-api'
            )
        }
      }
    },
    resolve: {
      alias: [
        { find: /^~/, replacement: '' },
        { find: '@', replacement: path.resolve(__dirname, 'src') },
        { find: '@static', replacement: path.resolve(__dirname, 'public/static') },
        { find: 'static', replacement: path.resolve(__dirname, 'public/static') },

      ]
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', // 使用现代 API
          // 使用新版 Dart Sass API
          implementation: sass, // 直接使用导入的模块
          additionalData: `@use "@/styles/element.scss" as *;
        @use "@/styles/theme.scss" as *;

        `
        }
      }
    },
    plugins: [
      vue(),
      Components({
        dts: true,
        resolvers: [
          MotionResolver()
        ],
      }),
      VueSetupExtend(),
      // 代码检查插件，开发阶段可以通过点击浏览器上的DOM元素定位到源码
      codeInspectorPlugin({
        bundler: 'vite',
        editor: 'cursor'
      }),
      ElementPlus({
        useSource: true,
        format: 'esm'
      }),

      AutoImport({
        // 这里列出了你需要自动导入的模块或库
        imports: ['vue', 'vue-router'],
        // 生成类型声明文件
        dts: 'src/typings/auto-imports.d.ts'
      }),
      legacy(),
      tailwindcss()
      // inZZD &&
      //   legacy({
      //     targets: ['Chrome 63'],
      //     modernPolyfills: true
      //   })
    ]
  })
}
