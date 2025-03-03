import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/basic-website-with-typescript/',
  plugins: [
    tailwindcss(),
  ],
});