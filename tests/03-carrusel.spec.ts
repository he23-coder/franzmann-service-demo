import { test, expect, type Page } from '@playwright/test';

/**
 * El carrusel se prueba en el banco de pruebas (/pruefstand/karussell), que
 * sólo existe en compilaciones de prueba y contiene varias diapositivas.
 * En la web publicada hay una sola reseña verificable, por lo que el
 * carrusel no muestra controles: se comprueba aparte, más abajo.
 */

const BANCO = '/pruefstand/karussell';

async function activa(page: Page): Promise<number> {
  return page.evaluate(() => {
    const f = [...document.querySelectorAll('[data-folie]')];
    return f.findIndex((e) => !(e as HTMLElement).hidden);
  });
}

test.describe('Carrusel — mecánica completa', () => {
  test.beforeEach(() => {
    test.skip(test.info().project.name === 'tablet', 'basta en móvil y escritorio');
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(BANCO);
    await page.waitForLoadState('networkidle');
  });

  test('1 · carga y muestra la primera diapositiva', async ({ page }) => {
    await expect(page.locator('[data-folie="0"]')).toBeVisible();
    expect(await activa(page)).toBe(0);
  });

  test('2 · avanza automáticamente', async ({ page }) => {
    const inicial = await activa(page);
    await expect.poll(() => activa(page), { timeout: 26_000 }).not.toBe(inicial);
  });

  test('3 · el botón siguiente funciona', async ({ page }) => {
    await page.click('[data-weiter]');
    expect(await activa(page)).toBe(1);
  });

  test('4 · el botón anterior funciona', async ({ page }) => {
    await page.click('[data-weiter]');
    await page.click('[data-zurueck]');
    expect(await activa(page)).toBe(0);
  });

  test('5 · los indicadores funcionan', async ({ page }) => {
    await page.click('[data-punkt="2"]');
    expect(await activa(page)).toBe(2);
    await expect(page.locator('[data-punkt="2"]')).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('[data-punkt="0"]')).toHaveAttribute('aria-selected', 'false');
  });

  test('6 · tras usar una flecha vuelve a avanzar solo', async ({ page }) => {
    await page.click('[data-weiter]');
    const tras = await activa(page);
    await expect.poll(() => activa(page), { timeout: 26_000 }).not.toBe(tras);
  });

  test('7 · tras usar un indicador vuelve a avanzar solo', async ({ page }) => {
    await page.click('[data-punkt="1"]');
    const tras = await activa(page);
    await expect.poll(() => activa(page), { timeout: 26_000 }).not.toBe(tras);
  });

  test('8 · el hover no lo congela permanentemente', async ({ page }) => {
    await page.hover('[data-buehne]');
    await page.waitForTimeout(600);
    await page.mouse.move(0, 0); // salir del área
    const tras = await activa(page);
    await expect.poll(() => activa(page), { timeout: 26_000 }).not.toBe(tras);
  });

  test('9 · pausa detiene el avance automático', async ({ page }) => {
    await page.click('[data-halten]');
    await expect(page.locator('[data-halten]')).toHaveAttribute('aria-pressed', 'true');
    const tras = await activa(page);
    await page.waitForTimeout(13_000);
    expect(await activa(page), 'no debe cambiar mientras está en pausa').toBe(tras);
  });

  test('10 · Play lo reactiva', async ({ page }) => {
    await page.click('[data-halten]');           // pausa
    await page.click('[data-halten]');           // reanudar
    await expect(page.locator('[data-halten]')).toHaveAttribute('aria-pressed', 'false');
    const tras = await activa(page);
    await expect.poll(() => activa(page), { timeout: 26_000 }).not.toBe(tras);
  });

  test('11 · la altura sigue a la diapositiva activa', async ({ page }) => {
    await page.click('[data-halten]'); // pausar para medir con calma
    await page.click('[data-punkt="0"]');
    const altaCorta = (await page.locator('[data-band]').boundingBox())!.height;
    await page.click('[data-punkt="1"]');       // diapositiva larga
    const altaLarga = (await page.locator('[data-band]').boundingBox())!.height;
    await page.click('[data-punkt="0"]');
    const otraVezCorta = (await page.locator('[data-band]').boundingBox())!.height;

    expect(altaLarga, 'la larga debe ser más alta').toBeGreaterThan(altaCorta + 20);
    expect(otraVezCorta, 'al volver debe encoger de nuevo').toBeLessThan(altaLarga - 20);
  });

  test('12 · sin desbordamiento horizontal', async ({ page }) => {
    for (const i of [0, 1, 2]) {
      await page.click(`[data-punkt="${i}"]`);
      const exceso = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(exceso).toBeLessThanOrEqual(1);
    }
  });

  test('13 · navegación por teclado', async ({ page }) => {
    await page.locator('[data-weiter]').focus();
    await page.locator('[data-buehne]').press('ArrowRight');
    expect(await activa(page)).toBe(1);
    await page.locator('[data-buehne]').press('ArrowLeft');
    expect(await activa(page)).toBe(0);
  });

  test('16 · con movimiento reducido no arranca solo, pero los mandos siguen', async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce' });
    const p = await ctx.newPage();
    await p.goto(BANCO);
    await p.waitForLoadState('networkidle');

    await expect(p.locator('[data-halten]')).toHaveAttribute('aria-pressed', 'true');
    const inicio = await activa(p);
    await p.waitForTimeout(12_000);
    expect(await activa(p), 'sin autoplay con reduced motion').toBe(inicio);

    await p.click('[data-weiter]');
    expect(await activa(p), 'los mandos siguen funcionando').toBe(1);
    await ctx.close();
  });

  test('ARIA del carrusel', async ({ page }) => {
    await expect(page.locator('[data-buehne]')).toHaveAttribute('aria-roledescription', 'Karussell');
    await expect(page.locator('[data-ansage]')).toHaveAttribute('aria-live', 'polite');
    await expect(page.locator('[data-punkt="0"]')).toHaveAttribute('role', 'tab');
  });
});

test.describe('Sección de reseñas publicada', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#stimmen').scrollIntoViewIfNeeded();
  });

  test('14 · el enlace a la fuente de cada reseña es válido', async ({ page, request }) => {
    const enlaces = page.locator('#stimmen .protokoll__quelle');
    const total = await enlaces.count();
    expect(total).toBeGreaterThan(0);

    for (let i = 0; i < total; i++) {
      const href = await enlaces.nth(i).getAttribute('href');
      expect(href, 'debe apuntar a la plataforma real, no a una búsqueda').toMatch(
        /^https:\/\/www\.11880\.com\/branchenbuch\//,
      );
      expect(href).not.toMatch(/google\.[a-z.]+\/search|maps\/search/);
      await expect(enlaces.nth(i)).toHaveAttribute('rel', /noopener/);
    }
  });

  test('15 · el CTA para valorar apunta al perfil de Google verificado', async ({ page }) => {
    const boton = page.getByRole('link', { name: /Auf Google bewerten/ });
    await expect(boton).toBeVisible();
    const href = await boton.getAttribute('href');
    // Perfil facilitado por el propio negocio; kgmid resuelto de su enlace de compartir.
    expect(href).toBe('https://www.google.com/search?kgmid=/g/1tg9m25r&q=Hermann+Franzmann+GmbH');
    expect(href, 'nunca una búsqueda genérica sin identificador').toContain('kgmid=');
    await expect(boton).toHaveAttribute('rel', /noopener/);
    await expect(boton).toHaveAttribute('target', '_blank');
  });

  test('el enlace para leer las reseñas de Google usa el mismo perfil', async ({ page }) => {
    const boton = page.getByRole('link', { name: /Bewertungen bei Google lesen/ });
    await expect(boton).toBeVisible();
    await expect(boton).toHaveAttribute('href', /kgmid=\/g\/1tg9m25r/);
  });

  test('no se afirma ninguna nota de Google que no se haya podido leer', async ({ page }) => {
    const texto = await page.locator('#stimmen').innerText();
    // La única nota mostrada es la de 11880, con su fuente declarada.
    // innerText devuelve el texto ya transformado por CSS (versalitas).
    expect(texto).toMatch(/Quelle:\s*11880\.com/i);
    expect(texto).not.toMatch(/[0-9],[0-9]\s*(von 5|Sterne)[^]{0,40}Google/i);
    expect(texto).not.toMatch(/Google-Bewertung(en)?:\s*[0-9]/i);
  });

  test('la reseña mostrada trae autor, fecha, valoración y fuente', async ({ page }) => {
    const p = page.locator('#stimmen .protokoll').first();
    await expect(p.getByText('Gast')).toBeVisible();
    await expect(p.getByText('22. Januar 2024')).toBeVisible();
    await expect(p.locator('.protokoll__zeilen dd').filter({ hasText: '11880.com' })).toBeVisible();
    await expect(p.locator('[aria-label="Bewertung 5 von 5"]')).toBeVisible();
  });

  test('con una sola reseña no aparecen mandos sin función', async ({ page }) => {
    const folias = await page.locator('#stimmen [data-folie]').count();
    if (folias === 1) {
      await expect(page.locator('#stimmen [data-weiter]')).toHaveCount(0);
      await expect(page.locator('#stimmen [data-punkt]')).toHaveCount(0);
      await expect(page.locator('#stimmen [data-halten]')).toHaveCount(0);
    } else {
      await expect(page.locator('#stimmen [data-weiter]')).toBeVisible();
    }
  });
});
