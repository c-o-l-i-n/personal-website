import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';

const baseUrl = process.env.BASE_URL ?? 'https://colinaw.com';

const canvas = { width: 1800, height: 900 };

const themes = {
  light: {
    wallpaper: `
      radial-gradient(circle at 10% 15%, #fbcfe8 0, transparent 45%),
      radial-gradient(circle at 90% 10%, #c7d2fe 0, transparent 50%),
      radial-gradient(circle at 75% 95%, #fed7aa 0, transparent 45%),
      radial-gradient(circle at 5% 95%, #bae6fd 0, transparent 50%),
      #e9d5ff`,
    titlebar: '#ececec',
    titlebarBorder: '#d4d4d4',
    url: '#fff',
    urlText: '#444',
  },
  dark: {
    wallpaper: `
      radial-gradient(circle at 10% 15%, #831843 0, transparent 45%),
      radial-gradient(circle at 90% 10%, #312e81 0, transparent 50%),
      radial-gradient(circle at 75% 95%, #7c2d12 0, transparent 45%),
      radial-gradient(circle at 5% 95%, #0c4a6e 0, transparent 50%),
      #1e1b4b`,
    titlebar: '#2a2a2e',
    titlebarBorder: '#111',
    url: '#3a3a3f',
    urlText: '#ccc',
  },
};

const windows = [
  {
    path: '/',
    viewport: { width: 1280, height: 800 },
    placement: { left: 30, top: 130, width: 1000, depth: 0 },
  },
  {
    path: '/blog/angular-ai-chatbot',
    scrollTo: '#streaming-the-response',
    viewport: { width: 860, height: 720 },
    placement: { left: 790, top: 90, width: 720, depth: 80 },
  },
  {
    path: '/',
    scrollTo: '#projects',
    viewport: { width: 390, height: 760 },
    placement: { left: 1370, top: 190, width: 310, depth: 180 },
  },
];

const browser = await chromium.launch();

const capture = async (win, theme) => {
  const page = await browser.newPage({
    viewport: win.viewport,
    deviceScaleFactor: 2,
    colorScheme: theme,
  });
  await page.goto(baseUrl + win.path, { waitUntil: 'networkidle' });
  if (win.scrollTo) {
    await page.evaluate((selector) => {
      document
        .querySelector(selector)
        .scrollIntoView({ block: 'start', behavior: 'instant' });
      window.scrollBy({ top: -12, behavior: 'instant' });
    }, win.scrollTo);
  }
  const image = (await page.screenshot()).toString('base64');
  await page.close();
  return image;
};

const windowHtml = (win, image) => {
  const { left, top, width, depth } = win.placement;
  return `
    <div class="window" style="left: ${left}px; top: ${top}px; width: ${width}px; transform: translateZ(${depth}px);">
      <div class="titlebar">
        <div class="lights"><span></span><span></span><span></span></div>
        <div class="url">colinaw.com${win.path === '/' ? '' : win.path}</div>
      </div>
      <img src="data:image/png;base64,${image}" />
    </div>`;
};

const sceneHtml = (theme, images) => {
  const t = themes[theme];
  return `
    <style>
      body { margin: 0; background: transparent; }
      .frame {
        width: ${canvas.width}px;
        height: ${canvas.height}px;
        border-radius: 28px;
        overflow: hidden;
        background: ${t.wallpaper};
        perspective: 2600px;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      }
      .scene {
        position: relative;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        transform: rotateX(3deg) rotateY(-3deg) scale(0.92);
      }
      .window {
        position: absolute;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 0 0 1px rgb(0 0 0 / 0.15), 0 40px 80px rgb(0 0 0 / 0.35);
      }
      .titlebar {
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        background: ${t.titlebar};
        border-bottom: 1px solid ${t.titlebarBorder};
      }
      .lights { position: absolute; left: 14px; display: flex; gap: 8px; }
      .lights span { width: 12px; height: 12px; border-radius: 50%; }
      .lights span:nth-child(1) { background: #ff5f57; }
      .lights span:nth-child(2) { background: #febc2e; }
      .lights span:nth-child(3) { background: #28c840; }
      .url {
        font-size: 12px;
        padding: 4px 24px;
        border-radius: 6px;
        background: ${t.url};
        color: ${t.urlText};
      }
      img { display: block; width: 100%; }
    </style>
    <div class="frame">
      <div class="scene">
        ${windows.map((win, i) => windowHtml(win, images[i])).join('')}
      </div>
    </div>`;
};

for (const theme of Object.keys(themes)) {
  const images = [];
  for (const win of windows) images.push(await capture(win, theme));

  const page = await browser.newPage({
    viewport: canvas,
    deviceScaleFactor: 2,
  });
  await page.setContent(sceneHtml(theme, images));
  const png = await page.screenshot({ omitBackground: true });
  const webp = await page.evaluate(async (png) => {
    const bytes = Uint8Array.from(atob(png), (c) => c.charCodeAt(0));
    const bitmap = await createImageBitmap(new Blob([bytes]));
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    canvas.getContext('2d').drawImage(bitmap, 0, 0);
    const blob = await canvas.convertToBlob({
      type: 'image/webp',
      quality: 0.9,
    });
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    await new Promise((resolve) => (reader.onload = resolve));
    return reader.result.split(',')[1];
  }, png.toString('base64'));
  await writeFile(
    `.github/images/screenshot-${theme}.webp`,
    Buffer.from(webp, 'base64'),
  );
  await page.close();
}

await browser.close();
