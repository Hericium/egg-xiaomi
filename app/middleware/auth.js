'use strict';
const url = require('url');
module.exports = options => {
  return async function auth(ctx, next) {
    if (this.ctx.session.userinfo) {
      await next();
    } else {
      const pathname = url.parse(ctx.request.url);

    }
  };
};
