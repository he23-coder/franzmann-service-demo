/**
 * Kundenstimmen.
 *
 * Grundsatz: Es wird ausschließlich wiedergegeben, was sich öffentlich nachlesen lässt.
 * Jeder Eintrag trägt die Plattform, auf der er veröffentlicht wurde, und einen Link
 * dorthin. Texte stehen wörtlich und ungekürzt.
 *
 * Das Google-Unternehmensprofil ist bestätigt: Der Betrieb hat den Teilen-Link
 * selbst genannt; er löst auf die Google-Kennung /g/1tg9m25r für
 * „Hermann Franzmann GmbH" auf (siehe docs/source-audit.md, Abschnitt 1B).
 * Darauf verweisen die Schaltflächen dieses Abschnitts.
 *
 * Die einzelnen Google-Bewertungen selbst konnten nicht ausgelesen werden —
 * Google liefert ohne Browser nur eine Weiterleitungsseite und weist
 * Textabruf mit einer Sicherheitsabfrage ab. Deshalb steht hier bewusst
 * KEINE Google-Note und KEINE nacherzählte Google-Bewertung. Sobald die
 * Texte vorliegen, werden sie hier ergänzt; Karussell und strukturierte
 * Daten übernehmen sie ohne weitere Änderung.
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
} as const;

/**
 * Das Google-Unternehmensprofil des Betriebs. Die Adresse stammt aus dem
 * Teilen-Link, den der Betrieb selbst genannt hat; hier steht die aufgelöste
 * Form ohne Zählparameter. Auf dem Profil führt „Rezension schreiben"
 * unmittelbar zum Bewertungsformular.
 */
export const googleProfil = {
  url: 'https://www.google.com/search?kgmid=/g/1tg9m25r&q=Hermann+Franzmann+GmbH',
  kennung: '/g/1tg9m25r',
  checkedOn: '2026-08-28',
} as const;
