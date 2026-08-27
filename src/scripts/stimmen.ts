export function starteStimmen(): void {
  /**
   * Karussell.
   *
   * Regel: Nur die ausdrückliche Pause-Taste hält den Wechsel dauerhaft an.
   * Pfeile, Punkte, Wischen und Zeigen setzen die Uhr lediglich zurück.
   */
  const wurzel = document.querySelector<HTMLElement>('[data-stimmen]');
  const band = wurzel?.querySelector<HTMLElement>('[data-band]');
  const folien = band ? Array.from(band.querySelectorAll<HTMLElement>('[data-folie]')) : [];

  if (wurzel && band && folien.length > 1) {
    const punkte = Array.from(wurzel.querySelectorAll<HTMLButtonElement>('[data-punkt]'));
    const knopfWeiter = wurzel.querySelector<HTMLButtonElement>('[data-weiter]')!;
    const knopfZurueck = wurzel.querySelector<HTMLButtonElement>('[data-zurueck]')!;
    const knopfHalten = wurzel.querySelector<HTMLButtonElement>('[data-halten]')!;
    const ansage = wurzel.querySelector<HTMLElement>('[data-ansage]')!;
    const buehne = wurzel.querySelector<HTMLElement>('[data-buehne]')!;
    const mag = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Lesezeit: lange Stimmen bleiben länger stehen.
    const dauer = folien.map((f) => {
      const zeichen = (f.textContent ?? '').trim().length;
      return Math.min(22000, Math.max(9000, Math.round(zeichen * 55)));
    });

    let index = 0;
    let angehalten = mag.matches; // Bei reduzierter Bewegung startet der Wechsel nicht.
    let uhr: number | undefined;

    const zeige = (neu: number) => {
      index = (neu + folien.length) % folien.length;
      folien.forEach((f, i) => {
        const sichtbar = i === index;
        f.hidden = !sichtbar;
        if (sichtbar) f.removeAttribute('aria-hidden');
        else f.setAttribute('aria-hidden', 'true');
      });
      punkte.forEach((p, i) => p.setAttribute('aria-selected', String(i === index)));
      ansage.textContent = `Stimme ${index + 1} von ${folien.length}`;
      // Die Höhe folgt der aktiven Stimme: nur die sichtbare Folie steht im Fluss.
    };

    const stoppeUhr = () => {
      if (uhr !== undefined) { window.clearTimeout(uhr); uhr = undefined; }
    };

    /** Startet neu, sofern nicht ausdrücklich pausiert. */
    const starteUhr = () => {
      stoppeUhr();
      if (angehalten) return;
      uhr = window.setTimeout(() => {
        zeige(index + 1);
        starteUhr();
      }, dauer[index]);
    };

    const wechsle = (neu: number) => { zeige(neu); starteUhr(); };

    knopfWeiter.addEventListener('click', () => wechsle(index + 1));
    knopfZurueck.addEventListener('click', () => wechsle(index - 1));
    punkte.forEach((p, i) => p.addEventListener('click', () => wechsle(i)));

    knopfHalten.addEventListener('click', () => {
      angehalten = !angehalten;
      knopfHalten.setAttribute('aria-pressed', String(angehalten));
      knopfHalten.setAttribute(
        'aria-label',
        angehalten ? 'Automatischen Wechsel fortsetzen' : 'Automatischen Wechsel anhalten',
      );
      if (angehalten) stoppeUhr(); else starteUhr();
    });

    // Zeigen hält nur solange an, wie der Zeiger darauf steht.
    buehne.addEventListener('pointerenter', stoppeUhr);
    buehne.addEventListener('pointerleave', starteUhr);
    buehne.addEventListener('focusin', stoppeUhr);
    buehne.addEventListener('focusout', (e) => {
      if (!buehne.contains(e.relatedTarget as Node)) starteUhr();
    });

    // Tastatur
    buehne.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); wechsle(index + 1); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); wechsle(index - 1); }
    });

    // Wischen
    let startX = 0, startY = 0, zieht = false;
    band.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse') return;
      zieht = true; startX = e.clientX; startY = e.clientY;
    });
    band.addEventListener('pointerup', (e) => {
      if (!zieht) return;
      zieht = false;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) wechsle(index + (dx < 0 ? 1 : -1));
    });
    band.addEventListener('pointercancel', () => { zieht = false; });

    // Im Hintergrund läuft nichts weiter.
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stoppeUhr(); else starteUhr();
    });

    zeige(0);
    knopfHalten.setAttribute('aria-pressed', String(angehalten));
    starteUhr();
  }
}
