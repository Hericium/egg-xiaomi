'use strict';

const Controller = require('egg').Controller;

class BlogsController extends Controller {
  async index() {
    this.ctx.body = '123';
  }
}

module.exports = BlogsController;
