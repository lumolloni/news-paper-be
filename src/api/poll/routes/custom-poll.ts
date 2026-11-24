export default {
  routes: [
    {
      method: 'GET',
      path: '/polls/for-article',
      handler: 'poll.forArticle',
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/polls/:id/vote',
      handler: 'poll.vote',
    },
  ],
};
