import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import viteImageInfo from "vite-image-info";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteImageInfo()
  ],
})
