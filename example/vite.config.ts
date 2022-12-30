import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import viteImageInfo from "../src/index";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteImageInfo()
  ],
})
