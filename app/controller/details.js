'use strict';

const Controller = require('egg').Controller;

class DetailsController extends Controller {
  async index() {
    const name = this.ctx.cookies.get('name', {
      signed: false,
    });
    console.log(name);
    const { aid } = this.ctx.query;
    const list = await this.service.news.getNewsDetails(aid);
    await this.ctx.render('details.tpl', {
      list: list[0],
      name,
    });
  }
}

module.exports = DetailsController;
