'use strict';

const Controller = require('egg').Controller;

class DetailsController extends Controller {
  async index() {
    const { aid } = this.ctx.query;
    const list = await this.service.news.getNewsDetails(aid);
    console.log(list);
    await this.ctx.render('details.tpl', {
      list: list[0],
    });
  }
}

module.exports = DetailsController;
