# Quellen-Audit — Hermann Franzmann GmbH

**Recherchedatum: 27.08.2026.** Alle Angaben unten wurden aus öffentlich zugänglichen
Quellen erhoben und mit Quellenangabe dokumentiert. Nicht belegbare Angaben sind
ausdrücklich als solche markiert und wurden **nicht** auf der Website verwendet.

---

## 1A — Geschäftsdaten

### Identität

| Feld | Wert | Quelle | Status |
|---|---|---|---|
| Firmierung | Hermann Franzmann GmbH | Website-Impressum, Handelsregister | ✅ belegt |
| Marke / Wortmarke | „Franzmann — Bad und Heizung" | Logo `franzmann_logo_web.png` | ✅ belegt |
| Beschilderung am Gebäude | „Franzmann — Sanitär · Heizung · Solar" | Foto `k-Franzmann-2.jpg` (eigene Website) | ✅ belegt |
| Positionierung | „Ihr Bad- und Heizungsspezialist in Weinheim und Umgebung" | Startseite, Titelbild | ✅ belegt |
| Handelsregister | HRB 431021, Amtsgericht Mannheim | Impressum + Northdata | ✅ belegt |
| EUID | DEB8535.HRB431021 | Northdata | ✅ belegt |
| Eintragung | 22.11.2005 | Northdata | ✅ belegt |
| Geschäftsführer | Dipl.-Ing. (FH) Jens Thron (seit 14.01.2021) | Impressum + Northdata | ✅ belegt |
| Steuer-Nr. | 47020/09270 | Website-Impressum | ✅ belegt |
| Aufsichtsbehörde | Handwerkskammer Mannheim | Website-Impressum | ✅ belegt |
| Unternehmensgegenstand | „Die Ausführung von jeglichen Installations- und Spenglerarbeiten, sowie der Handel mit allen einschlägigen Geräten und Waren" | Northdata (Registereintrag) | ✅ belegt |

**Nicht übernommen:** Northdata nennt einen weiteren, zum 05.03.2026 ausgeschiedenen
Geschäftsführer. Da diese Person auf der Unternehmenswebsite als *Projektleiter (Meister)*
geführt wird und die Registerdaten hierzu nicht eindeutig sind, wird auf der neuen Website
ausschließlich die vom Unternehmen selbst veröffentlichte Rollenbezeichnung verwendet.

### Kontakt

| Feld | Wert | Quelle |
|---|---|---|
| Telefon | (06201) 9033-0 | Website (Start, Kontakt, Impressum), alle Verzeichnisse |
| Notdienst | 06201 / 9033-0 (identisch mit Zentrale) | Website /kontakt/ |
| Fax | (06201) 9033-15 | Website, Verzeichnisse |
| E-Mail | mail@franzmann-service.de | Website |
| Bürozeiten | Mo–Fr 7:30 – 16:00 | Website (Footer + Kontakt) |

**Widerspruch bei den Öffnungszeiten:** Gelbe Seiten führt „Mo–Fr 07:30–17:00".
Die Website des Unternehmens nennt **7:30–16:00**. Verwendet wurde die Angabe des
Unternehmens selbst (Website).

### Adress-Widerspruch der bestehenden Website — vom Betrieb geklärt

**Ergebnis: Sulzbacher Straße 31, 69469 Weinheim.** Der Betrieb hat dies am
28.08.2026 auf Nachfrage bestätigt. Die neue Website verwendet diese Anschrift
durchgängig; sie steht an einer Stelle in `src/data/business.ts`.

Die bestehende Website nennt **zwei verschiedene Adressen**:

| Adresse | Fundstelle | Weitere Belege |
|---|---|---|
| **Münzgasse 5, 69469 Weinheim** | **Impressum** (`/kontakt/`) | Handelsregister/Northdata, Gelbe Seiten, 11880, golocal, sanitaer.org, wasserwaermeluft.de, SHK.de-Visitenkarte, cylex, **OpenStreetMap-POI „Franzmann Bad & Heizung"** |
| Sulzbacher Straße 31, 69469 Weinheim | Footer der Startseite | Trustlocal, handwerksradar (beide vermutlich vom Website-Footer übernommen) |

**Offene Punkte, die daraus folgen — für den Betrieb zur Kenntnis:**

1. **Das Handelsregister führt weiterhin Münzgasse 5** (Northdata, Stand 27.08.2026),
   ebenso das Impressum und die Datenschutzerklärung der bestehenden Website sowie
   sämtliche Fachverzeichnisse. Nach einem Umzug ist die Registeranschrift
   anzupassen; für das Impressum ist die ladungsfähige Anschrift maßgeblich.
2. **OpenStreetMap verzeichnet einen POI „Franzmann Bad & Heizung" an der
   Münzgasse 5.** Solange dieser Eintrag steht, führen Kartendienste Kunden dorthin.
3. **Das Betriebsfoto auf der bestehenden Website** (`k-Franzmann-2.jpg`) zeigt ein
   historisches Sandsteingebäude in einer Kopfsteinpflastergasse — das ist nicht die
   Sulzbacher Straße. Es wurde deshalb **nicht** als Standortbild übernommen.
   An seiner Stelle steht eine Aufnahme einer frisch montierten Solaranlage aus dem
   eigenen Medienbestand. Für die Anfahrt wäre ein aktuelles Foto des Gebäudes
   in der Sulzbacher Straße hilfreich.

Die drei Punkte zusammen sind eine klassische NAP-Inkonsistenz und kosten
unmittelbar lokale Sichtbarkeit.

**Geokoordinaten:** 49.5664859 / 8.6626365 — Sulzbacher Straße laut OpenStreetMap
(Nominatim). Für diese Straße sind dort **keine Hausnummern** erfasst; die Koordinate
liegt daher auf dem Straßenzug, nicht metergenau auf dem Grundstück. Deshalb führt
die Schaltfläche „Route berechnen" mit der **vollständigen Anschrift als Text** in
den Kartendienst des Besuchers statt mit einer Koordinate — so trifft die Hausnummer.

### Leistungen (alle von der bestehenden Website belegt)

- **Wärme** (`/waerme/`): Gas- und Ölheizung, Solaranlagen, Holz- und Pelletskessel,
  Blockheizkraftwerke, Wärmepumpen, Brennstoffzelle. Eigenzitat: *„Wir sind Ihr Partner
  für Gas- und Ölheizungen mit Solaranlagen, Holz- und Pelletskessel, Blockheizkraftwerke
  und Wärmepumpen."*
- **Bad** (`/badplanung/`): Komplettbadsanierung, Neubau, Modernisierung, barrierefreies
  Bad, Gäste-WC, 3D-Planung. Siebenstufiger Ablauf „Der Weg zu Ihrem Traumbad" ist auf
  der Seite ausformuliert. Eigenzitat: *„Über 1000 Bäder haben wir bereits realisiert!"*,
  *„Festpreis mit Termingarantie"*, *„Sauberkeitsgarantie"*.
- **Klima** (`/klima/`): Klimaanlagen für Wohnräume, Dachgeschoss, Schlafzimmer und
  gewerbliche Räume; Heizen, Entfeuchten, Filtern; fünfstufiger Ablauf „Der Weg zu
  guten Klima" auf der Seite ausformuliert.
- **Kundendienst** (`/kundendienst/`): Wartung und Instandsetzung von Heizungsanlagen,
  Reparaturen an Gas- und Wasseranlagen. Eigenzitat: *„Wenn Sie uns brauchen, sind wir da!"*

**Preise und Leistungsdauern:** Auf keiner öffentlichen Quelle veröffentlicht.
→ **Es werden keine Preise und keine Dauern erfunden.** Der Termin-Assistent arbeitet
deshalb bewusst ohne Preis-/Dauerangaben und führt zu einer unverbindlichen Anfrage.

**Weitere Eigenaussagen (belegt, wörtlich von der Website):**
„mehr als 100 Jahren Erfahrung" · „Erst wenn Sie zufrieden sind, sind wir es auch!" ·
„Wir decken das gesamte Spektrum von Keller bis zum Dach ab." · „Wir verbinden passionierte
Handwerksphilosophie mit modernster Büroorganisation."

### Team (12 Personen — Namen und Rollen von `/team/` belegt)

Jens Thron (Geschäftsführer, Dipl.-Ing.) · Alexander Schmitt (Projektleiter, Meister) ·
Anja Fischer (Büroleitung) · Jo Brodmann (Kundendiensttechniker) · Tobias Kain
(Kundendiensttechniker-SHK) · Francisco Hormigo (Monteur, Meister) · Aliou Saibou (Monteur) ·
Sejad Brkic (Monteur) · Alen Brkic (Kundendiensttechniker) · Micha Pestel (Monteur) ·
Jan Hoffmann (Kundendiensttechniker) · Jamie Kerth (Auszubildender).

Alle mit Porträtfoto auf der bestehenden Website vorhanden.

### Nicht auffindbar / nicht verwendet

Soziale Netzwerke · Online-Buchungssystem · Preisliste · Zahlungsarten · Parkplatz-Angaben ·
Barrierefreiheit des Betriebs · Kundenbewertungen auf der eigenen Website · WhatsApp ·
konkretes Gründungsjahr (nur „mehr als 100 Jahre" als Eigenaussage) · Zertifikate/Auszeichnungen ·
Mitarbeiterzahl · Einsatzgebiet über „Weinheim und Umgebung" hinaus.
→ Nichts davon wurde erfunden oder auf der Website behauptet.

---

## 1B — Google Business Profile

**Ergebnis: Profil bestätigt. Bewertungstexte weiterhin nicht auslesbar.**

Der Betrieb hat am 28.08.2026 seinen Teilen-Link genannt:
`https://share.google/sUkhfrO3DE0GT5urZ`. Dieser löst auf

```
https://www.google.com/search?output=search&kgmid=/g/1tg9m25r&q=Hermann+Franzmann+GmbH
```

auf — also auf die Google-Kennung **`/g/1tg9m25r`** für „Hermann Franzmann GmbH".
Da der Link vom Betrieb selbst stammt und die Weiterleitung nachvollziehbar ist,
gilt das Profil als eindeutig zugeordnet. Verwendet wird die aufgelöste Form ohne
Zählparameter; sie steht in `src/data/reviews.ts` unter `googleProfil`.

Darauf verweisen zwei Schaltflächen im Bewertungsteil: „Bewertungen bei Google
lesen" und „Auf Google bewerten". Ein direkter Link auf das Bewertungsformular
(`search.google.com/local/writereview?placeid=…`) verlangt eine **Place ID**, die
sich hier nicht ermitteln ließ — er wurde deshalb **nicht** konstruiert. Die
Beschriftung verspricht entsprechend nur, was sie hält: Sie öffnet das Profil, auf
dem „Rezension schreiben" unmittelbar zum Formular führt.

**Die einzelnen Bewertungen konnten weiterhin nicht ausgelesen werden.**
Vorgehen und Belege:

1. `google.com/search` und `google.com/maps` liefern in dieser Umgebung ausschließlich
   die JavaScript-Weiterleitungsseite („Um Google Maps verwenden zu können, muss
   JavaScript aktiviert sein"). Server-gerenderte Profildaten sind nicht enthalten.
2. Der Weg über einen echten Browser (Chromium/Playwright) wurde versucht und
   schlägt in dieser Umgebung reproduzierbar mit `net::ERR_CONNECTION_RESET` für
   **alle** externen Hosts fehl (getestet gegen `example.com`, `franzmann-service.de`,
   `google.com`, mit und ohne Proxy-Konfiguration). Localhost funktioniert — die
   Playwright-Tests laufen deshalb einwandfrei.
3. Auch Dienste, die eine Seite als Text ausliefern, kommen nicht durch: Der Abruf
   der aufgelösten Profiladresse endet mit dem Hinweis „Unsere Systeme haben
   ungewöhnlichen Datenverkehr festgestellt" — also einer Sicherheitsabfrage.
4. Aggregatoren nennen widersprüchliche Werte: eine Quelle „4,9 bei 23 Bewertungen",
   Trustlocal „8,5/10 bei 28 Bewertungen". **Beide sind nicht gegenprüfbar und wurden
   verworfen.**

**Konsequenz:** Auf der Website steht **keine Google-Note**, **keine Anzahl von
Google-Bewertungen** und **keine nacherzählte Google-Bewertung**. Verlinkt wird das
bestätigte Profil, damit sich jeder die Bewertungen dort selbst ansieht.

**Stattdessen umgesetzt:** ein Bewertungsteil mit einer **tatsächlich belegten**
Bewertung samt Quell-Link (siehe unten), dazu die beiden Wege zum Google-Profil.
Sobald die Bewertungstexte vorliegen, kommen sie in `src/data/reviews.ts` — Karussell
und strukturierte Daten übernehmen sie ohne weitere Änderung.

### Verifizierbare Bewertung (verwendet)

| Feld | Wert |
|---|---|
| Plattform | 11880.com (syndiziert auch bei golocal und Gelbe Seiten) |
| Autor (wie angezeigt) | „Gast" |
| Bewertung | 5 von 5 |
| Datum | 22.01.2024 |
| Quelle (Permalink) | https://www.11880.com/branchenbuch/weinheim-an-der-bergstrasse/060692320B26531305/hermann-franzmann-gmbh.html |
| Beleg | schema.org-`Review` im Quelltext der Seite, Feld `description`, Publisher `11880.com` |

Der Text wird **wörtlich und ungekürzt** wiedergegeben. Aggregat laut Quelle:
Bewertung 5,0 bei 1 Bewertung (`aggregateRating`, 11880.com).

---

## Probleme der bestehenden Website

**Recht**
1. **Kein eigenständiges Impressum.** Der Footer-Link „Impressum und Datenschutzerklärung"
   führt auf `/kontakt/`; es gibt keine eigene URL. Für §5 DDG/TMG ist ein leicht
   erkennbares, unmittelbar erreichbares Impressum vorgeschrieben.
2. **Datenschutzerklärung** liegt ebenfalls nur als Abschnitt auf der Kontaktseite.
3. Widersprüchliche Adressangabe zwischen Footer und Impressum (siehe oben) — auch
   rechtlich relevant, da die Impressumsadresse ladungsfähig sein muss.

**Vertrauen und Konversion**
4. Keine einzige Kundenstimme auf der Website, obwohl belegbare Bewertungen existieren.
5. Kein Kartenausschnitt, keine Anfahrt, kein Routing-Link auf der Kontaktseite.
6. Kein Terminsystem. Kontakt nur über Telefon, Fax, E-Mail und ein Formular mit
   **Rechenaufgabe als Spamschutz** („4 + 4 = ?") — eine echte Konversionsbremse
   und eine Barriere für Nutzer mit Beeinträchtigungen.
7. Der Notdienst — der dringendste Anlass überhaupt — steht klein auf der Kontaktseite
   und ist von der Startseite aus nicht erreichbar.
8. Telefonnummern sind nicht als `tel:`-Links ausgezeichnet; auf dem Smartphone nicht antippbar.

**Inhalt und Struktur**
9. Die Leistungsseiten haben keine Unterseiten je Leistung, keine FAQ und keine
   klaren Handlungsaufforderungen.
10. Auf `/waerme/` und `/klima/` steht dieselbe Überschrift („Das bedeutet: Wohnwärme
    nach Maß … Heizungsprogramm kennen") — ein Copy-Paste-Fehler auf der Klimaseite.
11. Zwei `<h1>` je Seite auf mehreren Seiten (Heading-Hierarchie fehlerhaft).
12. Tippfehler im Fließtext der Startseite: „Wir bietet Ihnen", „inovativen".
13. `/referenzen/` kündigt eine „digitale 3D-Ansicht" an; die Seite besteht faktisch nur
    aus drei Überschriften ohne Inhalt.

**Technik / SEO / Performance**
14. WordPress mit Enfold-Theme; Titelbilder mit 2000 px Breite und bis zu 150 kB je Bild,
    Fotos bis 2,7 MB (`Bademantel.jpg`) im Medienbestand, keine modernen Bildformate.
15. Kein strukturiertes Datenmarkup (`LocalBusiness`), keine Sitemap-Auszeichnung im Kopf,
    generische Seitentitel.
16. Bilder ohne Alt-Texte (die Teamfotos tragen zwar `alt`, die Titelbilder nicht).
17. Footer verweist auf „powered by Enfold WordPress Theme" — Werbung für den Theme-Anbieter
    an prominenter Stelle.

---

## Design DNA

### Marke
Wortmarke **„Franzmann"** in einer weichen, geometrischen Groteske mit gerundeten
Abschlüssen; darunter **„BAD UND HEIZUNG"** in Versalien mit weiter Laufweite.
Das Gebäudeschild trägt die ältere Variante „Sanitär · Heizung · Solar" mit
Mittelpunkt-Trennzeichen — dieser **Mittelpunkt als Trenner** ist ein wiederkehrendes
Element und wird auf der neuen Website als typografisches Detail aufgegriffen.

### Farbe — am Original gemessen

| Rolle | Wert | Herkunft (gemessen) |
|---|---|---|
| Marken-Navy | `#344d6d` | Wortmarke, 79,8 % der Logo-Pixel |
| Marken-Azur | `#017bbf` | Unterzeile „BAD UND HEIZUNG", 20,2 % |
| Fensterläden-Navy | `#546883` | Betriebsfoto, verwitterte Läden am Gebäude |
| Sandstein hell | `#ae9485` | Betriebsfoto, Mauerwerk Münzgasse |
| Sandstein tief | `#675352` | Betriebsfoto, Mauerwerk im Schatten |
| Kopfsteinpflaster | `#84807a` | Betriebsfoto, Gasse vor dem Haus |

Bemerkenswert: Das Navy der Fensterläden des Betriebsgebäudes ist praktisch identisch
mit dem Navy der Wortmarke. Die Hausfarbe **ist** die Markenfarbe. Die Palette der
neuen Website wird daher aus dem realen Gebäude abgeleitet — Sandstein als warmer
Untergrund, Navy als Schrift- und Konstruktionsfarbe, Azur als Handlungsfarbe.

*Umstandsfarben (nicht Identität):* Das Grau-Blau der alten Enfold-Buttons und das
Weiß der Theme-Flächen sind Theme-Vorgaben, keine Markenfarben — sie wurden verworfen.

### Typografie
Die bestehende Website lädt **Open Sans** (belegt: `open-sans-v34-latin-1.zip` und
`OpenSans.rar` im Medienbestand) — eine Theme-Vorgabe ohne Markenbezug. Das Logo
selbst ist eine weiche geometrische Groteske und nicht Open Sans. Für die neue Website
wird der **Charakter des Logos** fortgeführt, nicht die Theme-Schrift.

### Fotografie
Zwei klar getrennte Welten: (a) **Naturwasser** — die Titelbilder zeigen Wasserfälle und
Menschen im Wasser, weich, kühl, mit Gegenlicht; (b) **Technik und Handwerk** — Heizkessel,
Solarmodule, Brennstoffzelle, sachlich und frontal; (c) **Porträts** — das gesamte Team
einheitlich hochformatig vor hellem Hintergrund; (d) **Das Gebäude** — Sandstein,
Fachwerk, Kopfsteinpflaster, navyblaue Läden und ein Rundbogentor.
Die Badfotos wirken generisch (Katalogware) und werden nur zurückhaltend eingesetzt.

### Sprache
Durchgehend **„Sie"**. Warm, persönlich, handwerklich-selbstbewusst, ohne Marketing-Superlative.
Wiederkehrende Wendungen: *„aus einer Hand"*, *„vom Experten vor Ort"*, *„von Anfang bis Ende"*,
*„Wir beraten Sie gerne"*, *„Fragen Sie uns."* Fachbegriffe werden verwendet, aber erklärt.

### Bildwelt des Gewerks
Was dieses Handwerk visuell ausmacht: der **Gebäudeschnitt** (die Arbeitszeichnung der
Haustechnik), **Vor- und Rücklauf** als Leitungspaar, **Steigstränge** durch die Geschosse,
**Temperaturverläufe**, **Rohrbögen und Fittings**, **Maßlinien und Kotierungen**,
**Millimeterpapier**, das **Rundbogentor** des eigenen Hauses, **Sandsteinquader**.
Und der Satz des Unternehmens selbst: *„von Keller bis zum Dach"*.
