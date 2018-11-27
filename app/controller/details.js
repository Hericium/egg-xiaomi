'use strict';

const Controller = require('egg').Controller;

class DetailsController extends Controller {
  async index() {
    // 获取cookies
    const name = this.ctx.cookies.get('name', {
      // signed: false,
      encrypt: true, // 加密传输
    });
    console.log(name);

    // 获取session
    const username = this.ctx.session.username;
    const { aid } = this.ctx.query;
    const list = await this.service.news.getNewsDetails(aid);
    await this.ctx.render('details.tpl', {
      list: list[0],
      name,
      username,
    });
  }
}

module.exports = DetailsController;
