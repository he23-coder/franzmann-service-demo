# Die neue Website im Vergleich zur bisherigen

Stand: 27.08.2026 · Alle Belege in `docs/source-audit.md`.

---

## 1 · Die bisherige Website — was gefunden wurde

WordPress mit Enfold-Theme, acht Seiten, letzte inhaltliche Ergänzung eine
Klima-Seite. Die wichtigsten Befunde:

**Rechtlich**
- **Kein eigenständiges Impressum.** Der Footer-Link führt auf `/kontakt/`;
  eine eigene URL existiert nicht. §5 DDG verlangt leichte Erkennbarkeit und
  unmittelbare Erreichbarkeit.
- Die Datenschutzerklärung liegt ebenfalls nur als Abschnitt auf der Kontaktseite.
- **Die Website widerspricht sich bei der eigenen Adresse:** Footer
  „Sulzbacher Straße 31", Impressum „Münzgasse 5". Der Betrieb hat am
  28.08.2026 bestätigt: **Sulzbacher Straße 31** ist richtig. Handelsregister,
  Impressum, Datenschutzerklärung und sämtliche Verzeichnisse führen weiterhin
  die alte Anschrift — das gehört nachgezogen.

**Vertrauen und Konversion**
- Keine einzige Kundenstimme, obwohl eine belegbare Bewertung öffentlich vorliegt.
- Keine Karte, keine Anfahrt, kein Routing-Link.
- Kein Terminsystem. Das Kontaktformular verlangt als Spamschutz eine
  **Rechenaufgabe** („4 + 4 = ?").
- Der Notdienst steht klein auf der Kontaktseite und ist von der Startseite
  aus nicht erreichbar.
- Telefonnummern sind **nicht** als `tel:`-Links ausgezeichnet — auf dem
  Smartphone nicht antippbar.

**Inhalt**
- Keine Unterseiten je Leistung, keine Fragen und Antworten, keine klaren
  Handlungsaufforderungen.
- `/waerme/` und `/klima/` tragen dieselbe Überschrift („… Heizungsprogramm
  kennen") — ein Copy-Paste-Fehler auf der Klimaseite.
- Mehrere Seiten haben zwei `<h1>`.
- Tippfehler auf der Startseite: „Wir bietet Ihnen", „inovativen".
- `/referenzen/` kündigt eine „digitale 3D-Ansicht" an und besteht aus drei
  Überschriften ohne Inhalt.

**Technik**
- Titelbilder bis 150 kB, im Medienbestand Fotos bis 2,7 MB, keine modernen Formate.
- Kein strukturiertes Datenmarkup, generische Seitentitel, Titelbilder ohne Alt-Text.
- Footer wirbt an prominenter Stelle für den Theme-Anbieter.

---

## 2 · Was die neue Website besser macht

| Bereich | Vorher | Jetzt |
|---|---|---|
| Impressum | nur Abschnitt auf `/kontakt/` | eigene Seite `/impressum` |
| Datenschutz | nur Abschnitt auf `/kontakt/` | eigene Seite `/datenschutz`, auf die tatsächliche Verarbeitung zugeschnitten |
| Adresse | zwei widersprüchliche Angaben | eine Angabe (Sulzbacher Straße 31), zentral in `src/data/business.ts` |
| Termin | Formular mit Rechenaufgabe | Assistent in drei Schritten mit Datum und Uhrzeit |
| Leistungen | vier Seiten ohne Struktur | vier Unterseiten mit Umfang, Ablauf, Fragen und eigenem Assistenten |
| Notdienst | klein auf der Kontaktseite | eigener Streifen direkt unter dem Einstieg |
| Telefon | reiner Text | `tel:`-Links überall, plus Schnellzugriff |
| Bewertungen | keine | belegte Stimme mit Quelle, Datum und Link; dazu zwei Wege zum bestätigten Google-Profil |
| Karte | keine | statische Karte, beim Bauen erzeugt, mit Routing |
| Struktur | zwei `<h1>` je Seite | genau ein `<h1>`, geprüfte Gliederung |
| Bilder | JPEG bis 2,7 MB | WebP, zwei Größen, `loading="lazy"` |
| Strukturdaten | keine | `HVACBusiness` mit Öffnungszeiten, Geo, Leistungen; `FAQPage` je Leistung |
| Fremdverbindungen | Google Fonts über CDN | keine — Schriften und Karte liegen lokal |

---

## 3 · Erhaltene Identität

- **Wortmarke unverändert** übernommen (`franzmann_logo_web.png`).
- **Farben am Original gemessen:** Navy `#344d6d` und Azur `#017bbf` aus der
  Wortmarke; Sandstein `#ae9485`/`#675352`, Fensterläden-Navy `#546883` und
  Pflastergrau `#84807a` aus einer Gebäudeaufnahme des Betriebs. Bemerkenswert:
  das Navy der Fensterläden ist praktisch identisch mit dem Navy der Wortmarke.
- **Der Mittelpunkt als Trenner** vom alten Firmenschild („Sanitär · Heizung ·
  Solar") ist als typografisches Detail durchgängig übernommen.
- **Eigene Sätze des Betriebs** stehen wörtlich auf der Seite: „von Keller bis
  zum Dach", „Erst wenn Sie zufrieden sind, sind wir es auch!", „Wenn Sie uns
  brauchen, sind wir da!", die sieben Schritte zum Traumbad und die fünf
  Schritte zum guten Klima.
- **Alle zwölf Teammitglieder** mit den Namen und Rollen der bisherigen Seite.
- **Ansprache „Sie"**, sachlich-warm, ohne Superlative — wie bisher.

---

## 4 · Die drei geprüften Richtungen

**A · „Der Gebäudeschnitt"** — Die Seite ist als Arbeitszeichnung der
Haustechnik angelegt. Ein Haus im Schnitt trägt die Leistungen dort, wo sie
tatsächlich sitzen: Wärme in den Keller, Bad ins Wohngeschoss, Klima und
Solar aufs Dach, Kundendienst an den Steigstrang. Helles Planpapier, dünne
Linien, Maße in Monospace.

**B · „Wasser · Wärme · Luft"** — Aufbau entlang der drei Medien, die der
Betrieb durch ein Haus bewegt; jedes Medium mit eigener Temperatur und
Farbwelt, ein Regler färbt die Seite um.
*Verworfen:* zu abstrakt. Ein Kunde sucht „neues Bad", nicht „Medium Wasser",
und die Metapher hätte über der Nutzbarkeit gestanden.

**C · „Altstadt-Handwerk"** — Materialgeführt und editorial: Sandstein,
Fachwerk, Kopfsteinpflaster, hundert Jahre Handwerk.
*Verworfen:* Der Betrieb verkauft Wärmepumpen, Brennstoffzellen und
Klimatechnik. Eine Gestaltung, die vor allem Alter erzählt, hätte gegen das
Angebot gearbeitet — und für eine echte Zeitleiste fehlen belegte Jahreszahlen.

**Gewählt: A**, weil die Leitidee aus einem Satz des Betriebs selbst stammt
(„Wir decken das gesamte Spektrum von Keller bis zum Dach ab"), weil der
Schnitt die Arbeitszeichnung genau dieses Gewerks ist und weil er die
Leistungen nach dem Ort im Haus sortiert — für Besucher die natürlichste
Frage überhaupt. Das Material von C ist als Farbwelt eingeflossen, die
Medien-Codierung von B als Farbe je Leistungsbereich.

---

## 5 · Gestaltung

**Leitidee.** Planpapier statt Marketingfläche. Ein feines Raster im
Hintergrund, doppelte Blattkante um die Zeichnung, ein Schriftfeld am unteren
Rand, Maßketten am linken Zeichnungsrand, geschnittene Wände schraffiert —
so, wie es in einer Haustechnik-Zeichnung Konvention ist.

**Aufteilung.** Kein Hero mit Text links und Foto rechts. Der Einstieg ist ein
Zeichnungsblatt: Titelblock links, Schnitt rechts, die vier Ebenen als Legende
darunter. Danach ein schmaler Störungsstreifen, das Betriebsgebäude als
Ankerbild, der Ablauf als vierteilige Kette, das Team als Bildreihe, die
Stimmen als Protokoll, der Assistent, zuletzt der Standort.

**Typografie.** *Familjen Grotesk* für Überschriften — geometrisch, mit
eigenem Charakter, nahe an der weichen Groteske der Wortmarke.
*Hanken Grotesk* für Fließtext. *Spline Sans Mono* ausschließlich für
Maßangaben, Positionsnummern und Beschriftungen — also dort, wo eine
Zeichnung Monospace verwendet. Bewusst nicht Inter, Roboto oder Poppins;
und bewusst andere Familien als die zuletzt gebauten Demos.

**Iconografie.** 17 selbst gezeichnete Piktogramme auf 24er-Raster mit
einheitlicher Strichstärke: Wärmepumpe mit Ventilator und Luftstrom,
Brennwertgerät mit Flamme und Anschlüssen, Pelletkessel mit Zufuhr,
Kollektor mit Sonne, Blockheizkraftwerk, Brennstoffzellenstapel, Badewanne,
bodengleiche Dusche, Haltegriff, Split-Klimagerät, gekreuzte Werkzeuge.
Keine Icon-Bibliothek.

**Bewegung.** Vor- und Rücklauf fließen als gestrichelte Linien durch den
Steigstrang — die einzige Dauerbewegung der Seite und zugleich eine Erklärung.
Abschnitte treten leicht versetzt auf, Legendeneinträge wandern beim Zeigen
seitlich, die Zeichnung färbt die passende Ebene ein. Bei
`prefers-reduced-motion` steht alles still und ist sofort sichtbar; ohne
JavaScript ebenfalls (`<noscript>`-Rückfall).

**Signature Moment.** Der interaktive Gebäudeschnitt. Er ist kein Schmuck: er
beantwortet die Frage „macht ihr das, was ich brauche?" räumlich, er
ordnet die vier Leistungen, er ist die Navigation, und er zeigt mit dem
fließenden Steigstrang, was dieser Betrieb eigentlich tut. Auf dem Telefon
bleibt er erhalten und wird von der Legende als Liste begleitet — dieselben
Ziele, ohne Zeichnung bedienbar.

---

## 6 · Abgrenzung zu den zuletzt gebauten Demos

Geprüft gegen `weigner-shk-ludwigshafen-demo` (dasselbe Gewerk!) und
`kfz-meisterwerkstatt-ludwig-demo`.

| | Weigner SHK | Ludwig KFZ | Franzmann |
|---|---|---|---|
| Einstieg | dunkelblaue Fläche, Text links, Foto rechts angeschnitten | Seitenkopf mit Bild | helles Planblatt, Titelblock + interaktive Zeichnung |
| Grundton | Dunkelblau mit Orange | — | warmes Planpapier, Navy, Azur, Sandstein |
| Schriften | Geist + Geist Mono | Archivo | Familjen Grotesk + Hanken Grotesk + Spline Sans Mono |
| Symbole | Phosphor | Lucide | 17 eigene Zeichnungen |
| CSS | Tailwind | eigenes CSS | eigenes CSS mit eigenem Wertesatz |
| Aufbau | Hero → TrustBar → Services → Fokus → Prozess → Über uns → Buchung | Seiten je Leistung | Zeichnungsblatt → Störung → Betrieb → Ablauf → Team → Stimmen → Assistent → Standort |
| Assistent | Buchung mit Zeitfenstern | sechs Schritte | drei Schritte, Vorauswahl je Leistungsseite |
| Bewertungen | Kartenreihe | eigener Abschnitt | Abnahmeprotokoll mit Prüfzeilen und Skala statt Sternen |

Konkret vermieden: dieselbe Schrift, dieselben Symbole, dieselbe Farbrolle
(dunkle Markenfläche + warmer Akzent), dieselbe Abschnittsfolge, dasselbe
Karussell-Aussehen, derselbe Signature Moment.

---

## 7 · Mobil

- **Feste Kopfzeile in zwei Zeilen** wie ein Schriftfeld: oben Marke, Anruf
  und Terminschaltfläche, darunter die sechs Bereiche als waagerecht
  scrollbare Reiter. **Kein Burger-Menü** — alle Ziele bleiben sichtbar.
- Im Querformat werden beide Zeilen niedriger (`max-height`-Abfrage).
- **Kein CTA-Balken über die volle Breite.** Stattdessen eine runde,
  schwebende Schaltfläche unten rechts, die vier Wege aufklappt: Anrufen,
  Termin, E-Mail, Route. Sie ist 56 px groß, respektiert
  `env(safe-area-inset-bottom)` und schließt mit Escape oder Tippen daneben.
  Der Footer hält rechts Platz frei, damit sie nichts verdeckt.
- `scroll-padding-top` entspricht der Höhe der festen Navigation — Sprungziele
  landen nie darunter. Geprüft: nach „Termin anfragen" auf einer Leistungsseite
  steht die Überschrift des Assistenten unterhalb der Leiste.
- Das Team ist auf dem Telefon eine wischbare Bildreihe statt eines gestauchten
  Rasters; die Leistungsliste im Assistenten wird einspaltig mit 64 px hohen
  Zeilen.
- Geprüft bei 320, 360, 390, 430, 768, 1024, 1440 px und im Querformat
  844 × 390 — kein waagerechtes Überlaufen.

---

## 8 · Konversion

Der kürzeste Weg ist überall sichtbar: In der Kopfzeile stehen Rufnummer und
„Termin anfragen", der Störungsstreifen fängt den dringendsten Fall direkt
nach dem Einstieg ab, und die schwebende Schaltfläche hält beide Wege auf dem
Telefon in Daumenreichweite.

Der Assistent hat **drei** Schritte: Leistung, Wunschtermin, Kontakt und Prüfen.
Ein vierter Schritt nur zur Anzeige der Zusammenfassung entfällt — die
Zusammenfassung steht neben den Feldern und aktualisiert sich beim Tippen.

**Kontext bleibt erhalten.** Wer auf einer Leistungsseite „Termin anfragen"
wählt, landet im Assistenten **auf derselben Seite**, mit Bereich und Leistung
bereits gesetzt. Ab Schritt 2 zeigt eine schmale Leiste durchgehend Bereich,
Leistung und Kurzbeschreibung mit einer Schaltfläche „Ändern".

**Preise und Dauern werden nicht angezeigt, weil es keine gibt.** Zu keiner
Leistung ist ein Preis oder eine Dauer öffentlich belegt. Statt Zahlen zu
erfinden, führt der Assistent zu einer unverbindlichen Anfrage — und sagt
ausdrücklich, dass der Termin erst mit der Bestätigung gilt.

**Uhrzeit statt Zeitfenster.** Datum und Uhrzeit werden minutengenau gewählt
(`type="date"` und `type="time"`), zusätzlich ist ein Ausweichtermin möglich.
Wochenenden und Zeiten außerhalb 07:30–16:00 werden mit Begründung abgelehnt.

**„Weiter" graut nie aus.** Eine Schaltfläche, die ohne Erklärung inaktiv
wird, lässt Ratlose zurück. Beim Klick steht stattdessen da, was fehlt, und
der Fokus springt auf das betreffende Feld.

---

## 9 · Vertrauen

- **Die gezeigte Bewertung ist echt und nachprüfbar.** Text wörtlich und
  ungekürzt, Autor („Gast"), Datum (22.01.2024), Plattform (11880.com) und ein
  Link auf die Quelle. Beleg: das `schema.org`-`Review` im Quelltext der
  Profilseite.
- **Der Aufruf zur Bewertung** zeigt auf das Bewertungsformular derselben
  Plattform — dieselbe Quelle, die auch die gezeigte Stimme trägt.
- **Das Google-Profil ist bestätigt** — der Betrieb hat den Teilen-Link genannt,
  er löst auf die Kennung `/g/1tg9m25r` auf. Zwei Schaltflächen führen dorthin:
  „Bewertungen bei Google lesen" und „Auf Google bewerten".
- **Aber keine Google-Bewertungen auf der Seite.** Deren Texte ließen sich nicht
  auslesen: Google liefert ohne Browser nur eine Weiterleitungsseite, und der
  Textabruf endet in einer Sicherheitsabfrage (Belege in `docs/source-audit.md`,
  Abschnitt 1B). Es steht deshalb **keine Google-Note**, **keine Anzahl** und
  **keine nacherzählte Bewertung** auf der Website. Ein Link auf das
  Bewertungsformular verlangt eine Place ID, die sich nicht ermitteln ließ — er
  wurde nicht konstruiert; die Beschriftung verspricht nur, was sie hält.
- **Drei Bewertungen eines Branchenportals wurden bewusst verworfen.** Zwei
  davon tragen Zeitstempel im Abstand von 14 Sekunden, der Text nennt das
  Portal selbst und liest sich wie eine Vorlage; die dort hinterlegte
  E-Mail-Adresse weicht von der offiziellen ab. Sie wirken maschinell erzeugt.
- **Der Betrieb wird gezeigt, nicht behauptet:** das eigene Gebäude, die
  zwölf Personen mit Namen und Rolle, die Anschrift auf der Karte.
- **Keine erfundenen Zahlen.** „über 100 Jahre" und „über 1000 Bäder" stehen
  als Angaben des Betriebs gekennzeichnet, weil sie von seiner eigenen Seite
  stammen. Andere Kennzahlen gibt es nicht.
- **Keine vorgetäuschte Übermittlung.** Ohne hinterlegten Versandweg antwortet
  die Schnittstelle mit 503 und die Oberfläche bietet Anruf und eine bereits
  vollständig ausgefüllte E-Mail an.

---

## 10 · Was geprüft wurde

**195 Playwright-Prüfungen, 0 Fehler, 39 übersprungen** (Prüfungen, die nur
in einer Größe sinnvoll sind), verteilt auf drei Geräteklassen:
Telefon 390 × 844, Tablet 834 × 1112, Rechner 1440 × 900.

| Datei | Inhalt |
|---|---|
| `01-carga-y-cabeceras` | zehn Seiten mit Status 200, `X-Robots-Tag`, `nosniff`, `Referrer-Policy`, CSP; genau ein `<h1>`; 404; API lehnt GET ab und meldet nie Erfolg; keine Fremdverbindungen; keine Konsolenfehler |
| `02-responsive-overflow` | 320 / 360 / 390 / 430 / 768 / 1024 / 1440 px und Querformat 844 × 390 auf fünf Seiten |
| `03-carrusel` | die sechzehn geforderten Punkte: Laden, Selbstlauf, Vor, Zurück, Punkte, Wiederanlauf nach Pfeil, nach Punkt, nach Zeigen, Pause hält, Play läuft weiter, Höhe folgt der Folie, kein Überlauf, Tastatur, gültige Quell-Links, geprüfter Bewertungs-Link, `prefers-reduced-motion`; dazu ARIA, der Verweis auf das Google-Profil und die Zusicherung, dass keine ungelesene Google-Note behauptet wird |
| `04-termin-assistent` | genau drei Schritte, kein vierter Prüfschritt, vollständiger Durchlauf, lebende Zusammenfassung, Fokus auf das fehlerhafte Feld, Wochenende und Uhrzeit außerhalb der Bürozeiten, kein Schein-Erfolg, Kontexterhalt mit „Ändern", Vorauswahl aus allen vier Leistungsseiten |
| `05-navegacion-y-ux` | feste Leiste, kein Burger, sechs sichtbare Ziele, kein CTA unter der Leiste, schwebende Schaltfläche schmal und mit Escape schließbar, Trefferflächen ≥ 44 px, alle Kopfzeilen-Links, kein toter interner Link, Zeichnung führt zu jeder Leistung, gleiche Anschrift auf allen Seiten, Route mit vollständiger Adresse, kein Projektvokabular auf zehn Seiten, keine Schein-Bedienelemente, `tel:`-Links |
| `06-accesibilidad` | Kontrast AA mit Alpha-Überlagerung auf vier Seiten, Landmarks, Überschriftenfolge ohne Sprung, `lang`, Sprunglink, sichtbarer Fokus, Alt-Texte, Formularbeschriftungen, Bewertung nicht nur über Farbe, reduzierte Bewegung, **Darstellung ohne JavaScript** |

**Nachweis, dass die Prüfungen greifen.** Zwei Fehler wurden absichtlich
eingebaut: (1) der Pfeil im Karussell hielt den Selbstlauf dauerhaft an,
(2) `X-Robots-Tag` wurde aus den Antworten entfernt. Ergebnis: **drei
Prüfungen schlugen fehl** — genau die zuständigen (Karussell 6 und 7,
Kopfzeilen-Prüfung). Beide Eingriffe wurden zurückgenommen; danach war
wieder alles grün.

**Was die Prüfungen gefunden haben** (und was daraufhin geändert wurde):
1. Astro bettete kleine Skripte in die Seite ein und Vite kodierte Schriften
   als `data:`-URI — beides verstieß gegen die CSP. Statt die CSP zu lockern,
   wurden die Skripte in eigene Module ausgelagert und das Einbetten abgeschaltet.
2. `Weiter` graute im Assistenten ohne Erklärung aus, sobald ein Samstag
   gewählt war. Jetzt bleibt die Schaltfläche bedienbar und nennt den Grund.
3. Der Hinweis „Bitte wählen Sie eine Leistung" stand innerhalb des noch
   verborgenen Leistungsblocks und war dadurch unsichtbar.
4. `--ink-3` erreichte nur 3,99:1 statt 4,5:1. Der Ton wurde auf `#556270`
   abgedunkelt (≥ 4,78:1 auf allen Flächen).
5. Ohne JavaScript blieben die Auftritts-Abschnitte unsichtbar. Ein
   `<noscript>`-Block zeigt jetzt alles sofort.

**Veröffentlichung**

Der Bau läuft in GitHub Actions durch (`npm ci`, `npm run build`); der Schritt
`wrangler deploy` bricht ab, weil im Repository die beiden Secrets
`CLOUDFLARE_API_TOKEN` und `CLOUDFLARE_ACCOUNT_ID` fehlen:

> In a non-interactive environment, it's necessary to set a
> CLOUDFLARE_API_TOKEN environment variable for wrangler to work.

Diese Secrets setzt sonst `he23-coder/demo-factory`. Deren beide Abläufe
(`create-demo` und `run-deploy`) scheitern jedoch seit dem 20.08.2026
durchgängig nach zwei bis vier Sekunden, ohne einen einzigen Schritt zu
protokollieren; die Protokolle sind nicht abrufbar (HTTP 404). Betroffen sind
auch fremde Anfragen aus dieser Zeit. Zwei Versuche für diese Demo
(Vorgang 33128491382, Anläufe 1 und 2) verhielten sich identisch. Im
Repository dieser Website laufen Actions dagegen einwandfrei — die Ursache
liegt also in der Fabrik, nicht hier.

**Es gibt deshalb keine öffentliche Adresse, die geprüft werden könnte.**
Sobald die beiden Secrets im Repository liegen, genügt ein Lauf von
`deploy.yml`; alles Übrige ist vorbereitet.

**Nicht geprüft / nicht möglich**
- **Kein Zugriff auf Google.** `google.com` und `google.com/maps` liefern in
  dieser Umgebung nur die JavaScript-Weiterleitung; ein echter Browser
  (Chromium) erreicht **keinen** externen Host — `net::ERR_CONNECTION_RESET`,
  reproduzierbar auch gegen `example.com`. Deshalb konnten Google-Profil,
  Place ID, Bewertungen und der Link zum Bewertungsformular nicht verifiziert
  und folglich nicht verwendet werden.
- **Keine Prüfung an einer öffentlichen Adresse**, da die Veröffentlichung
  aus dem oben genannten Grund nicht stattgefunden hat. Alle Angaben zu
  Kopfzeilen, Weiterleitungen und Verhalten stammen aus dem gebauten Stand,
  ausgeliefert mit denselben Kopfzeilen wie im Worker (`scripts/static-server.mjs`).
- Kein Lighthouse-Lauf und keine echten Gerätemessungen; Aussagen zur
  Geschwindigkeit stützen sich auf die gebauten Dateigrößen.
- Der Mailversand ist nicht angeschlossen und wurde daher nicht durchlaufen —
  geprüft wurde ausdrücklich, dass die Oberfläche keinen Erfolg vortäuscht.

---

## 11 · Neu hinzugefügt

1. `/impressum` und `/datenschutz` als eigene Seiten.
2. Vier Leistungs-Unterseiten mit Umfang, Ablauf und je vier bis fünf Fragen.
3. Termin-Assistent, auf jeder Leistungsseite eingebettet.
4. Störungsstreifen mit dem Notdienst direkt unter dem Einstieg.
5. Bewertungsteil mit Quelle und Aufruf zur Bewertung.
6. Standortteil mit statischer Karte und Routing.
7. Teamseite mit allen zwölf Personen nach Aufgaben gruppiert.
8. Der Gebäudeschnitt als Navigation.
9. Schnellzugriff für Anruf, Termin, E-Mail und Route.
10. 404-Seite mit Wegen zurück.
11. `/api/termin` samt serverseitiger Prüfung.

Alle Texte dieser Abschnitte sind neu verfasst; sie beschreiben ausschließlich
belegte Leistungen und anerkanntes Fachwissen des Gewerks.

---

## 12 · Nächste Schritte

1. **Alte Anschrift überall nachziehen** (großer Nutzen, kleiner Aufwand).
   Handelsregister, Impressum der alten Website, Gelbe Seiten, 11880, golocal,
   sanitaer.org, wasserwaermeluft.de und der OpenStreetMap-Eintrag
   „Franzmann Bad & Heizung" führen noch die Münzgasse. Solange das so bleibt,
   schicken Kartendienste Kunden an die falsche Adresse und die lokale
   Sichtbarkeit leidet.
2. **Google-Bewertungen übernehmen** (großer Nutzen, kleiner Aufwand).
   Das Profil ist verlinkt, die Texte fehlen noch. Autor, Datum, Wortlaut und
   Link je Bewertung in `src/data/reviews.ts` eintragen — ab der zweiten Stimme
   schaltet sich das Karussell samt Bedienelementen von selbst frei, und die
   Gesamtnote wandert in die strukturierten Daten.
3. **Mailversand anschließen** (großer Nutzen, kleiner Aufwand).
   Drei Secrets hinterlegen — `RESEND_API_KEY`, `ANFRAGE_EMPFAENGER`,
   `ANFRAGE_ABSENDER`. Die Oberfläche bleibt unverändert.
4. **Eigene Projektfotos, dazu ein Bild des Standorts** (großer Nutzen,
   mittlerer Aufwand). Die Badfotos im Bestand wirken wie Katalogware. Fünf bis
   zehn eigene Aufnahmen fertiger Bäder und Heizungsanlagen — gern mit
   Vorher/Nachher — würden die Referenzen tragen, die die bisherige Seite nur
   ankündigt. Und ein Foto des Gebäudes in der Sulzbacher Straße: das vorhandene
   Gebäudebild zeigt einen anderen Standort und wurde deshalb nicht verwendet.
5. **Preisanker für die Badsanierung** (mittlerer Nutzen, mittlerer Aufwand).
   „Ab welchem Betrag?" ist die häufigste unausgesprochene Frage. Schon eine
   belastbare Spanne je Badgröße würde die Anfragen deutlich qualifizieren —
   dafür braucht es allerdings eine Freigabe des Betriebs, keine Schätzung.
