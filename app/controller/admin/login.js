'use strict';

const utils = require('utility'); // 引入工具类

const BaseController = require('./base');

class LoginController extends BaseController {
  async index() {
    await this.ctx.render('admin/login', {
      doc: this.ctx.locals.userinfo,
    });
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
    if (this.ctx.session.code.toUpperCase() === verify.toUpperCase()) {
      const result = await this.ctx.model.Admin.find({ username, password }); // 实用外部方法，先考虑await
      if (result.length > 0) {
        this.ctx.session.userinfo = result[0]; // 取数组对象里的第一个对象
        // this.ctx.redirect('/admin/manager/index');
        await this.success('/admin/manager/index', '登录成功');
      } else {
        await this.error('/admin/login', '用户不存在');
      }
    } else {
      await this.error('/admin/login', '验证码错误');
    }
  }

  // 登出
  async doLoginOut() {
    this.ctx.session.userinfo = null;
    this.ctx.redirect('/admin/login');
  }
}

module.exports = LoginController;
