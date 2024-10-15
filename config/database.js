require('dotenv').config({ path: '../.env' });  
const path = require('path');
console.log("SSL", Boolean(process.env.STRAPI_DATABASE_SSL))

module.exports = ({ env }) => {
  const client = process.env.STRAPI_DATABASE_CLIENT || 'sqlite';

  const connections = {
    mysql: {
      connection: {
        host: process.env.STRAPI_DATABASE_HOST || 'localhost',
        port: process.env.STRAPI_DATABASE_PORT || 3306,
        database: process.env.STRAPI_DATABASE_NAME || 'strapi',
        user: process.env.STRAPI_DATABASE_USERNAME || 'strapi',
        password: process.env.STRAPI_DATABASE_PASSWORD || 'strapi',
        ssl: ((process.env.STRAPI_DATABASE_SSL == 'true') || false) && {
          key: process.env.DATABASE_SSL_KEY || undefined,
          cert: process.env.DATABASE_SSL_CERT || undefined,
          ca: process.env.DATABASE_SSL_CA || undefined,
          capath: process.env.DATABASE_SSL_CAPATH || undefined,
          cipher: process.env.DATABASE_SSL_CIPHER || undefined,
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    postgres: {
      connection: {
        connectionString: env('DATABASE_URL'),
        host: process.env.STRAPI_DATABASE_HOST || 'localhost',
        port: env.int('STRAPI_DATABASE_PORT', 5432),
        database: process.env.STRAPI_DATABASE_NAME || 'strapi',
        user: process.env.STRAPI_DATABASE_USERNAME || 'strapi',
        password: process.env.STRAPI_DATABASE_PASSWORD || 'strapi',
        ssl: env.bool('STRAPI_DATABASE_SSL', false) && {
          key: env('DATABASE_SSL_KEY', undefined),
          cert: env('DATABASE_SSL_CERT', undefined),
          ca: env('DATABASE_SSL_CA', undefined),
          capath: env('DATABASE_SSL_CAPATH', undefined),
          cipher: env('DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
        schema: process.env.DATABASE_SCHEMA || 'public',
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', process.env.STRAPI_DATABASE_FILENAME || '.tmp/data.db'),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
