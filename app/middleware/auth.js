'use strict';
const url = require('url');
module.exports = options => {
  return async function auth(ctx, next) {
    if (ctx.session.userinfo) {
      await next();
    } else {
      const pathname = url.parse(ctx.request.url).pathname;
      // 如果直接写else 会死循环
      if (pathname === '/admin/login' || pathname === '/admin/doLogin' || pathname === '/admin/verify') {
        await next();
      } else {
        ctx.redirect('/admin/login');
      }
    }
  };
};
