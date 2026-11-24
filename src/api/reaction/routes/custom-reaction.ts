export default {
  routes: [
    {
      method: 'GET',
      path: '/reactions/summary',
      handler: 'reaction.summary',
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/reactions/react',
      handler: 'reaction.react',
    },
  ],
};
