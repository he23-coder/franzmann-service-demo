// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Statischer Build. Der Worker (src/worker.ts) liefert die Dateien aus und setzt
// die Sicherheits- und Indexierungs-Header für jede Antwort.
export default defineConfig({
  site: 'https://franzmann-service-demo.he23-coder.workers.dev',
  output: 'static',
  trailingSlash: 'never',
  integrations: [sitemap()],
  build: { format: 'file', inlineStylesheets: 'auto' },
  image: { responsiveStyles: true },
  vite: { build: { cssMinify: 'lightningcss', assetsInlineLimit: 0 } },
});
