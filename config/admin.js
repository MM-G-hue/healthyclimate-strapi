require('dotenv').config({ path: '../.env' });  

module.exports = ({ env }) => ({
  auth: {
    secret: process.env.STRAPI_ADMIN_JWT_SECRET,
  },
  apiToken: {
    salt: process.env.STRAPI_API_TOKEN_SALT,
  },
  transfer: {
    token: {
      salt: process.env.STRAPI_TRANSFER_TOKEN_SALT,
    },
  },
  flags: {
    nps: process.env.FLAG_NPS || true,
    promoteEE: process.env.FLAG_PROMOTE_EE || true,
  },
});
