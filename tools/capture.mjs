import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const port = 4173;
const url = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1', '--port', String(port)], {
  stdio: 'ignore',
  windowsHide: true,
});

const waitForServer = async () => {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error('Timed out waiting for the Vite server.');
};

try {
  await waitForServer();
  await mkdir(new URL('../screenshots/', import.meta.url), { recursive: true });
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true,
  });

  for (const config of [
    { name: 'hagere-home-desktop.png', width: 1440, height: 1000, mobile: false },
    { name: 'hagere-home-mobile.png', width: 390, height: 844, mobile: true },
  ]) {
    const page = await browser.newPage({
      viewport: { width: config.width, height: config.height },
      deviceScaleFactor: 1,
      isMobile: config.mobile,
    });
    const errors = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));

    await page.goto(url, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      document.querySelectorAll('.reveal').forEach((element) => element.classList.add('revealed'));
      document.querySelectorAll('img[loading="lazy"]').forEach((image) => { image.loading = 'eager'; });
      await Promise.all([...document.images].map((image) => image.complete ? Promise.resolve() : new Promise((resolve) => {
        image.addEventListener('load', resolve, { once: true });
        image.addEventListener('error', resolve, { once: true });
      })));
    });
    await page.waitForTimeout(250);

    const layout = await page.evaluate(() => ({
      viewportWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      documentHeight: document.documentElement.scrollHeight,
      overflowElements: [...document.querySelectorAll('body *')]
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return { selector: `${element.tagName.toLowerCase()}.${[...element.classList].join('.')}`, left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) };
        })
        .filter((item) => item.left < -1 || item.right > document.documentElement.clientWidth + 1)
        .sort((a, b) => b.right - a.right)
        .slice(0, 12),
    }));
    await page.screenshot({
      path: new URL(`../screenshots/${config.name}`, import.meta.url).pathname.replace(/^\/(.:)/, '$1'),
      fullPage: true,
    });
    console.log(`${config.name}: ${JSON.stringify(layout)} consoleErrors=${errors.length}`);
    if (errors.length) console.log(errors.join('\n'));
    if (layout.scrollWidth > layout.viewportWidth + 1) {
      throw new Error(`${config.name} has horizontal overflow: ${layout.scrollWidth}px > ${layout.viewportWidth}px`);
    }
    await page.close();
  }

  const interactionPage = await browser.newPage({ viewport: { width: 1024, height: 800 } });
  await interactionPage.goto(url, { waitUntil: 'networkidle' });
  await interactionPage.locator('[data-menu-trigger]:visible').first().click();
  await interactionPage.locator('[data-menu-dialog][open]').waitFor();
  const menuCardCount = await interactionPage.locator('.menu-item').count();
  console.log(`Menu dialog rendered ${menuCardCount} items.`);
  if (menuCardCount !== 36) throw new Error(`Expected 36 Hagere menu items, found ${menuCardCount}.`);
  await interactionPage.locator('[data-menu-close]').click();
  await browser.close();
} finally {
  server.kill();
}
