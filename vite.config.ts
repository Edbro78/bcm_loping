import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vitest/config';
import react from '@vitejs/plugin-react';

const root = path.dirname(fileURLToPath(import.meta.url));

/** Dev-serveren kompilerer TypeScript. Filen på disk laster den ferdigbygde bunten. */
function devEntry(): Plugin {
  return {
    name: 'dev-entry',
    apply: 'serve',
    transformIndexHtml(html) {
      return html
        .replace(/\s*<link rel="stylesheet" href="\.\/dist\/dashboard\.css"\s*\/?>/, '')
        .replace(
          '<script src="./dist/dashboard.js"></script>',
          '<script>window.__BCM_VITE__=true</script><script type="module" src="/src/main.tsx"></script>',
        );
    },
  };
}

export default defineConfig({
  plugins: [react(), devEntry()],
  base: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    copyPublicDir: false,
    cssCodeSplit: false,
    rollupOptions: {
      input: path.resolve(root, 'src/main.tsx'),
      output: {
        format: 'iife',
        name: 'BcmDashboard',
        inlineDynamicImports: true,
        entryFileNames: 'dashboard.js',
        assetFileNames(asset) {
          const name = asset.names?.[0] ?? asset.name ?? '';
          if (name.endsWith('.css')) return 'dashboard.css';
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.ts'],
  },
});
