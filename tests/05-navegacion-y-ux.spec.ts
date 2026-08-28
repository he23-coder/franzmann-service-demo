import { test, expect } from '@playwright/test';

test.describe('Navegación móvil', () => {
  test.beforeEach(() => {
    test.skip(test.info().project.name !== 'mobil', 'sólo móvil');
  });

  test('la barra es fija y los enlaces están visibles sin menú hamburguesa', async ({ page }) => {
    await page.goto('/');
    const cabecera = page.locator('header.kopf');
    await expect(cabecera).toBeVisible();
    expect(await cabecera.evaluate((e) => getComputedStyle(e).position)).toBe('fixed');

    // No existe ningún botón de menú desplegable de navegación.
    const burger = page.getByRole('button', { name: /men[uü]|navigation|hamburger/i });
    await expect(burger).toHaveCount(0);

    // Los seis destinos son alcanzables como enlaces visibles.
    for (const nombre of ['Wärme', 'Bad', 'Klima', 'Kundendienst', 'Betrieb', 'Kontakt']) {
      await expect(page.locator('.kopf__reiter').getByRole('link', { name: nombre, exact: true }))
        .toBeVisible();
    }

    // Sigue visible tras desplazarse.
    await page.evaluate(() => window.scrollTo({ top: 2500, behavior: 'instant' }));
    await page.waitForTimeout(200);
    await expect(cabecera).toBeInViewport();
  });

  test('ningún CTA importante queda tapado por la barra fija', async ({ page }) => {
    await page.goto('/leistungen/bad');
    await page.click('[data-waehlt="komplettbad"]');
    await page.waitForTimeout(800);

    const alturaNav = await page.locator('header.kopf').evaluate((e) => e.getBoundingClientRect().height);
    const caja = await page.locator('#termin-assistent h2').boundingBox();
    expect(caja, 'el título del asistente debe estar en pantalla').not.toBeNull();
    expect(caja!.y, 'no debe quedar bajo la barra fija').toBeGreaterThanOrEqual(alturaNav - 2);
  });

  test('el acceso rápido flotante no ocupa todo el ancho ni tapa el contenido', async ({ page }) => {
    await page.goto('/');
    const boton = page.locator('[data-schnell-schalter]');
    await expect(boton).toBeVisible();

    const caja = (await boton.boundingBox())!;
    const ancho = page.viewportSize()!.width;
    expect(caja.width, 'no es una barra de ancho completo').toBeLessThan(ancho * 0.3);
    expect(caja.width).toBeGreaterThanOrEqual(44);
    expect(caja.height).toBeGreaterThanOrEqual(44);

    // Despliega opciones útiles y se cierra con Escape.
    await expect(boton).toHaveAttribute('aria-expanded', 'false');
    await boton.click();
    await expect(boton).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('link', { name: /Anrufen/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Termin anfragen/ }).last()).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(boton).toHaveAttribute('aria-expanded', 'false');
  });

  test('los objetivos táctiles principales miden al menos 44 px', async ({ page }) => {
    await page.goto('/');
    const selectores = ['.kopf__ruf', '.kopf__termin', '.reiter', '.knopf', '.legende'];
    for (const sel of selectores) {
      const el = page.locator(sel).first();
      if (await el.count() === 0) continue;
      const c = await el.boundingBox();
      if (!c) continue;
      expect(c.height, `${sel} mide ${c.height}px de alto`).toBeGreaterThanOrEqual(43.5);
    }
  });
});

test.describe('Navegación general', () => {
  test('los enlaces principales del encabezado llevan a su página', async ({ page }) => {
    await page.goto('/');
    // La navegación ancha aparece a partir de 60rem; por debajo se usan las pestañas.
    const contenedor = page.viewportSize()!.width >= 960 ? '.kopf__weit' : '.kopf__reiter';
    for (const [nombre, ruta] of [
      ['Wärme', '/leistungen/waerme'],
      ['Bad', '/leistungen/bad'],
      ['Klima', '/leistungen/klima'],
      ['Kundendienst', '/leistungen/kundendienst'],
      ['Betrieb', '/team'],
      ['Kontakt', '/kontakt'],
    ] as const) {
      await page.goto('/');
      await page.locator(contenedor).getByRole('link', { name: nombre, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`${ruta}$`));
    }
  });

  test('ningún enlace interno está roto', async ({ page, request }) => {
    const vistos = new Set<string>();
    for (const ruta of ['/', '/leistungen/waerme', '/team', '/kontakt', '/termin']) {
      await page.goto(ruta);
      const hrefs = await page.locator('a[href^="/"]').evaluateAll(
        (as) => as.map((a) => (a as HTMLAnchorElement).getAttribute('href')!),
      );
      for (const h of hrefs) vistos.add(h.split('#')[0] || '/');
    }
    for (const h of vistos) {
      const r = await request.get(h);
      expect(r.status(), `enlace roto: ${h}`).toBe(200);
    }
  });

  test('el dibujo del corte lleva a cada leistung', async ({ page }) => {
    await page.goto('/');
    for (const [zona, ruta] of [
      ['klima', '/leistungen/klima'],
      ['bad', '/leistungen/bad'],
      ['waerme', '/leistungen/waerme'],
      ['kundendienst', '/leistungen/kundendienst'],
    ] as const) {
      await page.goto('/');
      const enlace = page.locator(`.zone[data-zone="${zona}"]`);
      await expect(enlace).toHaveAttribute('href', ruta);
      await expect(enlace).toHaveAttribute('aria-label', /.{10,}/);
    }
  });
});

test.describe('Textos de producción y afordancias reales', () => {
  const RUTAS = ['/', '/leistungen/waerme', '/leistungen/bad', '/leistungen/klima',
                 '/leistungen/kundendienst', '/team', '/termin', '/kontakt',
                 '/impressum', '/datenschutz'];

  test('no aparece vocabulario interno de proyecto', async ({ page }) => {
    const prohibido = /\bDemo\b|Konzept(entwurf)?|Redesign|alte Website|bisherige Website|Platzhalter|Lorem ipsum|wird sp[äa]ter (angebunden|verbunden)|Vorschau dieser Seite/i;
    for (const ruta of RUTAS) {
      await page.goto(ruta);
      const texto = await page.locator('body').innerText();
      const hallazgo = texto.match(prohibido);
      expect(hallazgo?.[0], `«${hallazgo?.[0]}» en ${ruta}`).toBeUndefined();
    }
  });

  test('no hay controles decorativos: todo lo que parece pulsable actúa', async ({ page }) => {
    for (const ruta of ['/', '/leistungen/bad', '/kontakt', '/team']) {
      await page.goto(ruta);
      const sospechosos = await page.evaluate(() => {
        const malos: string[] = [];
        document.querySelectorAll('button, [role="button"]').forEach((b) => {
          const el = b as HTMLButtonElement;
          if (el.disabled) return;
          const tieneDestino = el.hasAttribute('aria-controls') || el.hasAttribute('data-weiter') ||
            el.hasAttribute('data-zurueck') || el.hasAttribute('data-punkt') ||
            el.hasAttribute('data-halten') || el.hasAttribute('data-senden') ||
            el.hasAttribute('data-zurueck-zu-eins') || el.hasAttribute('data-schnell-schalter') ||
            el.type === 'submit';
          if (!tieneDestino) malos.push(el.outerHTML.slice(0, 90));
        });
        document.querySelectorAll('a').forEach((a) => {
          const h = (a as HTMLAnchorElement).getAttribute('href');
          if (!h || h === '#') malos.push((a as HTMLAnchorElement).outerHTML.slice(0, 90));
        });
        return malos;
      });
      expect(sospechosos, `${ruta}: elementos sin acción`).toHaveLength(0);
    }
  });

  test('las tarjetas de leistung anuncian su acción y la cumplen', async ({ page }) => {
    await page.goto('/leistungen/waerme');
    const tarjeta = page.locator('[data-waehlt="solarthermie"]');
    await expect(tarjeta).toContainText('Termin anfragen');
    await tarjeta.click();
    await page.waitForTimeout(700);
    await expect(page.locator('[data-leistung-eingabe][value="solarthermie"]')).toBeChecked();
  });

  test('los teléfonos son enlaces tel: pulsables', async ({ page }) => {
    await page.goto('/');
    const tel = page.locator('a[href^="tel:"]');
    expect(await tel.count()).toBeGreaterThan(1);
    await expect(tel.first()).toHaveAttribute('href', 'tel:+49620190330');
  });
});

test.describe('Schnellzugriff im Assistenten', () => {
  test('la ventana flotante se retira mientras el asistente está en pantalla', async ({ page }) => {
    await page.goto('/');
    const flotante = page.locator('[data-schnellzugriff]');
    await expect(flotante).not.toHaveClass(/ist-fort/);

    await page.locator('#termin-assistent').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(flotante, 'no debe tapar las tarjetas de selección').toHaveClass(/ist-fort/);

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForTimeout(500);
    await expect(flotante).not.toHaveClass(/ist-fort/);
  });
});
