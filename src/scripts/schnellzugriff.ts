export function starteSchnellzugriff(): void {
  const wurzel = document.querySelector<HTMLElement>('[data-schnellzugriff]');
  const schalter = wurzel?.querySelector<HTMLButtonElement>('[data-schnell-schalter]');
  const liste = wurzel?.querySelector<HTMLElement>('#schnell-liste');
  const beschriftung = wurzel?.querySelector<HTMLElement>('[data-schnell-beschriftung]');

  if (wurzel && schalter && liste && beschriftung) {
    const setzen = (offen: boolean) => {
      schalter.setAttribute('aria-expanded', String(offen));
      liste.hidden = !offen;
      beschriftung.textContent = offen
        ? 'Kontaktmöglichkeiten schließen'
        : 'Kontaktmöglichkeiten öffnen';
    };

    schalter.addEventListener('click', () => {
      setzen(schalter.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && schalter.getAttribute('aria-expanded') === 'true') {
        setzen(false);
        schalter.focus();
      }
    });

    document.addEventListener('pointerdown', (e) => {
      if (schalter.getAttribute('aria-expanded') !== 'true') return;
      if (!wurzel.contains(e.target as Node)) setzen(false);
    });
  }
}
