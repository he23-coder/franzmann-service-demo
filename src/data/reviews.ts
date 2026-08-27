/**
 * Kundenstimmen.
 *
 * Grundsatz: Es wird ausschließlich wiedergegeben, was sich öffentlich nachlesen lässt.
 * Jeder Eintrag trägt die Plattform, auf der er veröffentlicht wurde, und einen Link
 * dorthin. Texte stehen wörtlich und ungekürzt.
 *
 * Zum Google-Unternehmensprofil siehe docs/source-audit.md, Abschnitt 1B: Es ließ sich
 * in dieser Umgebung nicht zweifelsfrei verifizieren. Deshalb steht hier keine
 * Google-Bewertung, keine Google-Gesamtnote und kein konstruierter Bewertungslink.
 * Sobald das Profil bestätigt ist, werden Einträge hier ergänzt — Karussell und
 * strukturierte Daten übernehmen sie ohne weitere Änderung.
 */

export interface Review {
  readonly id: string;
  readonly author: string;
  readonly rating: 1 | 2 | 3 | 4 | 5;
  readonly text: string;
  /** ISO-Datum der Veröffentlichung. */
  readonly date: string;
  /** Anzeigedatum, wie auf der Quellseite dargestellt. */
  readonly dateLabel: string;
  readonly platform: string;
  /** Link zur Quelle. Führt zur Bewertungsliste des Betriebs auf der Plattform. */
  readonly sourceUrl: string;
  /** Beschriftung des Links — verspricht keinen Einzel-Permalink, wo keiner existiert. */
  readonly sourceLabel: string;
}

export const reviews = [
  {
    id: 'elf-2024-01-22',
    author: 'Gast',
    rating: 5,
    text: 'Die Fa. Franzmann hat bei mir die Neuinstallation der Solvis-Gasheizanlage mit 750 l Pufferspeicher und Thermosolarunterstützung durchgeführt und später auch eine Solvis Mia Wärmepumpe integriert. Alle Arbeiten wurden zu meiner vollen Zufriedenheit ausgeführt. Ich wurde von der ersten Planung an bestens beraten und betreut, auch bei den Förderanträgen, und die nachfolgenden regelmässigen Wartungsarbeiten wurden zuverlässig vorgenommen. Ich fühle mich bei Franzmann rundum bestens aufgehoben. Danke.',
    date: '2024-01-22',
    dateLabel: '22. Januar 2024',
    platform: '11880.com',
    sourceUrl:
      'https://www.11880.com/branchenbuch/weinheim-an-der-bergstrasse/060692320B26531305/hermann-franzmann-gmbh.html',
    sourceLabel: 'Bei 11880.com ansehen',
  },
] as const satisfies readonly Review[];

/** Gesamtwertung laut Quelle. Nicht selbst errechnet, nicht aufgerundet. */
export const reviewsAggregate = {
  ratingValue: 5.0,
  reviewCount: 1,
  platform: '11880.com',
  checkedOn: '2026-08-27',
  profileUrl:
    'https://www.11880.com/branchenbuch/weinheim-an-der-bergstrasse/060692320B26531305/hermann-franzmann-gmbh.html',
  /** Offizielles Bewertungsformular der Plattform, per Anker auf der Profilseite. */
  writeReviewUrl:
    'https://www.11880.com/branchenbuch/weinheim-an-der-bergstrasse/060692320B26531305/hermann-franzmann-gmbh.html#jetzt-bewerten',
} as const;
