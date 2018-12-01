'use strict';


const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    await this.ctx.render('admin/login');
  }
  // 图片验证码
  async captcha() {
    await this.ctx.service.utils.verify();
  }
  // 登录
  async doLogin() {
    const data = this.ctx.request.body;
    const { username, password, verify } = data;
  }

}

module.exports = LoginController;
