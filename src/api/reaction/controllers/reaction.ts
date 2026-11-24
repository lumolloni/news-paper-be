/**
 * Article reactions. One reaction per user per article; clicking the same type
 * again toggles it off. Counts are public; a logged-in user also sees their own
 * current choice.
 */
import { factories } from '@strapi/strapi';

const TYPES = ['like', 'love', 'insightful', 'sad', 'angry'] as const;
type ReactionType = (typeof TYPES)[number];

const UID = 'api::reaction.reaction';

async function articleIdFromDocumentId(strapi, documentId: string): Promise<number | null> {
  if (!documentId) return null;
  const article = await strapi
    .documents('api::article.article')
    .findOne({ documentId, fields: ['id'] });
  return (article as { id?: number } | null)?.id ?? null;
}

async function buildSummary(strapi, articleId: number, userId?: number) {
  const rows: Array<{ type: ReactionType }> = await strapi.db.query(UID).findMany({
    where: { article: articleId },
    select: ['type'],
  });

  const counts: Record<ReactionType, number> = {
    like: 0,
    love: 0,
    insightful: 0,
    sad: 0,
    angry: 0,
  };
  for (const r of rows) if (r.type in counts) counts[r.type] += 1;

  let userReaction: ReactionType | null = null;
  if (userId) {
    const mine = await strapi.db
      .query(UID)
      .findOne({ where: { article: articleId, user: userId }, select: ['type'] });
    userReaction = (mine as { type?: ReactionType } | null)?.type ?? null;
  }

  return { counts, total: rows.length, userReaction };
}

export default factories.createCoreController(UID, ({ strapi }) => ({
  // GET /api/reactions/summary?article=<documentId>  (public)
  async summary(ctx) {
    const documentId = String(ctx.query.article ?? '');
    const articleId = await articleIdFromDocumentId(strapi, documentId);
    if (!articleId) return ctx.badRequest('Unknown article');
    ctx.body = { data: await buildSummary(strapi, articleId, ctx.state.user?.id) };
  },

  // POST /api/reactions/react  { article: <documentId>, type }  (authenticated)
  async react(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    const { article: documentId, type } = ctx.request.body ?? {};
    if (!TYPES.includes(type)) return ctx.badRequest('Invalid reaction type');

    const articleId = await articleIdFromDocumentId(strapi, String(documentId ?? ''));
    if (!articleId) return ctx.badRequest('Unknown article');

    const existing = await strapi.db
      .query(UID)
      .findOne({ where: { article: articleId, user: userId } });

    if (existing) {
      if (existing.type === type) {
        // Toggle off the same reaction.
        await strapi.db.query(UID).delete({ where: { id: existing.id } });
      } else {
        await strapi.db.query(UID).update({ where: { id: existing.id }, data: { type } });
      }
    } else {
      await strapi.db.query(UID).create({ data: { article: articleId, user: userId, type } });
    }

    ctx.body = { data: await buildSummary(strapi, articleId, userId) };
  },
}));
