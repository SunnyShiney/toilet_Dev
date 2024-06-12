import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

//node.js中的path模块，处理路径相关的
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      //__dirname是拿到当前目录的路径，然后找到src目录，取别名为“~”
      "~": path.resolve(__dirname, "src"),
    },
  },

  //解决禁止跨域问题
  server: {
    proxy: {
      "/api": {
        // target: "http://ceshi13.dishait.cn",
        //政务云
        // target: "http://175.153.176.27:17704/api",
        //市政务云
        target: "https://119.4.191.13:8861/api",
        // target: "http://127.0.0.1:8860/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },

      // "/monitor": {
      //   target: "http://175.153.176.27:17704/",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/monitor/, ""),
      // },
    },
  },

  plugins: [vue(), WindiCSS()],
});
