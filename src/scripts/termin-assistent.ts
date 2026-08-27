/**
 * Ablauf des Termin-Assistenten.
 *
 * Die Oberfläche kennt nur Schritte, Prüfungen und die Zusammenfassung.
 * Der Versand steckt allein in `uebertrageAnfrage` und lässt sich gegen einen
 * echten Mailversand austauschen, ohne dass die Bedienung sich ändert.
 */

export interface Anfrage {
  bereich: string;
  bereichSlug: string;
  leistung: string;
  leistungId: string;
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

export type Uebertragung =
  | { art: 'erfolg'; nachricht: string }
  | { art: 'fehler'; code: string; nachricht: string };

/** Einziger Berührungspunkt zum Versand. */
export async function uebertrageAnfrage(daten: Anfrage): Promise<Uebertragung> {
  const antwort = await fetch('/api/termin', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(daten),
  });

  const inhalt = (await antwort.json().catch(() => ({}))) as Record<string, unknown>;

  if (antwort.ok && inhalt.ok === true) {
    return { art: 'erfolg', nachricht: String(inhalt.nachricht ?? 'Ihre Anfrage ist bei uns eingegangen.') };
  }
  return {
    art: 'fehler',
    code: String(inhalt.code ?? 'unbekannt'),
    nachricht: String(inhalt.nachricht ?? 'Die Anfrage konnte nicht übertragen werden.'),
  };
}

const WOCHENTAGE = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

function datumLesbar(iso: string): string {
  if (!iso) return '';
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return `${WOCHENTAGE[d.getDay()]}, ${d.toLocaleDateString('de-DE', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  })}`;
}

function inBuerozeit(zeit: string): boolean {
  if (!zeit) return false;
  const [h, m] = zeit.split(':').map(Number);
  const minuten = h * 60 + m;
  return minuten >= 7 * 60 + 30 && minuten <= 16 * 60;
}

function istWerktag(iso: string): boolean {
  const tag = new Date(`${iso}T12:00:00`).getDay();
  return tag >= 1 && tag <= 5;
}

export function starteAssistent(): void {
  const wurzel = document.querySelector<HTMLElement>('[data-assistent]');
  if (!wurzel) return;

  const form = wurzel.querySelector<HTMLFormElement>('[data-termin-form]')!;
  const schritte = Array.from(wurzel.querySelectorAll<HTMLFieldSetElement>('[data-schritt]'));
  const glieder = Array.from(wurzel.querySelectorAll<HTMLElement>('[data-glied]'));
  const knopfWeiter = wurzel.querySelector<HTMLButtonElement>('[data-weiter]')!;
  const knopfZurueck = wurzel.querySelector<HTMLButtonElement>('[data-zurueck]')!;
  const knopfSenden = wurzel.querySelector<HTMLButtonElement>('[data-senden]')!;
  const sendenText = wurzel.querySelector<HTMLElement>('[data-senden-text]')!;
  const ergebnis = wurzel.querySelector<HTMLElement>('[data-ergebnis]')!;

  const band = wurzel.querySelector<HTMLElement>('[data-wahlband]')!;
  const bandBereich = wurzel.querySelector<HTMLElement>('[data-wahlband-bereich]')!;
  const bandLeistung = wurzel.querySelector<HTMLElement>('[data-wahlband-leistung]')!;
  const bandNotiz = wurzel.querySelector<HTMLElement>('[data-wahlband-notiz]')!;
  const bandZeichen = wurzel.querySelector<HTMLElement>('[data-wahlband-zeichen]')!;

  const leistungsfeld = wurzel.querySelector<HTMLElement>('[data-leistungsfeld]')!;
  const bereichEingaben = Array.from(wurzel.querySelectorAll<HTMLInputElement>('[data-bereich-eingabe]'));
  const leistungEingaben = Array.from(wurzel.querySelectorAll<HTMLInputElement>('[data-leistung-eingabe]'));

  let aktuell = 1;

  // ---------- Schrittsteuerung ----------
  const zeigeSchritt = (nr: number, fokus = true) => {
    aktuell = nr;
    schritte.forEach((s) => { s.hidden = Number(s.dataset.schritt) !== nr; });
    glieder.forEach((g) => {
      const n = Number(g.dataset.glied);
      if (n === nr) g.setAttribute('aria-current', 'step');
      else g.removeAttribute('aria-current');
      if (n < nr) g.dataset.erledigt = 'ja';
      else delete g.dataset.erledigt;
    });

    band.hidden = nr === 1 || !gewaehlteLeistung();
    knopfZurueck.hidden = nr === 1;
    knopfWeiter.hidden = nr === 3;
    knopfSenden.hidden = nr !== 3;

    if (nr === 3) aktualisierePruefblatt();
    pruefeWeiter();

    if (fokus) {
      const ziel = schritte.find((s) => Number(s.dataset.schritt) === nr);
      const erstes = ziel?.querySelector<HTMLElement>(
        'input:not([type="hidden"]):not(.nur-sr), textarea, select',
      );
      // Der Kopf des Assistenten bleibt sichtbar, der Fokus wandert in den Schritt.
      wurzel.scrollIntoView({ behavior: mag.matches ? 'auto' : 'smooth', block: 'start' });
      window.setTimeout(() => erstes?.focus({ preventScroll: true }), mag.matches ? 0 : 320);
    }
  };

  const mag = window.matchMedia('(prefers-reduced-motion: reduce)');

  // ---------- Auswahl ----------
  const gewaehlteLeistung = () => leistungEingaben.find((e) => e.checked) ?? null;

  const zeigeLeistungen = (slug: string) => {
    let sichtbar = 0;
    wurzel.querySelectorAll<HTMLElement>('[data-gehoert-zu]').forEach((el) => {
      const passt = el.dataset.gehoertZu === slug;
      el.hidden = !passt;
      if (passt) sichtbar += 1;
      const feld = el.querySelector<HTMLInputElement>('input');
      if (feld && !passt && feld.checked) feld.checked = false;
    });
    leistungsfeld.hidden = sichtbar === 0;
  };

  const aktualisiereBand = () => {
    const l = gewaehlteLeistung();
    if (!l) { band.hidden = true; return; }
    bandBereich.textContent = l.dataset.bereichName ?? '';
    bandLeistung.textContent = l.dataset.label ?? '';
    bandNotiz.textContent = l.dataset.notiz ?? '';
    const zeichen = l.closest('label')?.querySelector('svg');
    if (zeichen) bandZeichen.replaceChildren(zeichen.cloneNode(true));
    band.hidden = aktuell === 1;
  };

  bereichEingaben.forEach((e) => {
    e.addEventListener('change', () => {
      zeigeLeistungen(e.value);
      verbergeFehler('leistung');
      pruefeWeiter();
      // Die Leistungsliste erscheint direkt darunter; nicht springen.
    });
  });

  leistungEingaben.forEach((e) => {
    e.addEventListener('change', () => {
      aktualisiereBand();
      verbergeFehler('leistung');
      pruefeWeiter();
    });
  });

  wurzel.querySelector<HTMLButtonElement>('[data-zurueck-zu-eins]')?.addEventListener('click', () => {
    zeigeSchritt(1);
  });

  // ---------- Prüfungen ----------
  const fehlerFeld = (name: string) =>
    wurzel.querySelector<HTMLElement>(`[data-fehler="${name}"]`);

  const zeigeFehler = (name: string, text: string, feld?: HTMLElement | null) => {
    const p = fehlerFeld(name);
    if (p) { p.textContent = text; p.hidden = false; }
    feld?.setAttribute('aria-invalid', 'true');
  };
  const verbergeFehler = (name: string, feld?: HTMLElement | null) => {
    const p = fehlerFeld(name);
    if (p) { p.hidden = true; p.textContent = ''; }
    feld?.removeAttribute('aria-invalid');
  };

  const feld = <T extends HTMLElement>(n: string) => form.querySelector<T>(`[name="${n}"]`);

  const pruefeSchritt = (nr: number, meldenUndFokussieren = true): boolean => {
    if (nr === 1) {
      if (!gewaehlteLeistung()) {
        if (meldenUndFokussieren) {
          const ohneBereich = !bereichEingaben.some((e) => e.checked);
          zeigeFehler(
            'leistung',
            ohneBereich
              ? 'Bitte wählen Sie zuerst einen Bereich aus.'
              : 'Bitte wählen Sie eine Leistung aus.',
          );
          const ziel = ohneBereich
            ? bereichEingaben[0]
            : leistungsfeld.querySelector<HTMLInputElement>('label:not([hidden]) input');
          ziel?.focus();
        }
        return false;
      }
      return true;
    }

    if (nr === 2) {
      const d = feld<HTMLInputElement>('wunschDatum')!;
      const z = feld<HTMLInputElement>('wunschZeit')!;
      if (!d.value || !z.value) {
        if (meldenUndFokussieren) {
          zeigeFehler('wunsch', 'Bitte geben Sie Datum und Uhrzeit an.', !d.value ? d : z);
          (!d.value ? d : z).focus();
        }
        return false;
      }
      if (!istWerktag(d.value)) {
        if (meldenUndFokussieren) {
          zeigeFehler('wunsch', 'Termine vergeben wir von Montag bis Freitag. Bitte wählen Sie einen Werktag.', d);
          d.focus();
        }
        return false;
      }
      if (!inBuerozeit(z.value)) {
        if (meldenUndFokussieren) {
          zeigeFehler('wunsch', 'Bitte wählen Sie eine Uhrzeit zwischen 07:30 und 16:00 Uhr.', z);
          z.focus();
        }
        return false;
      }
      verbergeFehler('wunsch', d); verbergeFehler('wunsch', z);
      return true;
    }

    // Schritt 3
    let gut = true;
    let ersterFehler: HTMLElement | null = null;

    const name = feld<HTMLInputElement>('name')!;
    if (name.value.trim().length < 2) {
      if (meldenUndFokussieren) zeigeFehler('name', 'Bitte nennen Sie uns Ihren Namen.', name);
      ersterFehler ??= name; gut = false;
    } else verbergeFehler('name', name);

    const email = feld<HTMLInputElement>('email')!;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
      if (meldenUndFokussieren) zeigeFehler('email', 'Bitte prüfen Sie Ihre E-Mail-Adresse.', email);
      ersterFehler ??= email; gut = false;
    } else verbergeFehler('email', email);

    const zu = feld<HTMLInputElement>('zustimmung')!;
    if (!zu.checked) {
      if (meldenUndFokussieren) zeigeFehler('zustimmung', 'Ohne Ihre Zustimmung dürfen wir die Anfrage nicht bearbeiten.', zu);
      ersterFehler ??= zu; gut = false;
    } else verbergeFehler('zustimmung', zu);

    if (!gut && meldenUndFokussieren) ersterFehler?.focus();
    return gut;
  };

  /**
   * „Weiter" bleibt immer bedienbar. Eine Schaltfläche, die ohne Erklärung
   * ausgraut, lässt Ratlose zurück — beim Klick steht stattdessen da, was fehlt.
   * Fehlermeldungen, die bereits behoben sind, verschwinden sofort.
   */
  const pruefeWeiter = () => {
    if (aktuell === 1 && gewaehlteLeistung()) verbergeFehler('leistung');
    if (aktuell === 2 && pruefeSchritt(2, false)) {
      verbergeFehler('wunsch', feld<HTMLInputElement>('wunschDatum'));
      verbergeFehler('wunsch', feld<HTMLInputElement>('wunschZeit'));
    }
  };

  knopfWeiter.addEventListener('click', () => {
    if (!pruefeSchritt(aktuell)) return;
    zeigeSchritt(Math.min(3, aktuell + 1));
  });
  knopfZurueck.addEventListener('click', () => zeigeSchritt(Math.max(1, aktuell - 1)));

  // ---------- Lebende Zusammenfassung ----------
  const setzeZeile = (schluessel: string, wert: string, optional = false) => {
    const dd = wurzel.querySelector<HTMLElement>(`[data-p="${schluessel}"]`);
    if (dd) dd.textContent = wert || '—';
    const zeile = wurzel.querySelector<HTMLElement>(`[data-p-zeile="${schluessel}"]`);
    if (zeile && optional) zeile.hidden = !wert;
  };

  function sammle(): Anfrage {
    const l = gewaehlteLeistung();
    const w = (n: string) => (feld<HTMLInputElement>(n)?.value ?? '').trim();
    return {
      bereich: l?.dataset.bereichName ?? '',
      bereichSlug: l?.dataset.bereich ?? '',
      leistung: l?.dataset.label ?? '',
      leistungId: l?.value ?? '',
      notiz: l?.dataset.notiz ?? '',
      wunschDatum: w('wunschDatum'),
      wunschZeit: w('wunschZeit'),
      altDatum: w('altDatum'),
      altZeit: w('altZeit'),
      anliegen: (form.querySelector<HTMLTextAreaElement>('[name="anliegen"]')?.value ?? '').trim(),
      name: w('name'),
      email: w('email'),
      telefon: w('telefon'),
      rueckweg: form.querySelector<HTMLInputElement>('[name="rueckweg"]:checked')?.value ?? 'telefon',
    };
  }

  function aktualisierePruefblatt() {
    const a = sammle();
    setzeZeile('bereich', a.bereich);
    setzeZeile('leistung', a.leistung);
    setzeZeile('wunsch', a.wunschDatum ? `${datumLesbar(a.wunschDatum)}, ${a.wunschZeit} Uhr` : '');
    setzeZeile('alt', a.altDatum ? `${datumLesbar(a.altDatum)}${a.altZeit ? `, ${a.altZeit} Uhr` : ''}` : '', true);
    setzeZeile('name', a.name);
    setzeZeile('email', a.email);
    setzeZeile('telefon', a.telefon, true);
    setzeZeile('rueckweg', { telefon: 'Anruf', email: 'E-Mail', egal: 'Egal' }[a.rueckweg] ?? 'Anruf');
    setzeZeile('anliegen', a.anliegen, true);
  }

  form.addEventListener('input', () => {
    if (aktuell === 3) aktualisierePruefblatt();
    pruefeWeiter();
  });
  form.addEventListener('change', () => {
    if (aktuell === 3) aktualisierePruefblatt();
    pruefeWeiter();
  });

  // ---------- Versand ----------
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!pruefeSchritt(3)) return;

    knopfSenden.disabled = true;
    sendenText.textContent = 'Wird gesendet …';
    ergebnis.hidden = true;

    const daten = sammle();
    let antwort: Uebertragung;
    try {
      antwort = await uebertrageAnfrage(daten);
    } catch {
      antwort = {
        art: 'fehler',
        code: 'netzwerk',
        nachricht: 'Die Verbindung ist unterbrochen. Bitte versuchen Sie es erneut.',
      };
    }

    knopfSenden.disabled = false;
    sendenText.textContent = 'Anfrage senden';
    ergebnis.hidden = false;
    ergebnis.dataset.art = antwort.art;

    if (antwort.art === 'erfolg') {
      ergebnis.innerHTML =
        `<h3>Ihre Anfrage ist eingegangen</h3><p>${antwort.nachricht}</p>`;
      form.querySelectorAll<HTMLInputElement>('input, textarea, button').forEach((el) => {
        if (el !== knopfSenden) el.disabled = true;
      });
      knopfSenden.hidden = true;
    } else {
      // Kein Erfolg wird vorgetäuscht. Stattdessen die beiden Wege, die
      // sicher funktionieren — mit allen Angaben bereits ausgefüllt.
      const betreff = encodeURIComponent(
        `Terminanfrage: ${daten.bereich} — ${daten.leistung}`,
      );
      const zeilen = [
        `Bereich: ${daten.bereich}`,
        `Leistung: ${daten.leistung}`,
        `Wunschtermin: ${datumLesbar(daten.wunschDatum)}, ${daten.wunschZeit} Uhr`,
        daten.altDatum ? `Ausweichtermin: ${datumLesbar(daten.altDatum)}${daten.altZeit ? `, ${daten.altZeit} Uhr` : ''}` : '',
        '',
        `Name: ${daten.name}`,
        `E-Mail: ${daten.email}`,
        daten.telefon ? `Telefon: ${daten.telefon}` : '',
        `Antwort bevorzugt per: ${{ telefon: 'Anruf', email: 'E-Mail', egal: 'Egal' }[daten.rueckweg]}`,
        daten.anliegen ? `\nAnliegen:\n${daten.anliegen}` : '',
      ].filter(Boolean).join('\n');

      ergebnis.innerHTML = `
        <h3>Die Anfrage konnte nicht übertragen werden</h3>
        <p>${antwort.nachricht} Ihre Angaben sind vollständig — Sie erreichen uns direkt:</p>
        <div class="ergebnis__wege">
          <a class="knopf knopf--handlung" href="tel:+49620190330">(06201) 9033-0 anrufen</a>
          <a class="knopf knopf--leer" href="mailto:mail@franzmann-service.de?subject=${betreff}&body=${encodeURIComponent(zeilen)}">Als E-Mail senden</a>
        </div>`;
    }
    ergebnis.scrollIntoView({ behavior: mag.matches ? 'auto' : 'smooth', block: 'nearest' });
  });

  // ---------- Vorauswahl aus Seite oder Adresse ----------
  const suche = new URLSearchParams(window.location.search);
  const vorBereich = suche.get('bereich') || wurzel.dataset.vorBereich || '';
  const vorLeistung = suche.get('leistung') || wurzel.dataset.vorLeistung || '';

  if (vorBereich) {
    const b = bereichEingaben.find((e) => e.value === vorBereich);
    if (b) {
      b.checked = true;
      zeigeLeistungen(vorBereich);
      if (vorLeistung) {
        const l = leistungEingaben.find((e) => e.value === vorLeistung);
        if (l) { l.checked = true; aktualisiereBand(); }
      }
    }
  }
  knopfWeiter.disabled = false;
  pruefeWeiter();
}
