'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    this.ctx.body = '登录';
  }
  async add() {
    this.ctx.body = '注册';
  }
}

module.exports = LoginController;
