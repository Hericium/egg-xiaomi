'use strict';
const url = require('url');
module.exports = () => {
  return async function auth(ctx, next) {
    ctx.locals.prePage = ctx.request.headers.referer;
    ctx.locals.userinfo = ctx.session.userinfo;
    if (ctx.session.userinfo) {
      await next();
    } else {
      const pathname = url.parse(ctx.request.url).pathname;
      // 如果直接写else 会死循环
      if (pathname === '/admin/login' || pathname === '/admin/doLogin' || pathname === '/admin/captcha') {
        await next();
      } else {
        ctx.redirect('/admin/login');
      }
    }
  };
};
