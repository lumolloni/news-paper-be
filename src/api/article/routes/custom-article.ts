export default {
  routes: [
    {
      // Top-level path (not /articles/:id) so the core findOne route does not
      // shadow it by matching "search" as a documentId.
      method: 'GET',
      path: '/search',
      handler: 'article.search',
      config: {
        auth: false,
      },
    },
    {
      method: 'PUT',
      path: '/articles/:id/views',
      handler: 'article.incrementViews',
      config: {
        auth: false,
      },
    },
    {
      // Served at the site root (/sitemap.xml), not under /articles.
      method: 'GET',
      path: '/sitemap.xml',
      handler: 'article.sitemap',
      config: {
        auth: false,
      },
    },
  ],
};
