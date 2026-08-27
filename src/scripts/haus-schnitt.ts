export function starteHausSchnitt(): void {
  // Zeichnung und Legende zeigen dieselbe Auswahl. Zeigt der Nutzer auf einen
  // Eintrag der Liste, hebt sich die zugehörige Ebene im Schnitt hervor.
  const wurzel = document.querySelector<HTMLElement>('[data-haus-schnitt]');
  if (wurzel) {
    const zonen = wurzel.querySelectorAll<SVGAElement>('.zone');
    const eintraege = wurzel.querySelectorAll<HTMLAnchorElement>('[data-legende]');

    const setzen = (slug: string | null) => {
      zonen.forEach((z) => z.classList.toggle('ist-aktiv', z.dataset.zone === slug));
    };

    eintraege.forEach((a) => {
      const slug = a.dataset.legende ?? null;
      a.addEventListener('pointerenter', () => setzen(slug));
      a.addEventListener('focus', () => setzen(slug));
      a.addEventListener('pointerleave', () => setzen(null));
      a.addEventListener('blur', () => setzen(null));
    });
  }
}
