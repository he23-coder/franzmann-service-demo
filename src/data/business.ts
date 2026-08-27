/**
 * Einzige Quelle für alle Betriebsdaten.
 * Jeder Wert ist in docs/source-audit.md mit Fundstelle belegt.
 * Nichts hier ist geschätzt, gerundet oder ergänzt.
 */

export interface OpeningHours {
  readonly days: string;
  readonly from: string;
  readonly to: string;
  /** Wochentage nach schema.org, für strukturierte Daten. */
  readonly schemaDays: readonly string[];
}

export const business = {
  legalName: 'Hermann Franzmann GmbH',
  brand: 'Franzmann',
  /** Unterzeile der Wortmarke. */
  brandLine: 'Bad und Heizung',
  /** Beschilderung am Betriebsgebäude, Münzgasse. */
  signage: ['Sanitär', 'Heizung', 'Solar'],
  claim: 'Ihr Bad- und Heizungsspezialist in Weinheim und Umgebung',

  address: {
    street: 'Münzgasse 5',
    postalCode: '69469',
    city: 'Weinheim',
    region: 'Baden-Württemberg',
    country: 'DE',
    /** Stadtteil laut OpenStreetMap. */
    quarter: 'Gerberbachviertel, Altstadt',
  },

  /** Belegt durch OpenStreetMap (Nominatim) und 11880-Strukturdaten. */
  geo: { lat: 49.546689, lng: 8.673495 },

  phone: { display: '(06201) 9033-0', href: 'tel:+49620190330' },
  /** Laut Website identisch mit der Zentrale. */
  emergency: { display: '06201 9033-0', href: 'tel:+49620190330' },
  fax: { display: '(06201) 9033-15' },
  email: 'mail@franzmann-service.de',

  officeHours: {
    days: 'Montag bis Freitag',
    from: '07:30',
    to: '16:00',
    schemaDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  } satisfies OpeningHours,

  legal: {
    register: 'Handelsregister Mannheim HRB 431021',
    court: 'Amtsgericht Mannheim',
    jurisdiction: 'Weinheim',
    taxNumber: '47020/09270',
    managingDirector: 'Dipl.-Ing. (FH) Jens Thron',
    supervisoryAuthority: 'Handwerkskammer Mannheim',
    registryEntry: 'Handwerkskammer Mannheim HRB Nr. 431021',
    insuranceScope: 'Weinheim',
  },

  /** Wörtliche Eigenaussagen der bestehenden Website. Nicht paraphrasiert. */
  ownStatements: {
    experience: 'mehr als 100 Jahren Erfahrung',
    scope: 'Wir decken das gesamte Spektrum von Keller bis zum Dach ab.',
    satisfaction: 'Erst wenn Sie zufrieden sind, sind wir es auch!',
    service: 'Wenn Sie uns brauchen, sind wir da!',
    bathrooms: 'Über 1000 Bäder haben wir bereits realisiert!',
    philosophy:
      'Wir verbinden passionierte Handwerksphilosophie mit modernster Büroorganisation.',
  },
} as const;

export const routeUrl =
  `https://www.openstreetmap.org/directions?to=${business.geo.lat}%2C${business.geo.lng}`;

export const mapUrl =
  `https://www.openstreetmap.org/?mlat=${business.geo.lat}&mlon=${business.geo.lng}#map=18/${business.geo.lat}/${business.geo.lng}`;
