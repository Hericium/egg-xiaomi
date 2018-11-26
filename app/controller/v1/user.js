'use strict';

const bcrypt = require('bcrypt');

module.exports = app => {
  return class UserController extends app.Controller {
    * create() {
      const ctx = this.ctx;
      let { name, password } = ctx.request.body;
      // 校验参数
      try {
        ctx.validate({
          name: { type: 'string' },
          password: { type: 'string' },
        });
      } catch (err) {
        ctx.logger.warn(err.errors);
        ctx.body = err.errors;
        return;
      }
      // 密码加密
      const salt = bcrypt.genSaltSync(10);
      password = bcrypt.hashSync('password', salt);
      ctx.body = {
        name,
        password,
      };
      // service 服务层处理
      // ctx.body = yield ctx.service.user.create({
      //     name,
      //     password
      // });
      ctx.status = 200;
    }
  };
};
