import { test, expect, type Page } from '@playwright/test';

/** Luminancia relativa según WCAG. */
function luminancia(r: number, g: number, b: number): number {
  const f = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function contraste(a: [number, number, number], b: [number, number, number]): number {
  const la = luminancia(...a), lb = luminancia(...b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}
/**
 * Analiza los formatos que devuelve el navegador: rgb(), rgba() y también
 * color(srgb ...) —que es lo que produce color-mix()—. Devuelve canales 0-255
 * y alfa 0-1.
 */
function color(txt: string): [number, number, number, number] {
  const t = txt.trim();
  const srgb = t.match(/^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)$/);
  if (srgb) {
    return [
      Number(srgb[1]) * 255, Number(srgb[2]) * 255, Number(srgb[3]) * 255,
      srgb[4] === undefined ? 1 : Number(srgb[4]),
    ];
  }
  const n = t.match(/[\d.]+/g);
  if (!n) return [255, 255, 255, 1];
  return [Number(n[0]), Number(n[1]), Number(n[2]), n[3] === undefined ? 1 : Number(n[3])];
}

/** Superpone una pila de fondos (del más cercano al más lejano) sobre blanco. */
function fondoPlano(pila: string[]): [number, number, number] {
  let r = 255, g = 255, b = 255;
  for (const capa of [...pila].reverse()) {
    const [cr, cg, cb, ca] = color(capa);
    r = cr * ca + r * (1 - ca);
    g = cg * ca + g * (1 - ca);
    b = cb * ca + b * (1 - ca);
  }
  return [r, g, b];
}

test.describe('Accesibilidad', () => {
  test('contraste AA en textos y botones', async ({ page }) => {
    const RUTAS = ['/', '/leistungen/waerme', '/termin', '/kontakt'];
    for (const ruta of RUTAS) {
      await page.goto(ruta);
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo({ top: y, behavior: 'instant' });
          await new Promise((r) => setTimeout(r, 40));
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
      await page.waitForTimeout(400);

      const muestras = await page.evaluate(() => {
        // Reúne todas las capas de fondo hasta encontrar una opaca.
        const capasDe = (el: Element): string[] => {
          const capas: string[] = [];
          let n: Element | null = el;
          while (n) {
            const c = getComputedStyle(n).backgroundColor;
            if (c && !/rgba?\(0,\s*0,\s*0,\s*0\)|transparent/.test(c)) {
              capas.push(c);
              const alfa = c.match(/\/\s*([\d.]+)\s*\)$/) ?? c.match(/,\s*([\d.]+)\s*\)$/);
              if (!alfa || Number(alfa[1]) >= 0.999) break;
            }
            n = n.parentElement;
          }
          return capas;
        };
        const out: { sel: string; fg: string; bg: string[]; px: number; peso: number }[] = [];
        const sel = 'p, h1, h2, h3, h4, a, button, li, dd, dt, small, strong, label, summary';
        document.querySelectorAll(sel).forEach((el) => {
          const t = (el.textContent ?? '').trim();
          if (!t || t.length < 3) return;
          const r = el.getBoundingClientRect();
          if (r.width < 4 || r.height < 4) return;
          const s = getComputedStyle(el);
          if (s.visibility === 'hidden' || s.opacity === '0' || s.display === 'none') return;
          if ((el as HTMLElement).offsetParent === null && s.position !== 'fixed') return;
          out.push({
            sel: el.tagName.toLowerCase() + '.' + (el.className || '').toString().slice(0, 24),
            fg: s.color, bg: capasDe(el),
            px: parseFloat(s.fontSize), peso: Number(s.fontWeight) || 400,
          });
        });
        return out;
      });

      const fallos: string[] = [];
      for (const m of muestras) {
        const grande = m.px >= 24 || (m.px >= 18.66 && m.peso >= 700);
        const minimo = grande ? 3 : 4.5;
        const [fr, fg_, fb, fa] = color(m.fg);
        const fondo = fondoPlano(m.bg);
        // Texto con transparencia propia: se superpone también sobre su fondo.
        const texto: [number, number, number] = [
          fr * fa + fondo[0] * (1 - fa),
          fg_ * fa + fondo[1] * (1 - fa),
          fb * fa + fondo[2] * (1 - fa),
        ];
        const c = contraste(texto, fondo);
        if (c < minimo) {
          fallos.push(`${ruta} ${m.sel} ${c.toFixed(2)}:1 < ${minimo} (${m.fg} sobre ${m.bg.join(' / ')})`);
        }
      }
      expect(fallos.slice(0, 8), `contrastes insuficientes: ${fallos.length}`).toEqual([]);
    }
  });

  test('estructura: landmarks, salto al contenido y jerarquía de encabezados', async ({ page }) => {
    for (const ruta of ['/', '/leistungen/bad', '/team', '/termin']) {
      await page.goto(ruta);
      // Un <header> dentro de <article> no es un landmark; se comprueban los roles.
      await expect(page.getByRole('banner')).toHaveCount(1);
      await expect(page.getByRole('main')).toHaveCount(1);
      await expect(page.getByRole('contentinfo')).toHaveCount(1);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('html')).toHaveAttribute('lang', 'de');

      const salto = page.locator('a.sprunglink');
      await expect(salto).toHaveAttribute('href', '#inhalt');

      // Ningún salto de nivel (h2 -> h4 sin h3).
      const niveles = await page.locator('h1,h2,h3,h4').evaluateAll(
        (hs) => hs.map((h) => Number(h.tagName[1])),
      );
      let previo = niveles[0];
      for (const n of niveles.slice(1)) {
        expect(n - previo, `salto de encabezado en ${ruta}: h${previo} -> h${n}`).toBeLessThanOrEqual(1);
        previo = n;
      }
    }
  });

  test('el foco es visible y el orden del teclado es utilizable', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.locator('a.sprunglink')).toBeFocused();

    const contorno = await page.locator('a.sprunglink').evaluate((e) => {
      const s = getComputedStyle(e);
      return { ancho: s.outlineWidth, estilo: s.outlineStyle };
    });
    expect(contorno.estilo).not.toBe('none');
    expect(parseFloat(contorno.ancho)).toBeGreaterThanOrEqual(1.5);
  });

  test('todas las imágenes llevan texto alternativo', async ({ page }) => {
    for (const ruta of ['/', '/team', '/kontakt', '/leistungen/klima']) {
      await page.goto(ruta);
      const sinAlt = await page.locator('img:not([alt])').count();
      expect(sinAlt, `imágenes sin alt en ${ruta}`).toBe(0);
    }
  });

  test('los campos del formulario tienen etiqueta asociada', async ({ page }) => {
    await page.goto('/termin');
    const huerfanos = await page.evaluate(() => {
      const malos: string[] = [];
      document.querySelectorAll('input, textarea, select').forEach((c) => {
        const el = c as HTMLInputElement;
        if (el.type === 'hidden') return;
        const tieneEtiqueta =
          (el.id && document.querySelector(`label[for="${el.id}"]`)) ||
          el.closest('label') ||
          el.getAttribute('aria-label') ||
          el.getAttribute('aria-labelledby');
        if (!tieneEtiqueta) malos.push(el.name || el.id || el.type);
      });
      return malos;
    });
    expect(huerfanos).toEqual([]);
  });

  test('la valoración no se comunica sólo con color', async ({ page }) => {
    await page.goto('/');
    await page.locator('#stimmen').scrollIntoViewIfNeeded();
    // Hay una cifra escrita junto a la escala y una etiqueta accesible.
    await expect(page.locator('.protokoll__zahl').first()).toHaveText('5,0');
    await expect(page.locator('[aria-label="Bewertung 5 von 5"]').first()).toBeAttached();
  });

  test('con movimiento reducido no quedan contenidos ocultos', async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce' });
    const p = await ctx.newPage();
    await p.goto('/');
    await p.waitForTimeout(600);
    const invisibles = await p.evaluate(
      () => [...document.querySelectorAll('[data-auftritt]')]
        .filter((e) => getComputedStyle(e).opacity === '0').length,
    );
    expect(invisibles, 'todo debe verse sin animación').toBe(0);
    await ctx.close();
  });

  test('sin JavaScript el contenido sigue visible', async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const p = await ctx.newPage();
    await p.goto('/');
    await expect(p.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(p.getByRole('heading', { name: /Was Kundinnen und Kunden berichten/ })).toBeVisible();
    await expect(p.locator('.legende').first()).toBeVisible();
    await ctx.close();
  });
});
