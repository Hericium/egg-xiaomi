'use strict';

const Controller = require('egg').Controller;

class AlloyleverController extends Controller {
  async index() {
    // console.log(this.ctx.params);
    this.ctx.body = 123;
    console.log(this.ctx.query);
  }
}

module.exports = AlloyleverController;
