/**
 * Reader polls. A poll can be standalone or attached to an article. Each
 * logged-in user may vote once (tracked in poll-vote); vote tallies are derived
 * from the poll-vote table — the single source of truth — so counts stay
 * consistent and we avoid mutating the poll's option components.
 */
import { factories } from '@strapi/strapi';

const UID = 'api::poll.poll';
const VOTE_UID = 'api::poll-vote.poll-vote';

interface Option {
  label: string;
}

async function tallies(strapi, pollId: number, optionCount: number): Promise<number[]> {
  const rows: Array<{ optionIndex: number }> = await strapi.db.query(VOTE_UID).findMany({
    where: { poll: pollId },
    select: ['optionIndex'],
  });
  const counts = new Array(optionCount).fill(0);
  for (const r of rows) {
    if (r.optionIndex >= 0 && r.optionIndex < optionCount) counts[r.optionIndex] += 1;
  }
  return counts;
}

async function userVoteIndex(strapi, pollId: number, userId?: number): Promise<number | null> {
  if (!userId) return null;
  const vote = await strapi.db
    .query(VOTE_UID)
    .findOne({ where: { poll: pollId, user: userId }, select: ['optionIndex'] });
  return (vote as { optionIndex?: number } | null)?.optionIndex ?? null;
}

function shape(
  poll: { documentId: string; question: string; options?: Option[] },
  counts: number[],
  userVote: number | null,
) {
  const options = (poll.options ?? []).map((o, index) => ({
    index,
    label: o.label,
    votes: counts[index] ?? 0,
  }));
  return {
    documentId: poll.documentId,
    question: poll.question,
    options,
    total: counts.reduce((sum, n) => sum + n, 0),
    userVote,
  };
}

export default factories.createCoreController(UID, ({ strapi }) => ({
  // GET /api/polls/for-article?article=<articleDocumentId>  (public)
  async forArticle(ctx) {
    const documentId = String(ctx.query.article ?? '');
    const article = await strapi
      .documents('api::article.article')
      .findOne({ documentId, fields: ['id'] });
    const articleId = (article as { id?: number } | null)?.id;
    if (!articleId) {
      ctx.body = { data: null };
      return;
    }

    const poll = await strapi.db.query(UID).findOne({
      where: { article: articleId, isActive: true },
      populate: { options: true },
    });
    if (!poll) {
      ctx.body = { data: null };
      return;
    }

    const counts = await tallies(strapi, poll.id, poll.options?.length ?? 0);
    const userVote = await userVoteIndex(strapi, poll.id, ctx.state.user?.id);
    ctx.body = { data: shape(poll, counts, userVote) };
  },

  // POST /api/polls/:id/vote  { optionIndex }  (authenticated)
  async vote(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    const documentId = ctx.params.id;
    const optionIndex = Number(ctx.request.body?.optionIndex);

    const poll = await strapi.db.query(UID).findOne({
      where: { documentId },
      populate: { options: true },
    });
    if (!poll) return ctx.notFound('Poll not found');

    const optionCount = poll.options?.length ?? 0;
    if (!Number.isInteger(optionIndex) || optionIndex < 0 || optionIndex >= optionCount) {
      return ctx.badRequest('Invalid option');
    }

    // One vote per user — ignore repeat attempts.
    const already = await userVoteIndex(strapi, poll.id, userId);
    if (already === null) {
      await strapi.db
        .query(VOTE_UID)
        .create({ data: { poll: poll.id, user: userId, optionIndex } });
    }

    const counts = await tallies(strapi, poll.id, optionCount);
    const userVote = await userVoteIndex(strapi, poll.id, userId);
    ctx.body = { data: shape(poll, counts, userVote) };
  },
}));
