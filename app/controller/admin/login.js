'use strict';

const BaseController = require('../../core/base.js');

class LoginController extends BaseController {
  async index() {
    this.ctx.body = '主页';
  }

  async login() {
    await this.ctx.render('admin/login.tpl', {

    });
  }

  async register() {
    await this.ctx.render('admin/register.tpl', {

    });
  }

  async doLogin() {
    await this.error2('/');
  }

  async doRegister() {
    console.log(this.ctx.request.body);
    await this.error2('/doLogin');
  }
}

module.exports = LoginController;
