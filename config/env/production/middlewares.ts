import type { Core } from '@strapi/strapi';

/**
 * Production middleware stack (Strapi Cloud always runs with NODE_ENV=production
 * and overwrites config/middlewares.ts, so production overrides live here).
 *
 * CORS is restricted to the deployed frontend. Set on Strapi Cloud:
 *   FRONTEND_URL=https://your-app.vercel.app
 *   CORS_ORIGINS=https://your-app.vercel.app,https://www.your-domain.com   (optional, comma-separated)
 */
const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Middlewares => {
  const origins = env.array('CORS_ORIGINS', [env('FRONTEND_URL', '')]).filter(Boolean);

  return [
    'strapi::logger',
    'strapi::errors',
    'strapi::security',
    {
      name: 'strapi::cors',
      config: {
        origin: origins.length ? origins : ['*'],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
        headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
        keepHeaderOnError: true,
      },
    },
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ];
};

export default config;
