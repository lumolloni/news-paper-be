import { factories } from '@strapi/strapi';

// Populate shape mirrors the frontend's ARTICLE_POPULATE so search results carry
// the same relations the cards render (cover, category, subcategory, author, tags).
const SEARCH_POPULATE = {
  cover: true,
  category: true,
  subcategory: true,
  author: { populate: { avatar: true } },
  tags: true,
} as const;

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function articlePath(a: {
  slug: string;
  category?: { slug?: string } | null;
  subcategory?: { slug?: string } | null;
}): string {
  if (a.category?.slug && a.subcategory?.slug) return `/${a.category.slug}/${a.subcategory.slug}/${a.slug}`;
  if (a.category?.slug) return `/${a.category.slug}/${a.slug}`;
  return `/article/${a.slug}`;
}

export default factories.createCoreController('api::article.article', ({ strapi }) => ({
  /**
   * Dynamic XML sitemap of all published content. Served at /sitemap.xml (see
   * custom-article routes), referenced by the frontend robots.txt. URLs point at
   * the public frontend origin (FRONTEND_URL env, default localhost:5173).
   */
  async sitemap(ctx) {
    const base = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '');
    type Url = { loc: string; lastmod?: string; changefreq?: string; priority?: number };
    const urls: Url[] = [
      { loc: `${base}/`, changefreq: 'hourly', priority: 1.0 },
      { loc: `${base}/about`, changefreq: 'monthly', priority: 0.4 },
      { loc: `${base}/contact`, changefreq: 'monthly', priority: 0.4 },
    ];

    const [articles, categories, subcategories, authors] = await Promise.all([
      strapi.documents('api::article.article').findMany({
        status: 'published',
        locale: 'en',
        fields: ['slug', 'updatedAt'],
        populate: { category: { fields: ['slug'] }, subcategory: { fields: ['slug'] } },
        sort: 'publishedAt:desc',
        limit: 5000,
      }),
      strapi.documents('api::category.category').findMany({ locale: 'en', fields: ['slug'], limit: 500 }),
      strapi.documents('api::subcategory.subcategory').findMany({
        locale: 'en',
        fields: ['slug'],
        populate: { category: { fields: ['slug'] } },
        limit: 1000,
      }),
      strapi.documents('api::author.author').findMany({ locale: 'en', fields: ['slug'], limit: 500 }),
    ]);

    for (const c of categories as Array<{ slug: string }>) {
      urls.push({ loc: `${base}/${c.slug}`, changefreq: 'daily', priority: 0.7 });
    }
    for (const s of subcategories as Array<{ slug: string; category?: { slug?: string } }>) {
      if (s.category?.slug) urls.push({ loc: `${base}/${s.category.slug}/${s.slug}`, changefreq: 'daily', priority: 0.6 });
    }
    for (const a of authors as Array<{ slug: string }>) {
      urls.push({ loc: `${base}/author/${a.slug}`, changefreq: 'weekly', priority: 0.4 });
    }
    for (const a of articles as Array<{ slug: string; updatedAt?: string; category?: { slug?: string }; subcategory?: { slug?: string } }>) {
      urls.push({
        loc: `${base}${articlePath(a)}`,
        lastmod: a.updatedAt ? new Date(a.updatedAt).toISOString() : undefined,
        changefreq: 'weekly',
        priority: 0.8,
      });
    }

    const body =
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      urls
        .map((u) => {
          const parts = [`    <loc>${xmlEscape(u.loc)}</loc>`];
          if (u.lastmod) parts.push(`    <lastmod>${u.lastmod}</lastmod>`);
          if (u.changefreq) parts.push(`    <changefreq>${u.changefreq}</changefreq>`);
          if (u.priority != null) parts.push(`    <priority>${u.priority.toFixed(1)}</priority>`);
          return `  <url>\n${parts.join('\n')}\n  </url>`;
        })
        .join('\n') +
      '\n</urlset>\n';

    ctx.set('Content-Type', 'application/xml');
    ctx.body = body;
  },

  async incrementViews(ctx) {
    const { id } = ctx.params;
    const existing = await strapi.documents('api::article.article').findOne({ documentId: id });
    if (!existing) {
      return ctx.notFound('Article not found');
    }
    const updated = await strapi.documents('api::article.article').update({
      documentId: id,
      data: { views: (existing.views ?? 0) + 1 },
    });
    ctx.body = { data: { documentId: updated.documentId, views: updated.views } };
  },

  /**
   * Scalable search by title, tag name and category name.
   *
   * Deliberately does NOT scan `content` (richtext) or `excerpt`: a
   * `LIKE '%term%'` over a large text column forces a full-table scan that does
   * not survive ~9M rows. We keep the match surface narrow (title + the two
   * relation names) so the query stays driven by indexable columns.
   *
   * Production note (cannot be enforced on the SQLite dev DB): add indexes on
   * `articles.title` and on the tag/category join tables, and prefer a real
   * full-text index over `LIKE` — Postgres `pg_trgm` (GIN) or a `tsvector`
   * column with `to_tsquery` — to make substring/prefix search index-backed.
   */
  async search(ctx) {
    const q = String(ctx.query.q ?? '').trim();
    const locale = (ctx.query.locale as string) ?? 'en';
    const page = Math.max(1, parseInt(String(ctx.query.page ?? '1'), 10) || 1);
    const pageSize = Math.min(
      50,
      Math.max(1, parseInt(String(ctx.query.pageSize ?? '12'), 10) || 12),
    );

    if (!q) {
      ctx.body = {
        data: [],
        meta: { pagination: { page, pageSize, pageCount: 0, total: 0 } },
      };
      return;
    }

    const filters = {
      $or: [
        { title: { $containsi: q } },
        { tags: { name: { $containsi: q } } },
        { category: { name: { $containsi: q } } },
      ],
    };

    const [data, total] = await Promise.all([
      strapi.documents('api::article.article').findMany({
        locale,
        status: 'published',
        filters,
        populate: SEARCH_POPULATE,
        sort: 'publishedAt:desc',
        start: (page - 1) * pageSize,
        limit: pageSize,
      }),
      strapi
        .documents('api::article.article')
        .count({ locale, status: 'published', filters }),
    ]);

    ctx.body = {
      data,
      meta: {
        pagination: {
          page,
          pageSize,
          pageCount: Math.ceil(total / pageSize),
          total,
        },
      },
    };
  },
}));
