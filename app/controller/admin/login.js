'use strict';


const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    await this.ctx.render('admin/login');
  }

  async captcha() {
    await this.ctx.service.utils.verify();
  }

}

module.exports = LoginController;
