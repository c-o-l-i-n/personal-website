import '@scullyio/scully-plugin-puppeteer';
import { ScullyConfig, setPluginConfig, RouteTypes } from '@scullyio/scully';
import { DisableAngular } from 'scully-plugin-disable-angular';

setPluginConfig(DisableAngular, 'render', {
  removeState: true,
});

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'personal-website',
  distFolder: './dist/personal-website',
  outDir: './dist/static',
  defaultPostRenderers: [DisableAngular],
  routes: {
    '/blog/:title': {
      type: RouteTypes.contentFolder,
      title: {
        folder: './content/blog',
      },
    },
  },
};
