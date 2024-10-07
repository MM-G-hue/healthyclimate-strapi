'use strict';

/**
 * markdown-test service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::markdown-test.markdown-test');
