import { test, expect } from '@playwright/test';

const RUTAS = [
  '/', '/leistungen/waerme', '/leistungen/bad', '/leistungen/klima',
  '/leistungen/kundendienst', '/team', '/termin', '/kontakt',
  '/impressum', '/datenschutz',
];

test.describe('Carga de páginas y cabeceras HTTP', () => {
  for (const ruta of RUTAS) {
    test(`${ruta} responde 200 y trae X-Robots-Tag`, async ({ page }) => {
      const respuesta = await page.goto(ruta);
      expect(respuesta?.status(), `estado de ${ruta}`).toBe(200);

      const cabeceras = respuesta!.headers();
      expect(cabeceras['x-robots-tag']).toBe('noindex, nofollow, noarchive');
      expect(cabeceras['x-content-type-options']).toBe('nosniff');
      expect(cabeceras['referrer-policy']).toBe('strict-origin-when-cross-origin');
      expect(cabeceras['content-security-policy']).toContain("default-src 'self'");

      // Cada página tiene exactamente un h1 y un título propio.
      await expect(page.locator('h1')).toHaveCount(1);
      const titulo = await page.title();
      expect(titulo.length).toBeGreaterThan(15);
    });
  }

  test('la página 404 responde 404 y ofrece salidas', async ({ page }) => {
    const r = await page.goto('/esta-ruta-no-existe');
    expect(r?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('gibt es nicht');
    await expect(page.getByRole('link', { name: 'Zur Startseite' })).toBeVisible();
  });

  test('la API rechaza GET y no finge un envío correcto', async ({ request }) => {
    const get = await request.get('/api/termin');
    expect(get.status()).toBe(405);

    const post = await request.post('/api/termin', { data: { name: 'x' } });
    // Sin transporte de correo configurado nunca se devuelve un éxito.
    expect(post.ok()).toBeFalsy();
    const cuerpo = await post.json();
    expect(cuerpo.ok).toBe(false);
    expect(String(cuerpo.nachricht)).not.toMatch(/erfolgreich|gesendet|eingegangen/i);
  });

  test('no se cargan recursos de terceros', async ({ page }) => {
    const externos: string[] = [];
    page.on('request', (r) => {
      const u = new URL(r.url());
      if (!['127.0.0.1', 'localhost'].includes(u.hostname)) externos.push(r.url());
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(externos, `peticiones externas: ${externos.join(', ')}`).toHaveLength(0);
  });

  test('sin errores de consola en la portada', async ({ page }) => {
    const errores: string[] = [];
    page.on('console', (m) => { if (m.type() === 'error') errores.push(m.text()); });
    page.on('pageerror', (e) => errores.push(String(e)));
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(errores).toHaveLength(0);
  });
});
