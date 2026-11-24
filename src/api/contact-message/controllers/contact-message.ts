/**
 * contact-message controller
 */

import { factories } from '@strapi/strapi';

const UID = 'api::contact-message.contact-message';
const EMAIL_RE = /^[^@]+@[^@]+\.[^@]+$/;

export default factories.createCoreController(UID, ({ strapi }) => ({
  /**
   * Public contact-form submission. Validates input, persists a
   * ContactMessage row and returns a clean acknowledgement.
   */
  async submit(ctx) {
    const body = ctx.request.body ?? {};
    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').trim().toLowerCase();
    const subject = String(body.subject ?? '').trim();
    const message = String(body.message ?? '').trim();

    if (!name) return ctx.badRequest('Your name is required.');
    if (!EMAIL_RE.test(email)) {
      return ctx.badRequest('A valid email address is required.');
    }
    if (!message) return ctx.badRequest('A message is required.');

    await strapi.documents(UID).create({
      data: { name, email, subject: subject || null, message },
      status: 'published',
    });

    ctx.status = 201;
    ctx.body = { data: { ok: true } };
  },
}));
