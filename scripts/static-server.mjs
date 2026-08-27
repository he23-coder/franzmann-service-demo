/**
 * Kleiner Server für Tests. Bildet nach, was der Worker später tut:
 * Pfade ohne Endung auf .html abbilden und dieselben Kopfzeilen setzen.
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';

const WURZEL = new URL('../dist/', import.meta.url).pathname;
const PORT = Number(process.env.PORT ?? 4321);

const TYPEN = {
  '.html': 'text/html; charset=UTF-8', '.css': 'text/css; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8', '.json': 'application/json; charset=UTF-8',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.xml': 'application/xml; charset=UTF-8',
};

const KOPF = {
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), interest-cohort=()',
  'Content-Security-Policy': [
    "default-src 'self'", "script-src 'self'", "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:", "font-src 'self'", "connect-src 'self'", "form-action 'self'", "frame-ancestors 'self'",
    "base-uri 'self'", "object-src 'none'",
  ].join('; '),
};

async function findeDatei(pfad) {
  const kandidaten = extname(pfad)
    ? [pfad]
    : [`${pfad}.html`, join(pfad, 'index.html'), pfad];
  for (const k of kandidaten) {
    try {
      const s = await stat(k);
      if (s.isFile()) return k;
    } catch { /* weiter */ }
  }
  return null;
}

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');

  if (url.pathname === '/api/termin') {
    const antwort = req.method === 'POST'
      ? { status: 503, body: { ok: false, code: 'kein_versandweg', nachricht: 'Die Anfrage konnte gerade nicht elektronisch zugestellt werden.' } }
      : { status: 405, body: { ok: false, code: 'methode', nachricht: 'Nur POST.' } };
    res.writeHead(antwort.status, { 'content-type': 'application/json; charset=utf-8', ...KOPF });
    res.end(JSON.stringify(antwort.body));
    return;
  }

  let p = decodeURIComponent(url.pathname);
  if (p.endsWith('/') && p !== '/') p = p.slice(0, -1);
  if (p === '/') p = '/index.html';
  const ziel = join(WURZEL, normalize(p).replace(/^(\.\.[/\\])+/, ''));

  const datei = await findeDatei(ziel);
  if (!datei) {
    const vierNullVier = await readFile(join(WURZEL, '404.html')).catch(() => 'Nicht gefunden');
    res.writeHead(404, { 'content-type': TYPEN['.html'], ...KOPF });
    res.end(vierNullVier);
    return;
  }

  const inhalt = await readFile(datei);
  res.writeHead(200, {
    'content-type': TYPEN[extname(datei)] ?? 'application/octet-stream',
    ...KOPF,
  });
  res.end(inhalt);
}).listen(PORT, () => console.log(`bereit auf http://127.0.0.1:${PORT}`));
