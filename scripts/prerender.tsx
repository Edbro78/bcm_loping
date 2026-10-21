import React from 'react';
import { JSDOM } from 'jsdom';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import { ROUTES } from '../src/lib/site';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { window } = new JSDOM('');
(globalThis as typeof globalThis & { DOMParser: typeof window.DOMParser; document: Document }).DOMParser =
  window.DOMParser;
(globalThis as typeof globalThis & { document: Document }).document = window.document;

(globalThis as { __BCM_BUNDLED_GPX__?: string }).__BCM_BUNDLED_GPX__ = readFileSync(
  path.join(root, 'public/data/bcm-course.gpx'),
  'utf8',
);

const { App } = await import('../src/App');

const dist = path.join(root, 'dist');
const templateBase = readFileSync(path.join(dist, 'index.html'), 'utf8');

const PRERENDER_PATHS = [...ROUTES.map((r) => r.path), '/404'];

function depth(route: string): number {
  if (route === '/' || route === '/404') return 0;
  return route.split('/').filter(Boolean).length;
}

function withAssetPrefix(html: string, prefix: string): string {
  return html
    .replace(/\.\/dashboard\.css/g, `${prefix}dashboard.css`)
    .replace(/\.\/dashboard\.js/g, `${prefix}dashboard.js`)
    .replace(/window\.__BCM_PUBLIC__="";/g, `window.__BCM_PUBLIC__="${prefix === './' ? '' : prefix}";`);
}

function injectHead(template: string, helmet: HelmetServerState): string {
  const extra = [helmet.title.toString(), helmet.meta.toString(), helmet.link.toString(), helmet.script.toString()]
    .filter(Boolean)
    .join('\n');
  return template.replace('</head>', `${extra}\n</head>`);
}

for (const route of PRERENDER_PATHS) {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const body = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={route === '/404' ? '/finnes-ikke' : route}>
        <App />
      </StaticRouter>
    </HelmetProvider>,
  );
  const helmet = helmetContext.helmet!;
  const prefix = depth(route) === 0 ? './' : `${'../'.repeat(depth(route))}`;
  let out = withAssetPrefix(templateBase, prefix);
  out = injectHead(out, helmet);
  out = out.replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  const outDir =
    route === '/'
      ? dist
      : route === '/404'
        ? dist
        : path.join(dist, route.replace(/^\//, ''));
  mkdirSync(outDir, { recursive: true });
  const file = route === '/404' ? '404.html' : 'index.html';
  writeFileSync(path.join(outDir, file), out, 'utf8');
  console.log(`Prerendered ${route} -> ${path.relative(root, path.join(outDir, file))}`);
}
