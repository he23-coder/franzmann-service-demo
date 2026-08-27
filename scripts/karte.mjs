/**
 * Baut einen statischen Kartenausschnitt aus OpenStreetMap-Kacheln.
 * Vorteil gegenüber einem eingebetteten Rahmen: keine Verbindung zu Dritten
 * beim Besuch der Seite, kein Nachladen, kein Springen des Layouts.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const LAT = 49.546689, LON = 8.673495, Z = 17;
let KACHEL = 256;
const SPALTEN = 5, ZEILEN = 4;

const x = ((LON + 180) / 360) * 2 ** Z;
const y =
  ((1 - Math.log(Math.tan((LAT * Math.PI) / 180) + 1 / Math.cos((LAT * Math.PI) / 180)) / Math.PI) / 2) *
  2 ** Z;

const x0 = Math.floor(x) - Math.floor(SPALTEN / 2);
const y0 = Math.floor(y) - Math.floor(ZEILEN / 2);

const teile = [];
for (let i = 0; i < SPALTEN; i++) {
  for (let j = 0; j < ZEILEN; j++) {
    const u = `https://tile.openstreetmap.org/${Z}/${x0 + i}/${y0 + j}.png`;
    const r = await fetch(u, {
      headers: { 'User-Agent': 'franzmann-website-build/1.0 (statische Karte, einmalig beim Build)' },
    });
    if (!r.ok) throw new Error(`Kachel ${u} -> ${r.status}`);
    const daten = Buffer.from(await r.arrayBuffer());
    if (teile.length === 0) {
      const meta = await sharp(daten).metadata();
      KACHEL = meta.width ?? 256;
    }
    teile.push({ daten, i, j });
  }
}

const B = SPALTEN * KACHEL, H = ZEILEN * KACHEL;
const platziert = teile.map((t) => ({ input: t.daten, left: t.i * KACHEL, top: t.j * KACHEL }));
// Position des Betriebs innerhalb des zusammengesetzten Bildes
const px = Math.round((x - x0) * KACHEL);
const py = Math.round((y - y0) * KACHEL);

const marke = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${B}" height="${H}">
  <circle cx="${px}" cy="${py}" r="26" fill="#344d6d" opacity="0.14"/>
  <path d="M${px} ${py - 30} a 13 13 0 0 1 13 13 c0 9 -13 21 -13 21 s-13 -12 -13 -21 a 13 13 0 0 1 13 -13 z"
        fill="#344d6d" stroke="#ffffff" stroke-width="2.5"/>
  <circle cx="${px}" cy="${py - 17}" r="4.5" fill="#ffffff"/>
</svg>`);

await mkdir('public/bilder', { recursive: true });
const roh = await sharp({ create: { width: B, height: H, channels: 3, background: '#e9e0d5' } })
  .composite([...platziert, { input: marke, left: 0, top: 0 }])
  .png()
  .toBuffer();

// Auf den Betrieb zentrierter Ausschnitt im Verhältnis 3:2
const breite = Math.min(2 * px, 2 * (B - px), B, 1050);
const hoehe = Math.min(2 * py, 2 * (H - py), H, Math.round(breite / 1.5));
const zuschnitt = {
  left: Math.round(px - breite / 2),
  top: Math.round(py - hoehe / 2),
  width: Math.round(breite),
  height: Math.round(hoehe),
};
await sharp(roh).extract(zuschnitt).resize(1200).webp({ quality: 82 })
  .toFile('public/bilder/karte-muenzgasse.webp');
await sharp(roh).extract(zuschnitt).resize(700).webp({ quality: 78 })
  .toFile('public/bilder/karte-muenzgasse-700.webp');
console.log('Ausschnitt:', zuschnitt);
console.log(`Karte gebaut: ${B}x${H}, Marke bei ${px}/${py}`);
