import type { Core } from '@strapi/strapi';
import seed from './seed';
import { initWebsocket } from './websocket';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Bind the Socket.IO server to Strapi's HTTP server so connected readers can
    // be notified in real time when a new article is published (see article
    // lifecycles).
    initWebsocket(strapi);

    try {
      await seed(strapi);
    } catch (err) {
      strapi.log.error('[seed] Failed to seed data');
      strapi.log.error(err);
    }
  },
};
