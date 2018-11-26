'use strict';
// app/middleware/robot.js
// options === app.config.robot
module.exports = options => {
  return async function robotMiddleware(ctx, next) {
    const { ip: ips } = options;
    const result = ips.some(ip => {
      if (ctx.request.ip === ip) {
        return true;
      }
      return false;
    });
    if (result) {
      ctx.status = 403;
    } else {
      await next();
    }
  };
};
