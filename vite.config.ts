import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vitest/config';
import react from '@vitejs/plugin-react';

const root = path.dirname(fileURLToPath(import.meta.url));

/** Vercel publiserer dist/. index.html der peker på bunten, og public/ er kopiert inn ved siden av. */
function publishIndex(): Plugin {
  return {
    name: 'publish-index',
    apply: 'build',
    async closeBundle() {
      const html = await fs.readFile(path.resolve(root, 'index.html'), 'utf8');
      const out = html
        .replace('./dist/dashboard.css', './dashboard.css')
        .replace(
          '<script src="./dist/dashboard.js"></script>',
          '<script>window.__BCM_PUBLIC__="";</script>\n    <script src="./dashboard.js"></script>',
        );
      await fs.writeFile(path.resolve(root, 'dist/index.html'), out);
    },
  };
}

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
  plugins: [react(), devEntry(), publishIndex()],
  base: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    copyPublicDir: true,
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
