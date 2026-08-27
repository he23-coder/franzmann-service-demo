export function starteAuftritt(): void {
      // Auftritt beim Scrollen. Bei reduzierter Bewegung wird sofort alles gezeigt.
      const mag = window.matchMedia('(prefers-reduced-motion: reduce)');
      const teile = document.querySelectorAll<HTMLElement>('[data-auftritt]');
      if (mag.matches || !('IntersectionObserver' in window)) {
        teile.forEach((t) => t.classList.add('ist-sichtbar'));
      } else {
        const beobachter = new IntersectionObserver(
          (eintraege) => {
            eintraege.forEach((e) => {
              if (!e.isIntersecting) return;
              const el = e.target as HTMLElement;
              const verzug = Number(el.dataset.verzug ?? 0);
              window.setTimeout(() => el.classList.add('ist-sichtbar'), verzug);
              beobachter.unobserve(el);
            });
          },
          { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
        );
        teile.forEach((t) => beobachter.observe(t));
      }
}
