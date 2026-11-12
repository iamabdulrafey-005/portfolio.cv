import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import fs from 'fs'
import path from 'path'

const currentDir = import.meta.dirname || process.cwd();

function copyToRootPlugin() {
  return {
    name: 'copy-to-root',
    closeBundle() {
      try {
        const distFile = path.resolve(currentDir, 'dist', 'index.dev.html');
        const fallbackDist = path.resolve(currentDir, 'dist', 'index.html');
        const rootIndex = path.resolve(currentDir, 'index.html');
        const rootPortfolio = path.resolve(currentDir, 'portfolio.html');

        let src = fs.existsSync(distFile) ? distFile : (fs.existsSync(fallbackDist) ? fallbackDist : null);
        if (src) {
          const content = fs.readFileSync(src, 'utf8');
          fs.writeFileSync(rootIndex, content);
          fs.writeFileSync(rootPortfolio, content);
          fs.writeFileSync(fallbackDist, content);
          console.log('\n[copy-to-root] Successfully updated root index.html and portfolio.html!');
        }
      } catch (err) {
        console.error('[copy-to-root error]', err);
      }
    }
  }
}

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    viteSingleFile(),
    copyToRootPlugin(),
  ],
  build: {
    rollupOptions: {
      input: path.resolve(currentDir, 'index.dev.html'),
    }
  },
  server: {
    port: 5173,
    open: '/index.dev.html',
  }
})
