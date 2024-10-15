module.exports = ({ env }) => ({
  host: process.env.STRAPI_HOST || '0.0.0.0',
  port: process.env.STRAPI_PORT || 1337,
  app: {
    keys: process.env.STRAPI_APP_KEYS.split(','),
  },
  webhooks: {
    populateRelations: process.env.WEBHOOKS_POPULATE_RELATIONS || false,
  },
});
