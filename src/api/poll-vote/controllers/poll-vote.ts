import { factories } from '@strapi/strapi';

// No routes are exposed for poll-votes; they are managed via the poll controller.
export default factories.createCoreController('api::poll-vote.poll-vote');
