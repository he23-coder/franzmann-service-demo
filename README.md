# Franzmann — Bad und Heizung, Weinheim

Website der Hermann Franzmann GmbH: Heizung, Bad, Klima und Kundendienst.

## Aufbau

| Ort | Inhalt |
|---|---|
| `src/data/` | Alle Betriebsdaten, getrennt vom Aussehen. Einzige Quelle für Adresse, Leistungen, Team und Bewertungen. |
| `src/components/` | Bausteine der Oberfläche, u. a. der Gebäudeschnitt und der Termin-Assistent. |
| `src/scripts/` | Verhalten: Karussell, Assistent, Schnellzugriff. |
| `src/worker.ts` | Cloudflare Worker: liefert die Seiten aus, setzt die Kopfzeilen, nimmt Terminanfragen entgegen. |
| `tests/` | Playwright-Prüfungen für Ladeverhalten, Zugänglichkeit, Karussell, Assistent und Darstellung. |
| `docs/` | Quellen-Audit und Vergleich mit der bisherigen Website. |

## Entwicklung

```bash
npm install
npm run dev                       # Entwicklungsserver
npm run build                     # statischer Bau nach dist/
npm run serve:dist                # dist/ mit denselben Kopfzeilen ausliefern
PRUEFSTAND=1 npm run build        # Bau mit Prüfstand für die Karussell-Tests
npx playwright test               # alle Prüfungen
node scripts/karte.mjs            # statische Karte neu erzeugen
node scripts/bilder.mjs           # Bilder neu aufbereiten
```

## Veröffentlichen

Ziel ist **Cloudflare Workers**, nicht Pages: `src/worker.ts` liefert die Seiten
aus, setzt die Kopfzeilen und nimmt Terminanfragen entgegen. Bei einer
Pages-Veröffentlichung entfiele beides — die Kopfzeilen fängt dann `public/_headers`
ab, `/api/termin` bliebe ohne Funktion.

**Über die Git-Anbindung in Cloudflare (Workers & Pages → Workers → Git):**

| Feld | Wert |
|---|---|
| Branch | `main` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |

**Von Hand:**

```bash
npm ci
npm run build
npx wrangler deploy          # benötigt einen angemeldeten Wrangler
```

Der Worker heißt `franzmann-bad-heizung-weinheim` (siehe `wrangler.jsonc`).
Nach der ersten Veröffentlichung die echte Adresse als Variable `SITE_URL`
hinterlegen, damit canonical, Open Graph und Sitemap stimmen:

```bash
SITE_URL=https://franzmann-bad-heizung-weinheim.<subdomain>.workers.dev npm run build
```

Über GitHub Actions läuft derselbe Ablauf in `.github/workflows/deploy.yml`;
dafür braucht das Repository die Secrets `CLOUDFLARE_API_TOKEN` und
`CLOUDFLARE_ACCOUNT_ID`.

## Terminanfragen

`POST /api/termin` prüft die Eingaben und übergibt sie an `versendeAnfrage` in
`src/worker.ts`. Solange dort kein Versandweg hinterlegt ist, antwortet die
Schnittstelle mit `503` und einem Hinweis — es wird nie ein Versand vorgetäuscht.
Zum Anschluss eines Mailversands genügen drei Secrets:

```
RESEND_API_KEY
ANFRAGE_EMPFAENGER
ANFRAGE_ABSENDER
```

An der Oberfläche ändert sich dadurch nichts.
