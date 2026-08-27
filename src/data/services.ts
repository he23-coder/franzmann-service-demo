/**
 * Leistungen des Betriebs.
 *
 * Belegt: Bezeichnungen, Leistungsumfang und alle wörtlichen Zitate stammen von den
 * Seiten /waerme/, /badplanung/, /klima/ und /kundendienst/ der bestehenden Website.
 * Erläuternde Fließtexte und die Fragen der Fragebereiche sind für diese Website neu
 * verfasst; sie beschreiben ausschließlich anerkanntes Fachwissen des Gewerks und
 * die belegten Leistungen. Preise, Dauern, Fristen und Garantien werden nicht genannt,
 * weil dazu keine öffentliche Quelle existiert.
 */

/** Das Medium, das der Betrieb im Haus bewegt — bestimmt die Farbführung. */
export type Medium = 'waerme' | 'wasser' | 'luft' | 'service';

/** Lage im Gebäudeschnitt. Grundlage: „von Keller bis zum Dach" (Eigenaussage). */
export type Ebene = 'dach' | 'wohnen' | 'keller' | 'strang';

export interface SubService {
  readonly id: string;
  readonly label: string;
  readonly note: string;
  readonly pictogram: PictogramName;
}

export interface FaqEntry {
  readonly q: string;
  readonly a: string;
}

export type PictogramName =
  | 'waermepumpe' | 'brennwert' | 'pellet' | 'solarthermie' | 'bhkw' | 'brennstoffzelle'
  | 'badewanne' | 'dusche' | 'barrierefrei' | 'gaeste-wc' | 'planung-3d'
  | 'klimasplit' | 'lueftung'
  | 'wartung' | 'reparatur' | 'notdienst' | 'beratung';

export interface Service {
  readonly slug: string;
  readonly name: string;
  readonly navLabel: string;
  readonly medium: Medium;
  readonly ebene: Ebene;
  readonly pictogram: PictogramName;
  /** Kurzform für Karten und den Gebäudeschnitt. */
  readonly teaser: string;
  /** Einleitung der Unterseite. */
  readonly intro: string;
  /** Wörtliches Zitat der bestehenden Website, wenn vorhanden. */
  readonly quote?: string;
  readonly image: { src: string; alt: string };
  readonly subServices: readonly SubService[];
  readonly faq: readonly FaqEntry[];
  readonly steps?: readonly { title: string; text: string }[];
}

export const services = [
  {
    slug: 'waerme',
    name: 'Wärme',
    navLabel: 'Wärme',
    medium: 'waerme',
    ebene: 'keller',
    pictogram: 'brennwert',
    teaser: 'Heizung planen, erneuern und betreuen — von der Wärmepumpe bis zum Pelletkessel.',
    intro:
      'Es gibt kein Patentrezept für das richtige Heizungssystem. Welche Anlage zu einem Haus passt, hängt vom Gebäude ab, vom Dämmzustand, vom Platz im Keller, vom vorhandenen Anschluss und davon, was in zehn Jahren noch wirtschaftlich sein soll. Wir sehen uns das vor Ort an und planen von dort aus.',
    quote: 'Ihr Partner für jeden Anwendungsfall und jede Energieart.',
    image: { src: '/bilder/waerme-heizraum.webp', alt: 'Heizungsanlage im Keller eines Wohnhauses' },
    subServices: [
      { id: 'waermepumpe', label: 'Wärmepumpe', note: 'Luft/Wasser oder Sole, auch als Hybrid', pictogram: 'waermepumpe' },
      { id: 'brennwert', label: 'Gas- oder Ölheizung', note: 'Brennwerttechnik, Austausch oder Neuanlage', pictogram: 'brennwert' },
      { id: 'pellet', label: 'Holz- und Pelletkessel', note: 'Scheitholz, Pellets, mit Pufferspeicher', pictogram: 'pellet' },
      { id: 'solarthermie', label: 'Solaranlage', note: 'Warmwasser und Heizungsunterstützung', pictogram: 'solarthermie' },
      { id: 'bhkw', label: 'Blockheizkraftwerk', note: 'Wärme und Strom im eigenen Haus', pictogram: 'bhkw' },
      { id: 'brennstoffzelle', label: 'Brennstoffzelle', note: 'Beratung zur Eignung des Gebäudes', pictogram: 'brennstoffzelle' },
    ],
    faq: [
      {
        q: 'Welche Heizung passt zu meinem Haus?',
        a: 'Das entscheidet sich an vier Punkten: dem Wärmebedarf des Gebäudes, der benötigten Vorlauftemperatur, dem verfügbaren Platz und dem Energieträger, der am Grundstück liegt. Ein gut gedämmtes Haus mit Flächenheizung ist ein anderer Fall als ein Altbau mit Gussheizkörpern. Wir nehmen die Anlage und das Gebäude vor Ort auf und legen die Möglichkeiten nebeneinander, bevor über Fabrikate gesprochen wird.',
      },
      {
        q: 'Funktioniert eine Wärmepumpe auch im Bestandsgebäude?',
        a: 'Häufig ja — entscheidend ist die Vorlauftemperatur, mit der das Haus im Winter auskommt. Sinkt sie durch größere Heizflächen oder eine bessere Hülle weit genug, arbeitet eine Wärmepumpe wirtschaftlich. Wo das nicht reicht, ist eine Hybridlösung möglich, bei der ein zweiter Wärmeerzeuger die kältesten Tage übernimmt. Das lässt sich vorab rechnerisch prüfen.',
      },
      {
        q: 'Übernehmen Sie auch die Förderanträge?',
        a: 'Die Unterstützung bei Förderanträgen gehört zu unserer Begleitung. Ein Kunde beschreibt in seiner öffentlichen Bewertung genau das: Beratung und Betreuung von der ersten Planung an, „auch bei den Förderanträgen".',
      },
      {
        q: 'Was ist ein Pufferspeicher und brauche ich einen?',
        a: 'Ein Pufferspeicher ist ein Wasserspeicher, der erzeugte Wärme zwischenlagert. Er entkoppelt die Wärmeerzeugung vom Verbrauch und ist überall dort sinnvoll, wo die Wärme nicht dann anfällt, wenn sie gebraucht wird: bei Festbrennstoffkesseln, bei Solarthermie und bei Anlagen, die möglichst lange am Stück laufen sollen statt ständig zu takten.',
      },
      {
        q: 'Können Sie meine bestehende Anlage weiter betreuen?',
        a: 'Ja. Wartung und Instandsetzung von Heizungsanlagen gehören zu unseren Serviceleistungen, auch unabhängig davon, ob wir die Anlage ursprünglich eingebaut haben. Fabrikat und Baujahr nennen Sie am besten gleich bei der Anfrage.',
      },
    ],
  },
  {
    slug: 'bad',
    name: 'Bad',
    navLabel: 'Bad',
    medium: 'wasser',
    ebene: 'wohnen',
    pictogram: 'badewanne',
    teaser: 'Das komplette Bad aus einer Hand — Planung, Koordination und Ausführung.',
    intro:
      'Ein Bad umzubauen heißt, viele Gewerke in der richtigen Reihenfolge durch einen bewohnten Raum zu bringen. Genau das ist die Arbeit: planen, was entstehen soll, und dann dafür sorgen, dass Fliese, Sanitär, Elektro und Licht ineinandergreifen. Sie haben dabei einen Ansprechpartner.',
    quote: 'Ihr komplettes Bad aus einer Hand – vom Experten vor Ort',
    image: { src: '/bilder/bad-armatur.webp', alt: 'Detail einer Waschtischarmatur' },
    subServices: [
      { id: 'komplettbad', label: 'Komplette Badsanierung', note: 'Alle Gewerke, ein Ansprechpartner', pictogram: 'badewanne' },
      { id: 'dusche', label: 'Dusche erneuern', note: 'Auch bodengleich statt Wanne', pictogram: 'dusche' },
      { id: 'barrierefrei', label: 'Barrierefreies Bad', note: 'Schwellenlos und altersgerecht', pictogram: 'barrierefrei' },
      { id: 'gaeste-wc', label: 'Gäste-WC', note: 'Kleiner Raum, vollständige Planung', pictogram: 'gaeste-wc' },
      { id: 'badplanung', label: '3D-Planung', note: 'Das Bad vorab ansehen', pictogram: 'planung-3d' },
    ],
    faq: [
      {
        q: 'Wie läuft eine Badsanierung bei Ihnen ab?',
        a: 'In sieben Schritten, die auf dieser Seite einzeln aufgeführt sind: von der Bedürfnis- und Budgetermittlung über die Produktauswahl und die Präsentation des geplanten Bades bis zum Festpreis-Angebot, dem Ablaufplan und der Ausführung durch eigene Mitarbeiter.',
      },
      {
        q: 'Kann ich mein Bad vorher sehen?',
        a: 'Ja. Anhand der Planung und einer 3D-Visualisierung lässt sich das neue Bad oder Gäste-WC vor der ersten Fliese betrachten — Aufteilung, Materialien, Farben und Licht im Zusammenhang statt als Einzelmuster.',
      },
      {
        q: 'Muss ich verschiedene Handwerker selbst koordinieren?',
        a: 'Nein, das ist ausdrücklich unsere Aufgabe. Auf der bestehenden Unternehmensseite steht es so: Die Koordination der unterschiedlichen Lieferanten und Handwerker ist häufig nicht leicht und benötigt viel Zeit — „diese Arbeit nehmen wir Ihnen gerne ab".',
      },
      {
        q: 'Was bedeutet barrierefrei im Bad konkret?',
        a: 'Vor allem: keine Schwelle in die Dusche, ausreichend Bewegungsfläche vor den Objekten, tragfähige Wände für Stütz- und Haltegriffe und eine Ausstattung, die im Sitzen erreichbar ist. Vieles davon lässt sich bei einer ohnehin anstehenden Sanierung ohne Mehraufwand gleich mit vorbereiten, auch wenn es erst später gebraucht wird.',
      },
      {
        q: 'Kann ich das Bad während der Arbeiten benutzen?',
        a: 'Bei einer Komplettsanierung ist der Raum zeitweise nicht nutzbar — wie lange, hängt vom Umfang ab und steht im Ablaufplan, den Sie vor Beginn erhalten. Wenn ein zweites WC im Haus vorhanden ist oder ein Gäste-WC mitgeplant wird, lässt sich die Reihenfolge oft so legen, dass durchgehend eine Toilette verfügbar bleibt. Das besprechen wir bei der Planung.',
      },
    ],
    steps: [
      { title: 'Bedürfnis- und Budgetermittlung', text: 'Alle Ihre Wünsche und Bedürfnisse sind für unsere Planung unentbehrlich – aus diesem Grund stimmen wir gemeinsam alles genau ab – natürlich auch Ihr einzuhaltendes Budget!' },
      { title: 'Produktauswahl', text: 'Gemeinsam mit Ihnen wählen wir alle Einrichtungsgegenstände, Fliesen, Farben, Materialien sowie das richtige Licht für Ihr individuelles Bad aus!' },
      { title: 'Präsentation Ihres Traumbades', text: 'Wir präsentieren Ihnen Ihr neues Bad und vereinbaren alle Vorbereitungen für die Realisierung.' },
      { title: 'Festpreis-Angebot', text: 'Beim Kaufabschluss wissen Sie was Ihr neues Bad kostet – auf den Euro genau!' },
      { title: 'Ablaufplan', text: 'Sie wissen, wann wir anfangen und wann wir fertig sind.' },
      { title: 'Komplette Badsanierung durch erfahrene Spezialisten', text: 'Alle Schritte der Modernisierung werden durch eigene Mitarbeiter perfekt umgesetzt – natürlich mit Sauberkeitsgarantie für Sie!' },
      { title: 'Übergabe', text: 'Erst wenn Sie zufrieden sind, sind wir es auch.' },
    ],
  },
  {
    slug: 'klima',
    name: 'Klima',
    navLabel: 'Klima',
    medium: 'luft',
    ebene: 'dach',
    pictogram: 'klimasplit',
    teaser: 'Kühlen, heizen, entfeuchten und filtern — für Wohnräume und Gewerbe.',
    intro:
      'Ein angenehmes Raumklima steigert die Lebensqualität – zu Hause ebenso wie im Büro. Moderne Anlagen kühlen nicht nur im Sommer, sie können je nach System auch effizient heizen, die Luft entfeuchten und filtern. Entscheidend sind der Raum, seine Lage im Haus und wo Innen- und Außeneinheit sinnvoll sitzen.',
    quote: 'Angenehmes Raumklima das ganze Jahr',
    image: { src: '/bilder/klima-anlage.webp', alt: 'Klimagerät an einer Innenwand' },
    subServices: [
      { id: 'klima-wohnen', label: 'Klimaanlage für Wohnräume', note: 'Schlafzimmer, Wohnzimmer, Dachgeschoss', pictogram: 'klimasplit' },
      { id: 'klima-gewerbe', label: 'Gewerbliche Räume', note: 'Büro, Praxis, Verkaufsraum', pictogram: 'klimasplit' },
      { id: 'klima-wartung', label: 'Wartung der Klimaanlage', note: 'Filter, Dichtheit, Leistung', pictogram: 'wartung' },
    ],
    faq: [
      {
        q: 'Kann eine Klimaanlage auch heizen?',
        a: 'Ja, viele Split-Geräte arbeiten im Umkehrbetrieb als Luft/Luft-Wärmepumpe und heizen damit in der Übergangszeit sehr effizient. Für einzelne Räume — ein Dachzimmer, ein Büro, einen Anbau — ist das oft die einfachste Lösung, weil kein Wasserkreislauf verlegt werden muss.',
      },
      {
        q: 'Wie laut ist so eine Anlage?',
        a: 'Innengeräte laufen im Normalbetrieb sehr leise; hörbar ist meist eher der Luftstrom als das Gerät. Wichtiger für den Alltag ist die Außeneinheit: Ihr Aufstellort sollte Abstand zum eigenen Schlafzimmerfenster und zur Nachbarbebauung haben. Das legen wir bei der Planung gemeinsam fest.',
      },
      {
        q: 'Was ist bei der Wartung zu beachten?',
        a: 'Regelmäßig zu prüfen sind Filter und Wärmetauscher, der Kondensatablauf und die Dichtheit des Kältekreislaufs. Saubere Filter halten die Leistung oben und den Stromverbrauch unten; ein verstopfter Kondensatablauf ist die häufigste Ursache für Wasserschäden an sonst einwandfreien Anlagen.',
      },
      {
        q: 'Geht das auch nachträglich im Altbau?',
        a: 'In der Regel ja. Zwischen Innen- und Außengerät wird eine Leitung für Kältemittel, Strom und Kondensat geführt — dafür genügt ein Kernbohrung durch die Außenwand. Die Planung besteht vor allem darin, eine Leitungsführung zu finden, die kurz ist und im Wohnraum nicht stört.',
      },
    ],
    steps: [
      { title: 'Persönliche Beratung', text: 'Gemeinsam besprechen wir Ihre Wünsche und die Gegebenheiten vor Ort.' },
      { title: 'Individuelle Planung', text: 'Wir wählen die passende Anlage für Ihre Räume und Ihren Bedarf aus.' },
      { title: 'Fachgerechte Montage', text: 'Unsere erfahrenen Monteure installieren Ihre Klimaanlage sauber, zuverlässig und termingerecht.' },
      { title: 'Einweisung', text: 'Nach der Inbetriebnahme erklären wir Ihnen die Bedienung und geben hilfreiche Tipps für den wirtschaftlichen Betrieb.' },
      { title: 'Wartung und Service', text: 'Auch nach der Installation sind wir Ihr Ansprechpartner für Wartung, Pflege und Reparaturen.' },
    ],
  },
  {
    slug: 'kundendienst',
    name: 'Kundendienst',
    navLabel: 'Kundendienst',
    medium: 'service',
    ebene: 'strang',
    pictogram: 'wartung',
    teaser: 'Wartung, Instandsetzung und Reparaturen an Gas- und Wasseranlagen.',
    intro:
      'Inspektions- und Wartungsarbeiten erhöhen die Betriebs- und Funktionssicherheit haustechnischer Anlagen, verhindern Bauschäden und teure, unplanmässige Reparaturen und verlängern die Nutzungsdauer der Anlagen. Bei Neuanlagen ermöglichen sie die volle Gewährleistungszeit nach VOB.',
    quote: 'Wenn Sie uns brauchen, sind wir da!',
    image: { src: '/bilder/kundendienst-technik.webp', alt: 'Technische Anlage im Heizraum' },
    subServices: [
      { id: 'wartung', label: 'Wartung der Heizungsanlage', note: 'Regelmäßig, mit Protokoll', pictogram: 'wartung' },
      { id: 'instandsetzung', label: 'Instandsetzung', note: 'Anlage läuft nicht wie sie soll', pictogram: 'reparatur' },
      { id: 'gas-wasser', label: 'Reparatur Gas und Wasser', note: 'Leitungen, Armaturen, Anschlüsse', pictogram: 'reparatur' },
      { id: 'stoerung', label: 'Störung — dringend', note: 'Bitte zusätzlich anrufen', pictogram: 'notdienst' },
    ],
    faq: [
      {
        q: 'Meine Heizung ist ausgefallen — was tun?',
        a: 'Bei einem Ausfall rufen Sie bitte direkt an, statt das Formular zu nutzen: (06201) 9033-0. In dringenden Fällen nennt das Unternehmen dieselbe Rufnummer als Notdienst. Ein Formular wird zu Bürozeiten gelesen — ein Anruf erreicht uns schneller.',
      },
      {
        q: 'Wie oft sollte eine Heizung gewartet werden?',
        a: 'Üblich ist einmal jährlich, in der Regel vor der Heizperiode. Viele Hersteller knüpfen ihre Garantiezusagen an den Nachweis regelmäßiger Wartung, und bei Neuanlagen ist sie Voraussetzung für die volle Gewährleistungszeit nach VOB.',
      },
      {
        q: 'Lohnt sich Wartung für Vermieter?',
        a: 'Die bestehende Unternehmensseite beantwortet das so: Funktion und Nutzen der Anlage werden optimiert, Verträge werden eingehalten, woraus die volle Gewährleistungsfrist resultiert, der Wert der Anlage bleibt erhalten und der Versicherungsschutz gesichert.',
      },
      {
        q: 'Betreuen Sie auch Anlagen, die Sie nicht eingebaut haben?',
        a: 'Ja. Damit wir gleich das passende Material mitbringen, helfen uns bei der Anfrage Fabrikat, Typ und ungefähres Baujahr der Anlage — meist stehen sie auf dem Typenschild am Gerät oder im Wartungsheft.',
      },
    ],
  },
] as const satisfies readonly Service[];

export type ServiceSlug = (typeof services)[number]['slug'];

export const serviceBySlug = (slug: string) =>
  services.find((s) => s.slug === slug);

/** Alle Unterleistungen mit ihrem Bereich — Grundlage des Termin-Assistenten. */
export const allSubServices = services.flatMap((s) =>
  s.subServices.map((sub) => ({ ...sub, serviceSlug: s.slug, serviceName: s.name, medium: s.medium })),
);
