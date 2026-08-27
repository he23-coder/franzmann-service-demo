import { test, expect } from '@playwright/test';

const ANCHOS = [320, 360, 390, 430, 768, 1024, 1440];
const RUTAS = ['/', '/leistungen/bad', '/termin', '/team', '/kontakt'];

test.describe('Sin desbordamiento horizontal', () => {
  test.beforeEach(() => {
    test.skip(test.info().project.name !== 'mobil', 'basta ejecutarlo en un tamaño');
  });

  for (const ancho of ANCHOS) {
    test(`ancho ${ancho}px`, async ({ page }) => {
      await page.setViewportSize({ width: ancho, height: 900 });
      for (const ruta of RUTAS) {
        await page.goto(ruta);
        await page.waitForLoadState('networkidle');
        const exceso = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(exceso, `${ruta} a ${ancho}px se desborda ${exceso}px`).toBeLessThanOrEqual(1);
      }
    });
  }

  test('móvil en horizontal (landscape) sin desbordamiento', async ({ page }) => {
    await page.setViewportSize({ width: 844, height: 390 });
    for (const ruta of RUTAS) {
      await page.goto(ruta);
      const exceso = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(exceso, `${ruta} en horizontal`).toBeLessThanOrEqual(1);
    }
  });
});
