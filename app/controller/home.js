'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // 设置cookies
    this.ctx.cookies.set('name', 'zhangsan', {
      maxAge: 1000 * 3600 * 5,
      httpOnly: true, // 默认就是 true
      encrypt: true, // 加密传输
    });

    // 设置session
    this.ctx.session.username = '掌上';

    const list = await this.service.news.getNewsList();
    await this.ctx.render('index.tpl', {
      list,
    });
  }
}

module.exports = HomeController;
