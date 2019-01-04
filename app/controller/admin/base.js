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
    const { model, attr, _id } = this.ctx.request.query;
    console.log('model, attr, _id :', model, attr, _id);
    const doc = await this.ctx.model[model].findById(_id);
    const { status } = doc;
    let json = {};
    if (status) {
      json = {
        [attr]: 0,
      };
    } else {
      json = {
        [attr]: 1,
      };
    }
    const doc1 = await this.ctx.model[model].findOneAndUpdate(_id, json);
    if (doc1) {
      this.ctx.body = {
        message: 'success',
        code: 0,
        status: doc1.status,
      };
    } else {
      this.ctx.body = {
        message: 'fail',
        code: -1,
      };
    }
  }
  async editNum() {
    const { model, attr, _id, num } = this.ctx.request.query;
    console.log('model, attr, _id, num :', model, attr, _id, num);
    const doc = await this.ctx.model[model].findByIdAndUpdate(_id, {
      [attr]: num,
    });
    if (doc) {
      this.ctx.body = {
        message: 'success',
        code: 0,
        status: doc.sort,
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
