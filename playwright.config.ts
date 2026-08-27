import { defineConfig, devices } from '@playwright/test';

const CHROMIUM = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 4,
  reporter: [['list']],
  timeout: 45_000,
  expect: { timeout: 8_000 },
  use: {
    baseURL: process.env.BASIS_URL ?? 'http://127.0.0.1:4321',
    trace: 'off',
    screenshot: 'off',
    video: 'off',
    launchOptions: { executablePath: CHROMIUM, args: ['--no-sandbox', '--disable-dev-shm-usage'] },
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'tablet',  use: { ...devices['Desktop Chrome'], viewport: { width: 834, height: 1112 }, hasTouch: true } },
    { name: 'mobil',   use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true } },
  ],
  webServer: process.env.BASIS_URL
    ? undefined
    : {
        command: 'node scripts/static-server.mjs',
        url: 'http://127.0.0.1:4321/',
        reuseExistingServer: true,
        timeout: 30_000,
      },
});
