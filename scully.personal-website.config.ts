import '@scullyio/scully-plugin-puppeteer';
import {
  ScullyConfig,
  setPluginConfig,
  RouteTypes,
  HandledRoute,
  log,
  green,
  logError,
  red,
  yellow,
  registerPlugin,
} from '@scullyio/scully';
import { DisableAngular } from 'scully-plugin-disable-angular';
import { JSDOM } from 'jsdom';

setPluginConfig(DisableAngular, 'render', {
  removeState: true,
});

setPluginConfig('md', { enableSyntaxHighlighting: true });

registerPlugin('render', 'addLinksToHeaders', addLinksToHeaders);

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'personal-website',
  distFolder: './dist/personal-website',
  outDir: './dist/static',
  defaultPostRenderers: [
    DisableAngular,
    'seoHrefOptimise',
    'addLinksToHeaders',
  ],
  routes: {
    '/blog/:title': {
      type: RouteTypes.contentFolder,
      title: {
        folder: './content/blog',
      },
    },
  },
};

async function addLinksToHeaders(
  html?: string,
  route?: HandledRoute,
): Promise<string> {
  if (!(html && route)) return html ?? '';

  // only apply to blog posts
  if (!route.route.startsWith('/blog/')) return html;

  try {
    const dom = new JSDOM(html);
    const { window } = dom;

    const headers = window.document.querySelectorAll('h1, h2, h3, h4, h5, h6');

    headers.forEach((header) => {
      if (header.id) {
        // create link element
        const parent = header.parentNode!;
        const link = window.document.createElement('a');
        link.href = `${route.route}/#${header.id}`;

        // manipulate dom
        parent.replaceChild(link, header);
        link.appendChild(header);
      }
    });

    log(green(`Added heading links for ${route.route}`));
    return dom.serialize();
  } catch (e: unknown) {
    logError(
      `${red('Issue creating header links for')} ${yellow(route.route)}\n`,
      red((e as Error).stack),
    );
  }

  return html;
}
