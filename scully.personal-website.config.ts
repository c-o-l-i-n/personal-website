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
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-bash';

setPluginConfig(DisableAngular, 'render', {
  removeState: true,
});

setPluginConfig('md', { enableSyntaxHighlighting: true });

registerPlugin('postProcessByHtml', 'processBlogPostHtml', processBlogPostHtml);

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'personal-website',
  distFolder: './dist/personal-website',
  outDir: './dist/static',
  defaultPostRenderers: [
    DisableAngular,
    'seoHrefOptimise',
    'processBlogPostHtml',
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

async function processBlogPostHtml(
  html?: string,
  route?: HandledRoute,
): Promise<string> {
  if (!(html && route)) return html ?? '';

  // only apply to blog posts
  if (!route.route.startsWith('/blog/')) return html;

  try {
    // create link tags for code prefixed with `{code-link}`
    html = html.replace(
      /\{code-link\}\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2">$1</a>',
    );

    const dom = new JSDOM(html);
    const { window } = dom;

    const links = window.document.querySelectorAll('a');
    const headers = window.document.querySelectorAll('h1, h2, h3, h4, h5, h6');

    const hashLinkPrefix = 'about:blank#';

    links.forEach((link) => {
      if (link.href.startsWith('http')) {
        // open external links in a new tab
        link.target = '_blank';
        link.rel = 'noreferrer noopener';
      } else if (link.href.startsWith(hashLinkPrefix)) {
        // attach hash links to this route
        link.href = `${route.route}/${link.href.substring(
          hashLinkPrefix.length - 1,
        )}`;
      }
    });

    // add hash links to headers
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

    log(green(`Processed blog post HTML for ${route.route}`));
    return dom.serialize();
  } catch (e: unknown) {
    logError(
      `${red('Issue processing blog post HTML for')} ${yellow(route.route)}\n`,
      red((e as Error).stack),
    );
  }

  return html;
}
