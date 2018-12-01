'use strict';

const utils = require('utility'); // 引入工具类

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
  // 1. 判断验证码
  // 2. 对比用户名和密码
  // 3. 对比用户名和密码
  // 4. 保存用户session

  async doLogin() {
    const data = this.ctx.request.body;
    let { username, password, verify } = data;
    password = utils.md5(password);
    console.log(password);
    if (this.ctx.session.code.toUpperCase() === verify.toUpperCase()) {
      const result = await this.ctx.model.Admin.find({ username, password }); // 实用外部方法，先考虑await
      if (result.length > 0) {
        console.log(result);
        this.ctx.session.userinfo = result[0]; // 去数组对象里的第一个对象
        this.ctx.redirect('/admin/manager/index');
      } else {
        console.log('用户不存在');
      }
    } else {
      console.log('验证码错误');
    }
  }

  // 登出
  async doLoginOut() {
    this.ctx.session.userinfo = null;
    this.ctx.redirect('/admin/login');
  }

}

module.exports = LoginController;
