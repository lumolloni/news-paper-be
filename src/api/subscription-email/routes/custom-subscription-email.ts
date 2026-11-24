export default {
  routes: [
    {
      method: 'POST',
      path: '/subscription-emails/subscribe',
      handler: 'subscription-email.subscribe',
      config: {
        auth: false,
      },
    },
  ],
};
