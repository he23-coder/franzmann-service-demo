import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
const SRC = '/tmp/claude-0/-home-user-franzmann-service-demo/1ead0108-cf8b-509f-a35b-ae818794b977/scratchpad/assets';
await mkdir('public/bilder', { recursive: true });
await mkdir('public/team', { recursive: true });

const team = [
  ['Jens-Thron-Geschäftsführer.jpg', 'jens-thron'],
  ['Alexander-Schmitt-Kundendienstmonteur-Meister.jpg', 'alexander-schmitt'],
  ['Anja-Fischer-Büroleiterin.jpg', 'anja-fischer'],
  ['Jo-Brodmann-Kundendiensttechniker.jpg', 'jo-brodmann'],
  ['Tobias-Kain-Kundendiensttechniker-SHK.jpg', 'tobias-kain'],
  ['Francisco-Hormigo-Monteur.jpg', 'francisco-hormigo'],
  ['Aliou-Saibou.jpeg', 'aliou-saibou'],
  ['Sejad-Brkic.jpg', 'sejad-brkic'],
  ['Alen-Brkic-Auszubildender.jpeg', 'alen-brkic'],
  ['Micha-Pestel-Auszubildender.jpeg', 'micha-pestel'],
  ['Jan-Hoffmann.jpg', 'jan-hoffmann'],
  ['firma-franzmann-Kerth-herr-internet.jpg', 'jamie-kerth'],
];
for (const [src, out] of team) {
  await sharp(`${SRC}/${src}`)
    .resize(560, 700, { fit: 'cover', position: 'top' })
    .webp({ quality: 78 })
    .toFile(`public/team/${out}.webp`);
}

const scenes = [
  ['k-Franzmann-2.jpg',        'betrieb-muenzgasse', 1600, 1067],
  ['Heizung.jpg',              'waerme-heizraum',    1400,  999],
  ['Wärme-1.jpg',              'waerme-kessel',      1200,  857],
  ['Wasserhahn_1.jpg',         'bad-armatur',        1400,  884],
  ['Badezimmer-bearbeitet-hoch.jpg', 'bad-raum',     1200,  800],
  ['Klimaanlage.png',          'klima-anlage',       1300,  845],
  ['Brennstoffzelle-1.jpg',    'kundendienst-technik', 1200, 857],
  ['Solar.jpg',                'waerme-solar',       1200,  800],
];
for (const [src, out, w, h] of scenes) {
  await sharp(`${SRC}/${src}`).resize(w, h, { fit: 'cover' }).webp({ quality: 76 }).toFile(`public/bilder/${out}.webp`);
  await sharp(`${SRC}/${src}`).resize(Math.round(w / 2), Math.round(h / 2), { fit: 'cover' }).webp({ quality: 72 }).toFile(`public/bilder/${out}-800.webp`);
}
await sharp(`${SRC}/franzmann_logo_web.png`).resize(572).png({ quality: 90 }).toFile('public/franzmann-logo.png');
console.log('Bilder fertig.');
