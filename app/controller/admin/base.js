'use strict';

const Controller = require('egg').Controller;
// 写一个公共controller,公用的页面模板可以公用，比如操作成功和失败的提示；非页面的公用，封装的service里，可以继承到
class BaseController extends Controller {
  // 操作成功跳转的页面
  async success(redirectUrl, message) {
    // this.ctx.body='成功';
    await this.ctx.render('admin/public/success', {
      redirectUrl,
      message: message || '操作成功!',
    });
  }


  // 操作失败跳转的页面
  async error(redirectUrl, message) {
    // this.ctx.body='成功';
    await this.ctx.render('admin/public/error', {
      redirectUrl,
      message: message || '操作成功!',
    });
  }

  // 删除方法
  async delete() {
    // 1.获取要删除的Model
    // 2.获取要删除数据的id
    // 3.执行删除
    // 4. 返回
    const { model, _id } = this.ctx.request.query;
    await this.ctx.model[model].deleteOne({ _id });
    this.ctx.redirect(this.ctx.locals.prePage);

  }
  async changeStatus() {
    const { model, _id, status } = this.ctx.request.query;
    const doc = await this.ctx.model[model].findByIdAndUpdate(_id, { status });
    if (doc) {
      this.ctx.body = {
        message: 'success',
        code: 0,
        status: doc.status,
      };
    } else {
      this.ctx.body = {
        message: 'fail',
        code: -1,
      };
    }
  }
}

module.exports = BaseController;
