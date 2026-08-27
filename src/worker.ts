/**
 * Worker vor den statischen Dateien.
 *
 * Zwei Aufgaben:
 *  1. Jede Antwort erhält dieselben Sicherheits- und Indexierungs-Header.
 *  2. /api/termin nimmt Terminanfragen entgegen.
 *
 * Der Mailversand ist bewusst hinter einer einzigen Funktion gekapselt
 * (`versendeAnfrage`). Ohne hinterlegten Zugang meldet die Schnittstelle
 * ehrlich, dass nicht übertragen werden konnte — es wird kein Erfolg
 * vorgetäuscht.
 */

interface Env {
  ASSETS: Fetcher;
  /** Optional. Erst gesetzt, wenn der Mailversand eingerichtet ist. */
  RESEND_API_KEY?: string;
  ANFRAGE_EMPFAENGER?: string;
  ANFRAGE_ABSENDER?: string;
}

interface Anfrage {
  bereich: string;
  leistung: string;
  notiz: string;
  wunschDatum: string;
  wunschZeit: string;
  altDatum: string;
  altZeit: string;
  anliegen: string;
  name: string;
  email: string;
  telefon: string;
  rueckweg: string;
}

const KOPFZEILEN: Record<string, string> = {
  // Vorschau des Entwurfs: nicht indexieren.
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), interest-cohort=()',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "object-src 'none'",
  ].join('; '),
};

function mitKopfzeilen(antwort: Response): Response {
  const neu = new Response(antwort.body, antwort);
  for (const [k, v] of Object.entries(KOPFZEILEN)) neu.headers.set(k, v);
  return neu;
}

function json(inhalt: unknown, status = 200): Response {
  return mitKopfzeilen(
    new Response(JSON.stringify(inhalt), {
      status,
      headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
    }),
  );
}

function text(wert: unknown, max = 2000): string {
  return typeof wert === 'string' ? wert.trim().slice(0, max) : '';
}

/** Serverseitige Prüfung. Die Oberfläche prüft zusätzlich, aber nie allein. */
function pruefe(a: Anfrage): string[] {
  const fehler: string[] = [];
  if (a.name.length < 2) fehler.push('Name fehlt.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(a.email)) fehler.push('E-Mail-Adresse ist ungültig.');
  if (!a.leistung) fehler.push('Es wurde keine Leistung gewählt.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(a.wunschDatum)) fehler.push('Wunschdatum fehlt.');
  if (!/^\d{2}:\d{2}$/.test(a.wunschZeit)) fehler.push('Uhrzeit fehlt.');
  return fehler;
}

function alsText(a: Anfrage): string {
  return [
    'Terminanfrage über die Website',
    '',
    `Bereich:        ${a.bereich}`,
    `Leistung:       ${a.leistung}${a.notiz ? ` (${a.notiz})` : ''}`,
    `Wunschtermin:   ${a.wunschDatum} um ${a.wunschZeit} Uhr`,
    a.altDatum ? `Ausweichtermin: ${a.altDatum}${a.altZeit ? ` um ${a.altZeit} Uhr` : ''}` : '',
    '',
    `Name:           ${a.name}`,
    `E-Mail:         ${a.email}`,
    a.telefon ? `Telefon:        ${a.telefon}` : '',
    `Antwort per:    ${a.rueckweg}`,
    a.anliegen ? `\nAnliegen:\n${a.anliegen}` : '',
  ]
    .filter((z) => z !== '')
    .join('\n');
}

/**
 * Einziger Ort für den Versand. Zum Anschluss eines Mailversands wird hier
 * der Zugang hinterlegt; an der Oberfläche ändert sich dadurch nichts.
 */
async function versendeAnfrage(
  a: Anfrage,
  env: Env,
): Promise<{ ok: true } | { ok: false; code: string; nachricht: string }> {
  if (!env.RESEND_API_KEY || !env.ANFRAGE_EMPFAENGER || !env.ANFRAGE_ABSENDER) {
    return {
      ok: false,
      code: 'kein_versandweg',
      nachricht: 'Die Anfrage konnte gerade nicht elektronisch zugestellt werden.',
    };
  }

  const antwort = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: env.ANFRAGE_ABSENDER,
      to: [env.ANFRAGE_EMPFAENGER],
      reply_to: a.email,
      subject: `Terminanfrage: ${a.bereich} — ${a.leistung}`,
      text: alsText(a),
    }),
  });

  if (!antwort.ok) {
    return {
      ok: false,
      code: 'versand_fehlgeschlagen',
      nachricht: 'Die Anfrage konnte gerade nicht zugestellt werden.',
    };
  }
  return { ok: true };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/termin') {
      if (request.method !== 'POST') {
        return json({ ok: false, code: 'methode', nachricht: 'Nur POST.' }, 405);
      }

      let roh: Record<string, unknown>;
      try {
        roh = (await request.json()) as Record<string, unknown>;
      } catch {
        return json({ ok: false, code: 'ungueltig', nachricht: 'Die Anfrage war unlesbar.' }, 400);
      }

      const anfrage: Anfrage = {
        bereich: text(roh.bereich, 80),
        leistung: text(roh.leistung, 120),
        notiz: text(roh.notiz, 160),
        wunschDatum: text(roh.wunschDatum, 10),
        wunschZeit: text(roh.wunschZeit, 5),
        altDatum: text(roh.altDatum, 10),
        altZeit: text(roh.altZeit, 5),
        anliegen: text(roh.anliegen, 2000),
        name: text(roh.name, 120),
        email: text(roh.email, 160),
        telefon: text(roh.telefon, 60),
        rueckweg: text(roh.rueckweg, 20),
      };

      const fehler = pruefe(anfrage);
      if (fehler.length > 0) {
        return json({ ok: false, code: 'unvollstaendig', nachricht: fehler.join(' ') }, 422);
      }

      const ergebnis = await versendeAnfrage(anfrage, env);
      if (!ergebnis.ok) {
        return json({ ok: false, code: ergebnis.code, nachricht: ergebnis.nachricht }, 503);
      }

      return json({
        ok: true,
        nachricht:
          'Wir melden uns zur Bestätigung bei Ihnen. Verbindlich wird der Termin mit unserer Zusage.',
      });
    }

    if (url.pathname.startsWith('/api/')) {
      return json({ ok: false, code: 'unbekannt', nachricht: 'Nicht vorhanden.' }, 404);
    }

    return mitKopfzeilen(await env.ASSETS.fetch(request));
  },
} satisfies ExportedHandler<Env>;
