'use strict';
// 封装
const Controller = require('egg').Controller;

class BaseController extends Controller {

  async error2(redirectUrl) {
    await this.ctx.render('admin/public/error.tpl', {

      redirectUrl: redirectUrl || '/',
    });
  }
}

module.exports = BaseController;
