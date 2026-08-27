import { test, expect, type Page } from '@playwright/test';

/** Pulsa la etiqueta, como haría una persona: el radio está oculto visualmente. */
async function elige(page: Page, atributo: string, valor: string) {
  await page.locator(`label:has([${atributo}][value="${valor}"])`).click();
  await expect(page.locator(`[${atributo}][value="${valor}"]`)).toBeChecked();
}

async function pasoVisible(page: Page): Promise<number> {
  return page.evaluate(() => {
    const s = [...document.querySelectorAll('[data-schritt]')];
    return s.findIndex((e) => !(e as HTMLElement).hidden) + 1;
  });
}

test.describe('Termin-Assistent', () => {
  test('tiene exactamente tres pasos y ningún cuarto de revisión', async ({ page }) => {
    await page.goto('/termin');
    await expect(page.locator('[data-schritt]')).toHaveCount(3);
    await expect(page.locator('[data-glied]')).toHaveCount(3);
    await expect(page.locator('[data-glied="3"]')).toContainText('Prüfen');
  });

  test('el flujo completo funciona y el resumen contiene todo', async ({ page }) => {
    await page.goto('/termin');

    // Paso 1
    expect(await pasoVisible(page)).toBe(1);
    // Sin selección, «Weiter» explica qué falta en vez de bloquearse en silencio.
    await page.click('[data-weiter]');
    await expect(page.locator('[data-fehler="leistung"]')).toBeVisible();
    expect(await pasoVisible(page), 'no avanza sin elegir').toBe(1);

    await elige(page, 'data-bereich-eingabe', 'waerme');
    await elige(page, 'data-leistung-eingabe', 'waermepumpe');
    await expect(page.locator('[data-fehler="leistung"]')).toBeHidden();
    await page.click('[data-weiter]');

    // Paso 2: fecha y hora exactas
    expect(await pasoVisible(page)).toBe(2);
    await expect(page.locator('input#wunsch-datum')).toHaveAttribute('type', 'date');
    await expect(page.locator('input#wunsch-zeit')).toHaveAttribute('type', 'time');
    await page.fill('#wunsch-datum', '2027-03-10'); // miércoles
    await page.fill('#wunsch-zeit', '09:30');
    await page.fill('#alt-datum', '2027-03-11');
    await page.fill('#alt-zeit', '14:00');
    await page.fill('#anliegen', 'Bestandsanlage von 2009.');
    await page.click('[data-weiter]');

    // Paso 3: resumen en vivo
    expect(await pasoVisible(page)).toBe(3);
    await page.fill('#name', 'Erika Mustermann');
    await page.fill('#email', 'erika@example.org');
    await page.fill('#telefon', '06201 123456');

    const resumen = page.locator('[data-pruefblatt]');
    await expect(resumen.locator('[data-p="bereich"]')).toHaveText('Wärme');
    await expect(resumen.locator('[data-p="leistung"]')).toHaveText('Wärmepumpe');
    await expect(resumen.locator('[data-p="wunsch"]')).toContainText('10.03.2027');
    await expect(resumen.locator('[data-p="wunsch"]')).toContainText('09:30');
    await expect(resumen.locator('[data-p="alt"]')).toContainText('11.03.2027');
    await expect(resumen.locator('[data-p="name"]')).toHaveText('Erika Mustermann');
    await expect(resumen.locator('[data-p="email"]')).toHaveText('erika@example.org');
    await expect(resumen.locator('[data-p="telefon"]')).toHaveText('06201 123456');
    await expect(resumen.locator('[data-p="anliegen"]')).toContainText('Bestandsanlage');
  });

  test('el resumen se actualiza en vivo sin pulsar nada', async ({ page }) => {
    await page.goto('/termin?bereich=bad&leistung=komplettbad');
    await page.click('[data-weiter]');
    await page.fill('#wunsch-datum', '2027-03-10');
    await page.fill('#wunsch-zeit', '10:00');
    await page.click('[data-weiter]');

    await page.fill('#name', 'Anna');
    await expect(page.locator('[data-p="name"]')).toHaveText('Anna');
    await page.fill('#name', 'Anna Beispiel');
    await expect(page.locator('[data-p="name"]')).toHaveText('Anna Beispiel');
  });

  test('la validación devuelve el foco al campo con error', async ({ page }) => {
    await page.goto('/termin?bereich=klima&leistung=klima-wohnen');
    await page.click('[data-weiter]');
    await page.fill('#wunsch-datum', '2027-03-10');
    await page.fill('#wunsch-zeit', '10:00');
    await page.click('[data-weiter]');

    await page.click('[data-senden]');
    await expect(page.locator('[data-fehler="name"]')).toBeVisible();
    await expect(page.locator('#name')).toBeFocused();
    await expect(page.locator('#name')).toHaveAttribute('aria-invalid', 'true');

    await page.fill('#name', 'Test Person');
    await page.click('[data-senden]');
    await expect(page.locator('#email')).toBeFocused();

    await page.fill('#email', 'kein-email');
    await page.click('[data-senden]');
    await expect(page.locator('[data-fehler="email"]')).toBeVisible();

    await page.fill('#email', 'gut@example.org');
    await page.click('[data-senden]');
    await expect(page.locator('[data-fehler="zustimmung"]')).toBeVisible();
  });

  test('rechaza fin de semana y horas fuera del horario de oficina', async ({ page }) => {
    await page.goto('/termin?bereich=waerme&leistung=brennwert');
    await page.click('[data-weiter]');

    await page.fill('#wunsch-datum', '2027-03-13'); // sábado
    await page.fill('#wunsch-zeit', '10:00');
    await page.click('[data-weiter]');
    await expect(page.locator('[data-fehler="wunsch"]')).toContainText('Montag bis Freitag');

    await page.fill('#wunsch-datum', '2027-03-10');
    await page.fill('#wunsch-zeit', '19:00');
    await page.click('[data-weiter]');
    await expect(page.locator('[data-fehler="wunsch"]')).toContainText('07:30');
  });

  test('nunca muestra un envío satisfactorio falso', async ({ page }) => {
    await page.goto('/termin?bereich=kundendienst&leistung=wartung');
    await page.click('[data-weiter]');
    await page.fill('#wunsch-datum', '2027-03-10');
    await page.fill('#wunsch-zeit', '11:00');
    await page.click('[data-weiter]');
    await page.fill('#name', 'Max Beispiel');
    await page.fill('#email', 'max@example.org');
    await page.check('[data-zustimmung]');
    await page.click('[data-senden]');

    const res = page.locator('[data-ergebnis]');
    await expect(res).toBeVisible();
    await expect(res).toHaveAttribute('data-art', 'fehler');
    await expect(res).not.toContainText(/erfolgreich versendet|Vielen Dank für Ihre Buchung/i);
    // Ofrece caminos reales que sí funcionan.
    await expect(res.getByRole('link', { name: /anrufen/i })).toBeVisible();
    const correo = res.getByRole('link', { name: /E-Mail/i });
    await expect(correo).toHaveAttribute('href', /^mailto:mail@franzmann-service\.de\?subject=/);
    const href = await correo.getAttribute('href');
    expect(decodeURIComponent(href!)).toContain('Wartung der Heizungsanlage');
  });

  test('el contexto elegido se mantiene visible con opción de cambiar', async ({ page }) => {
    await page.goto('/termin?bereich=bad&leistung=barrierefrei');
    await page.click('[data-weiter]');

    const banda = page.locator('[data-wahlband]');
    await expect(banda).toBeVisible();
    await expect(banda.locator('[data-wahlband-bereich]')).toHaveText('Bad');
    await expect(banda.locator('[data-wahlband-leistung]')).toHaveText('Barrierefreies Bad');

    await page.click('[data-zurueck-zu-eins]');
    expect(await pasoVisible(page)).toBe(1);
    await expect(page.locator('[data-leistung-eingabe][value="barrierefrei"]')).toBeChecked();
  });

  test('no repite círculos de progreso dentro de cada pantalla', async ({ page }) => {
    await page.goto('/termin');
    // La única indicación de progreso es la cadena de pasos.
    await expect(page.locator('[data-kette]')).toHaveCount(1);
    const marcas = await page.locator('[data-schritt="1"]').getByText(/^0?1$/).count();
    expect(marcas, 'no debe repetirse el número de paso dentro del paso').toBe(0);
  });
});

test.describe('Enlace profundo desde una leistung', () => {
  for (const [slug, sub, etiqueta, bereich] of [
    ['waerme', 'waermepumpe', 'Wärmepumpe', 'Wärme'],
    ['bad', 'komplettbad', 'Komplette Badsanierung', 'Bad'],
    ['klima', 'klima-wohnen', 'Klimaanlage für Wohnräume', 'Klima'],
    ['kundendienst', 'stoerung', 'Störung — dringend', 'Kundendienst'],
  ] as const) {
    test(`${slug}: la tarjeta preselecciona «${etiqueta}» sin salir de la página`, async ({ page }) => {
      await page.goto(`/leistungen/${slug}`);
      const urlAntes = page.url();

      await page.click(`[data-waehlt="${sub}"]`);
      await page.waitForTimeout(700);

      expect(page.url(), 'el asistente está en la misma página').toBe(urlAntes);
      await expect(page.locator(`[data-leistung-eingabe][value="${sub}"]`)).toBeChecked();
      await expect(page.locator(`[data-bereich-eingabe][value="${slug}"]`)).toBeChecked();

      await page.click('[data-weiter]');
      await expect(page.locator('[data-wahlband-leistung]')).toHaveText(etiqueta);
      await expect(page.locator('[data-wahlband-bereich]')).toHaveText(bereich);
    });
  }

  test('el asistente de la subpágina llega ya con el bereich puesto', async ({ page }) => {
    await page.goto('/leistungen/klima');
    await expect(page.locator('[data-bereich-eingabe][value="klima"]')).toBeChecked();
    await expect(page.locator('[data-leistungsfeld]')).toBeVisible();
  });
});
