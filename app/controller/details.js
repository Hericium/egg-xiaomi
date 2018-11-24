'use strict';

const Controller = require('egg').Controller;

class DetailsController extends Controller {
  async index() {
    await this.ctx.render('details', {

    });
  }
}

module.exports = DetailsController;
