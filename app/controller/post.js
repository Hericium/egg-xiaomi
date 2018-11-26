'use strict';

const Controller = require('egg').Controller;

class PostController extends Controller {
  async index() {
    await this.ctx.render('post.tpl', {
    });
  }
  async add() {
    this.ctx.body = this.ctx.request.body;
  }
}

module.exports = PostController;
