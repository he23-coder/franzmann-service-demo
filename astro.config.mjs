// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Statischer Build. Der Worker (src/worker.ts) liefert die Dateien aus und setzt
// die Sicherheits- und Indexierungs-Header für jede Antwort.
export default defineConfig({
  // Adresse der veröffentlichten Seite. Sie fließt in canonical, Open Graph
  // und die Sitemap ein und lässt sich beim Bauen überschreiben:
  //   SITE_URL=https://…workers.dev npm run build
  // `||` statt `??`: eine nicht gesetzte Variable kommt als leerer String an.
  site: process.env.SITE_URL || 'https://franzmann-bad-heizung-weinheim.workers.dev',
  output: 'static',
  trailingSlash: 'never',
  integrations: [sitemap()],
  build: { format: 'file', inlineStylesheets: 'auto' },
  image: { responsiveStyles: true },
  vite: { build: { cssMinify: 'lightningcss', assetsInlineLimit: 0 } },
});
