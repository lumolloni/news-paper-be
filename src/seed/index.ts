import type { Core } from '@strapi/strapi';
import { categories, authors, tags, articles, siteSettings } from './data';

const READING_WPM = 200;

function readingTimeFromText(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / READING_WPM));
}

function coverUrl(slug: string): string {
  return `https://picsum.photos/seed/${slug}/1200/700`;
}

function avatarUrl(slug: string): string {
  return `https://i.pravatar.cc/240?u=${slug}`;
}

async function ensureAlbanianLocale(strapi: Core.Strapi) {
  const localesService = strapi.plugin('i18n').service('locales');
  const existing = await localesService.find();
  const hasSq = existing.some((l: { code: string }) => l.code === 'sq');
  if (!hasSq) {
    await localesService.create({ code: 'sq', name: 'Albanian (sq)' });
    strapi.log.info('[seed] Created locale: sq (Albanian).');
  }
}

async function setPublicPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) return;

  const grants: Record<string, string[]> = {
    'api::article.article': ['find', 'findOne'],
    'api::category.category': ['find', 'findOne'],
    'api::subcategory.subcategory': ['find', 'findOne'],
    'api::author.author': ['find', 'findOne'],
    'api::tag.tag': ['find', 'findOne'],
    'api::site-setting.site-setting': ['find'],
    'api::subscription-email.subscription-email': ['subscribe'],
    'api::about-page.about-page': ['find'],
    'api::contact-page.contact-page': ['find'],
    'api::contact-message.contact-message': ['submit'],
  };

  for (const [uid, actions] of Object.entries(grants)) {
    for (const action of actions) {
      const actionId = `${uid}.${action}`;
      const existing = await strapi
        .query('plugin::users-permissions.permission')
        .findOne({ where: { action: actionId, role: publicRole.id } });
      if (!existing) {
        await strapi
          .query('plugin::users-permissions.permission')
          .create({ data: { action: actionId, role: publicRole.id } });
      }
    }
  }
}

/**
 * Grant the built-in `authenticated` role read access to content gated behind
 * login — currently the live streams. Logged-out (public) users deliberately do
 * NOT get these actions, so the stream endpoint returns 403 without a JWT.
 */
async function setAuthenticatedPermissions(strapi: Core.Strapi) {
  const role = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'authenticated' } });

  if (!role) return;

  const grants: Record<string, string[]> = {
    // Logged-in requests use the authenticated role, which does NOT inherit the
    // public role — so it needs the same public read grants or the site 403s for
    // signed-in users.
    'api::article.article': ['find', 'findOne'],
    'api::category.category': ['find', 'findOne'],
    'api::subcategory.subcategory': ['find', 'findOne'],
    'api::author.author': ['find', 'findOne'],
    'api::tag.tag': ['find', 'findOne'],
    'api::site-setting.site-setting': ['find'],
    'api::subscription-email.subscription-email': ['subscribe'],
    'api::about-page.about-page': ['find'],
    'api::contact-page.contact-page': ['find'],
    'api::contact-message.contact-message': ['submit'],
    // Gated + interactive content for logged-in users.
    'api::live-stream.live-stream': ['find', 'findOne'],
    // Custom action routes (without auth:false) need explicit role permission.
    'api::reaction.reaction': ['react'],
    'api::poll.poll': ['vote'],
  };

  for (const [uid, actions] of Object.entries(grants)) {
    for (const action of actions) {
      const actionId = `${uid}.${action}`;
      const existing = await strapi
        .query('plugin::users-permissions.permission')
        .findOne({ where: { action: actionId, role: role.id } });
      if (!existing) {
        await strapi
          .query('plugin::users-permissions.permission')
          .create({ data: { action: actionId, role: role.id } });
      }
    }
  }
}

/**
 * Seed one always-on demo live stream (a public HLS test feed) so the gated
 * /live page has something to play. Idempotent on the slug.
 */
async function seedLiveStreams(strapi: Core.Strapi) {
  const uid = 'api::live-stream.live-stream';
  const existing = await strapi.documents(uid).findFirst({
    filters: { slug: { $eq: 'newsroom-live' } },
  });
  if (existing) return;

  const created = await strapi.documents(uid).create({
    data: {
      title: 'Newsroom Live',
      slug: 'newsroom-live',
      description: 'Around-the-clock breaking coverage from the Meridian newsroom.',
      // Apple's public HLS reference stream — reliable for demos.
      streamUrl:
        'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
      provider: 'hls',
      posterUrl: 'https://picsum.photos/seed/newsroom-live/1200/675',
      isLive: true,
    },
  });
  await strapi.documents(uid).publish({ documentId: created.documentId });
  strapi.log.info('[seed] Seeded demo live stream (newsroom-live).');
}

/**
 * Seed one demo poll attached to the most recent published article so the
 * article page shows the poll widget out of the box. Idempotent.
 */
async function seedPolls(strapi: Core.Strapi) {
  const uid = 'api::poll.poll';
  const existing = await strapi.documents(uid).count({});
  if (existing > 0) return;

  const article = await strapi.documents('api::article.article').findFirst({
    locale: 'en',
    status: 'published',
    sort: 'publishedAt:desc',
  });
  if (!article) return;

  await strapi.documents(uid).create({
    data: {
      question: 'How do you mostly read the news?',
      isActive: true,
      // documents API connects relations by documentId.
      article: article.documentId,
      options: [
        { label: 'On my phone', votes: 0 },
        { label: 'On a laptop / desktop', votes: 0 },
        { label: 'Newsletters & email', votes: 0 },
        { label: 'Social media', votes: 0 },
      ],
    },
  });
  strapi.log.info('[seed] Seeded demo poll.');
}

/**
 * In Strapi i18n, relations are stored per-locale. The Albanian (sq) version of
 * each document therefore needs its relations set explicitly. This backfills any
 * sq entry whose relations are missing by copying them from the en version.
 * Idempotent: entries that already have their relations are skipped.
 */
async function repairLocalizedRelations(strapi: Core.Strapi) {
  const enSubs = await strapi.documents('api::subcategory.subcategory').findMany({
    locale: 'en',
    populate: { category: true },
    pagination: { pageSize: 200 },
  });
  for (const s of enSubs) {
    const sq = await strapi.documents('api::subcategory.subcategory').findOne({
      documentId: s.documentId,
      locale: 'sq',
      populate: { category: true },
    });
    if (!sq || (sq as { category?: unknown }).category) continue;
    await strapi.documents('api::subcategory.subcategory').update({
      documentId: s.documentId,
      locale: 'sq',
      data: { category: (s as { category?: { documentId: string } }).category?.documentId },
    });
  }

  const enArticles = await strapi.documents('api::article.article').findMany({
    locale: 'en',
    status: 'published',
    populate: { category: true, subcategory: true, author: true, tags: true },
    pagination: { pageSize: 200 },
  });
  for (const a of enArticles) {
    const sq = await strapi.documents('api::article.article').findOne({
      documentId: a.documentId,
      locale: 'sq',
      populate: { category: true },
    });
    if (!sq || (sq as { category?: unknown }).category) continue;
    const art = a as {
      category?: { documentId: string }
      subcategory?: { documentId: string }
      author?: { documentId: string }
      tags?: { documentId: string }[]
    };
    await strapi.documents('api::article.article').update({
      documentId: a.documentId,
      locale: 'sq',
      status: 'published',
      data: {
        category: art.category?.documentId,
        subcategory: art.subcategory?.documentId,
        author: art.author?.documentId,
        tags: (art.tags ?? []).map((t) => t.documentId),
      },
    });
  }
}

async function seedSiteSettings(strapi: Core.Strapi) {
  const uid = 'api::site-setting.site-setting';
  const existing = await strapi.documents(uid).findFirst({ locale: 'en' });
  if (existing) {
    // Backfill the UI translations catalogue, filling in any keys added since
    // the doc was seeded — without clobbering values an editor changed in the
    // CMS. Existing keys win; only missing keys are added.
    const current = ((existing as { translations?: Record<string, Record<string, string>> })
      .translations) ?? {};
    const merged: Record<string, Record<string, string>> = {};
    let changed = false;
    for (const [loc, defaults] of Object.entries(siteSettings.translations)) {
      merged[loc] = { ...defaults, ...(current[loc] ?? {}) };
      if (JSON.stringify(merged[loc]) !== JSON.stringify(current[loc] ?? {})) changed = true;
    }
    if (changed) {
      await strapi.documents(uid).update({
        documentId: existing.documentId,
        locale: 'en',
        data: { translations: merged },
      });
      strapi.log.info('[seed] Backfilled site-settings translations.');
    }
    return;
  }

  const created = await strapi.documents(uid).create({
    locale: 'en',
    data: {
      siteName: siteSettings.siteName,
      logoUrl: siteSettings.logoUrl,
      backgroundColor: siteSettings.backgroundColor,
      accentColor: siteSettings.accentColor,
      tagline: siteSettings.tagline.en,
      footerText: siteSettings.footerText.en,
      footerLinks: siteSettings.footerLinks.en,
      socialLinks: siteSettings.socialLinks,
      translations: siteSettings.translations,
    },
  });

  await strapi.documents(uid).update({
    documentId: created.documentId,
    locale: 'sq',
    data: {
      tagline: siteSettings.tagline.sq,
      footerText: siteSettings.footerText.sq,
      footerLinks: siteSettings.footerLinks.sq,
    },
  });

  strapi.log.info('[seed] Seeded site settings (en + sq).');
}

/**
 * Apply seed `videoUrl`s to articles that already exist (the content seed is
 * skipped once articles are present, so a newly added demo video would
 * otherwise never land). Only fills empty values, on both locales.
 */
async function backfillSeedVideos(strapi: Core.Strapi) {
  for (const art of articles) {
    if (!art.videoUrl) continue;
    for (const locale of ['en', 'sq'] as const) {
      const doc = await strapi.documents('api::article.article').findFirst({
        locale,
        filters: { slug: { $eq: art.slug } },
      });
      if (!doc || (doc as { videoUrl?: string }).videoUrl) continue;
      await strapi.documents('api::article.article').update({
        documentId: doc.documentId,
        locale,
        status: 'published',
        data: { videoUrl: art.videoUrl },
      });
    }
  }
}

async function seedStaticPages(strapi: Core.Strapi) {
  const aboutUid = 'api::about-page.about-page';
  const aboutExisting = await strapi.documents(aboutUid).findFirst({ locale: 'en' });
  if (!aboutExisting) {
    const created = await strapi.documents(aboutUid).create({
      locale: 'en',
      data: {
        title: 'About Us',
        subtitle: 'Independent journalism for a connected world.',
        mission:
          'Meridian exists to deliver clear, accurate and fearless reporting that helps readers make sense of a complex world.',
        body:
          '<p>Founded by a small team of journalists, Meridian covers politics, business, culture, science and sport with depth and integrity.</p><p>We believe in facts, context and giving every story the room it deserves.</p>',
      },
    });
    await strapi.documents(aboutUid).update({
      documentId: created.documentId,
      locale: 'sq',
      data: {
        title: 'Rreth Nesh',
        subtitle: 'Gazetari e pavarur për një botë të ndërlidhur.',
        mission:
          'Meridian ekziston për të ofruar raportim të qartë, të saktë dhe të guximshëm që ndihmon lexuesit të kuptojnë një botë komplekse.',
        body:
          '<p>I themeluar nga një ekip i vogël gazetarësh, Meridian mbulon politikën, biznesin, kulturën, shkencën dhe sportin me thellësi dhe integritet.</p><p>Ne besojmë te faktet, konteksti dhe hapësira që meriton çdo histori.</p>',
      },
    });
    strapi.log.info('[seed] Seeded About page (en + sq).');
  }

  const contactUid = 'api::contact-page.contact-page';
  const contactExisting = await strapi.documents(contactUid).findFirst({ locale: 'en' });
  if (!contactExisting) {
    const created = await strapi.documents(contactUid).create({
      locale: 'en',
      data: {
        title: 'Contact',
        intro:
          'Have a tip, a question or feedback? We would love to hear from you.',
        email: 'hello@meridian.example',
        phone: '+1 (555) 010-0199',
        address: '1 Press Square\nNew York, NY',
      },
    });
    await strapi.documents(contactUid).update({
      documentId: created.documentId,
      locale: 'sq',
      data: {
        title: 'Kontakt',
        intro: 'Keni një lajm, pyetje apo koment? Do të donim t’ju dëgjonim.',
        address: '1 Press Square\nNew York, NY',
      },
    });
    strapi.log.info('[seed] Seeded Contact page (en + sq).');
  }
}

export default async function seed(strapi: Core.Strapi) {
  await ensureAlbanianLocale(strapi);
  await setPublicPermissions(strapi);
  await setAuthenticatedPermissions(strapi);
  await seedSiteSettings(strapi);
  await seedStaticPages(strapi);
  await seedLiveStreams(strapi);

  const existing = await strapi.documents('api::article.article').count({});
  if (existing > 0) {
    await repairLocalizedRelations(strapi);
    await backfillSeedVideos(strapi);
    await seedPolls(strapi);
    strapi.log.info(`[seed] ${existing} articles already present — skipping content seed.`);
    return;
  }

  strapi.log.info('[seed] Seeding categories, subcategories, authors, tags and articles...');

  // Categories + subcategories (en, then sq localization).
  const categoryIds: Record<string, string> = {};
  const subcategoryIds: Record<string, string> = {};

  for (const c of categories) {
    const enDoc = await strapi.documents('api::category.category').create({
      locale: 'en',
      data: { name: c.name.en, slug: c.slug, description: c.description.en, color: c.color },
    });
    categoryIds[c.slug] = enDoc.documentId;
    await strapi.documents('api::category.category').update({
      documentId: enDoc.documentId,
      locale: 'sq',
      data: { name: c.name.sq, slug: c.slug, description: c.description.sq },
    });

    for (const sub of c.subcategories) {
      const subEn = await strapi.documents('api::subcategory.subcategory').create({
        locale: 'en',
        data: {
          name: sub.name.en,
          slug: sub.slug,
          description: sub.description.en,
          category: enDoc.documentId,
        },
      });
      subcategoryIds[sub.slug] = subEn.documentId;
      await strapi.documents('api::subcategory.subcategory').update({
        documentId: subEn.documentId,
        locale: 'sq',
        data: {
          name: sub.name.sq,
          slug: sub.slug,
          description: sub.description.sq,
          category: enDoc.documentId,
        },
      });
    }
  }

  const authorIds: Record<string, string> = {};
  for (const a of authors) {
    const doc = await strapi.documents('api::author.author').create({
      data: { name: a.name, slug: a.slug, role: a.role, bio: a.bio, avatarUrl: avatarUrl(a.slug) },
    });
    authorIds[a.slug] = doc.documentId;
  }

  const tagIds: Record<string, string> = {};
  for (const t of tags) {
    const slug = t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const doc = await strapi.documents('api::tag.tag').create({
      data: { name: t, slug },
    });
    tagIds[t] = doc.documentId;
  }

  // Spread publish dates over the last ~16 days for realistic ordering.
  let offsetDays = 0;
  for (const art of articles) {
    const contentEn = art.paragraphs.en.join('\n\n');
    const contentSq = art.paragraphs.sq.join('\n\n');
    const publishedAt = new Date(Date.now() - offsetDays * 24 * 60 * 60 * 1000).toISOString();
    offsetDays += 1;

    const enDoc = await strapi.documents('api::article.article').create({
      locale: 'en',
      status: 'published',
      data: {
        title: art.title.en,
        slug: art.slug,
        excerpt: art.excerpt.en,
        content: contentEn,
        coverUrl: coverUrl(art.slug),
        videoUrl: art.videoUrl,
        featured: art.featured ?? false,
        breaking: art.breaking ?? false,
        readingTime: readingTimeFromText(contentEn),
        views: Math.floor(Math.random() * 9000) + 200,
        publishedAt,
        category: categoryIds[art.categorySlug],
        subcategory: subcategoryIds[art.subcategorySlug],
        author: authorIds[art.authorSlug],
        tags: art.tags.map((t) => tagIds[t]).filter(Boolean),
      },
    });

    await strapi.documents('api::article.article').update({
      documentId: enDoc.documentId,
      locale: 'sq',
      status: 'published',
      data: {
        title: art.title.sq,
        slug: art.slug,
        excerpt: art.excerpt.sq,
        content: contentSq,
        publishedAt,
        category: categoryIds[art.categorySlug],
        subcategory: subcategoryIds[art.subcategorySlug],
        author: authorIds[art.authorSlug],
        tags: art.tags.map((t) => tagIds[t]).filter(Boolean),
      },
    });
  }

  strapi.log.info(`[seed] Done. Created ${articles.length} articles in en + sq.`);

  await seedPolls(strapi);
}
