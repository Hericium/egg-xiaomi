'use strict';
const utils = require('utility'); // 引入工具类

const svgCaptcha = require('svg-captcha'); // 引入svg验证
const Service = require('egg').Service;

class UtilsService extends Service {

  // svg验证 (公共的方法，写到service里继承)
  async verify() {
    const captcha = svgCaptcha.create(
      {
        size: 4,
        fontSize: 50,
        width: 100,
        height: 34,
        background: '#cc9966',
      }
    );
    this.ctx.session.code = captcha.text;
    this.ctx.response.type = 'image/svg+xml';
    this.ctx.body = captcha.data;
    return this.ctx.body;
  }

  async md5(password) {
    return utils.md5(password);
  }
}

module.exports = UtilsService;
