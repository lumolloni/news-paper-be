import { getIO } from '../../../../websocket';

const broadcast = new Map<string, string>();

function displayArticle(article: any) {
  return {
    documentId: article.documentId,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt ?? null,
    coverUrl: article.cover?.url ?? article.coverUrl ?? null,
    category: article.category
      ? { slug: article.category.slug, name: article.category.name }
      : null,
    subcategory: article.subcategory
      ? { slug: article.subcategory.slug }
      : null,
    publishedAt: String(article.publishedAt),
  };
}

async function broadcastIfNewlyPublished(documentId: string | undefined) {
  if (!documentId) return;

  const io = getIO();
  if (!io) return;

  const article = await strapi.documents('api::article.article').findOne({
    documentId,
    status: 'published',
    populate: {
      cover: { fields: ['url'] },
      category: { fields: ['slug', 'name'] },
      subcategory: { fields: ['slug'] },
    },
  });


  if (!article || !article.publishedAt) return;

  const publishedAt = String(article.publishedAt);
  if (broadcast.get(documentId) === publishedAt) return;

  if (broadcast.has(documentId)) {

    io.emit('article:updated', displayArticle(article));

    strapi.log.info(`[ws] broadcast article:updated "${article.title}"`);

    return;
  }

  broadcast.set(documentId, publishedAt);

  io.emit('article:new', displayArticle(article));

  strapi.log.info(`[ws] broadcast article:new "${article.title}"`);
}

export default {
  async afterCreate(event: { result: { documentId?: string } }) {
    await broadcastIfNewlyPublished(event.result?.documentId);
  },
};
