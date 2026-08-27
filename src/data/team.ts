/**
 * Das Team. Namen, Rollen und Porträts sind von der Seite /team/ der bestehenden
 * Website übernommen. Es wurde niemand hinzugefügt, umbenannt oder befördert.
 */

export interface TeamMember {
  readonly name: string;
  readonly role: string;
  readonly photo: string;
  /** Gruppierung für die Darstellung. */
  readonly group: 'leitung' | 'kundendienst' | 'montage' | 'ausbildung';
}

export const team = [
  { name: 'Jens Thron', role: 'Geschäftsführer (Dipl.-Ing.)', photo: '/team/jens-thron.webp', group: 'leitung' },
  { name: 'Alexander Schmitt', role: 'Projektleiter (Meister)', photo: '/team/alexander-schmitt.webp', group: 'leitung' },
  { name: 'Anja Fischer', role: 'Büroleitung', photo: '/team/anja-fischer.webp', group: 'leitung' },
  { name: 'Jo Brodmann', role: 'Kundendiensttechniker', photo: '/team/jo-brodmann.webp', group: 'kundendienst' },
  { name: 'Tobias Kain', role: 'Kundendiensttechniker-SHK', photo: '/team/tobias-kain.webp', group: 'kundendienst' },
  { name: 'Alen Brkic', role: 'Kundendiensttechniker', photo: '/team/alen-brkic.webp', group: 'kundendienst' },
  { name: 'Jan Hoffmann', role: 'Kundendiensttechniker', photo: '/team/jan-hoffmann.webp', group: 'kundendienst' },
  { name: 'Francisco Hormigo', role: 'Monteur (Meister)', photo: '/team/francisco-hormigo.webp', group: 'montage' },
  { name: 'Aliou Saibou', role: 'Monteur', photo: '/team/aliou-saibou.webp', group: 'montage' },
  { name: 'Sejad Brkic', role: 'Monteur', photo: '/team/sejad-brkic.webp', group: 'montage' },
  { name: 'Micha Pestel', role: 'Monteur', photo: '/team/micha-pestel.webp', group: 'montage' },
  { name: 'Jamie Kerth', role: 'Auszubildender', photo: '/team/jamie-kerth.webp', group: 'ausbildung' },
] as const satisfies readonly TeamMember[];
