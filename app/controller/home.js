'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const list = await this.service.news.getNewsList();
    await this.ctx.render('index.tpl', {
      list,
    });
  }
}

module.exports = HomeController;
