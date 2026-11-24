/**
 * subscription-email controller
 */

import { factories } from '@strapi/strapi';

const UID = 'api::subscription-email.subscription-email';
// Same shape enforced by the schema's `regex`.
const EMAIL_RE = /^[^@]+@[^@]+\.[^@]+$/;

export default factories.createCoreController(UID, ({ strapi }) => ({
  /**
   * Public newsletter sign-up. Validates the address, dedupes by email and
   * persists a SubscriptionEmail row. Never echoes internal fields back.
   */
  async subscribe(ctx) {
    const email = String(ctx.request.body?.email ?? '').trim().toLowerCase();

    if (!EMAIL_RE.test(email)) {
      return ctx.badRequest('A valid email address is required.');
    }

    const existing = await strapi.documents(UID).findMany({
      filters: { email: { $eqi: email } },
      limit: 1,
    });
    if (existing.length > 0) {
      ctx.body = { data: { email, already: true } };
      return;
    }

    try {
      await strapi.documents(UID).create({ data: { email }, status: 'published' });
    } catch (err) {
      // The column has a unique index; a concurrent request could insert the
      // same email between our check and create. Treat that as "already on the
      // list" rather than a 500.
      if (String((err as Error)?.message ?? '').toLowerCase().includes('unique')) {
        ctx.body = { data: { email, already: true } };
        return;
      }
      throw err;
    }

    ctx.status = 201;
    ctx.body = { data: { email } };
  },
}));
