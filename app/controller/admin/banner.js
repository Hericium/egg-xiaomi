'use strict';
const sendToWormhole = require('stream-wormhole');
const BaseController = require('./base');
class UploadController extends BaseController {
  async index() {
    const doc = await this.ctx.model.Banner.find() || [];
    await this.ctx.render('/admin/banner/index', {
      doc,
    }
    );
  }
  async add() {
    await this.ctx.render('/admin/banner/add');
  }

  async doAdd() {
    const ctx = this.ctx;
    const parts = ctx.multipart({ autoFields: true });
    let part;
    let files = {};
    let result;
    let fieldname;
    // parts() 返回 promise 对象
    while ((part = await parts()) != null) {
      if (part.length) {
        // 这是 busboy 的字段
      } else {
        if (!part.filename) {
          // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
          // 需要做出处理，例如给出错误提示消息
          return;
        }
        fieldname = part.fieldname; // 表单的key
        // 文件处理，上传到云存储等等
        try {
          result = await ctx.oss.put('dev/' + part.filename, part);
        } catch (err) {
          // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
          await sendToWormhole(part);
          throw err;
        }
      }
      files = Object.assign(files, {
        [fieldname]: result && result.url,
      });
    }
    await this.ctx.model.Banner(Object.assign(files, parts.field)).save();
    await this.success('index');
  }

  async edit() {
    const { _id } = this.ctx.request.query;
    const doc = await this.ctx.model.Banner.find({ _id });
    await this.ctx.render('/admin/banner/edit', {
      doc,
    });
  }
  async doEdit() {
    const ctx = this.ctx;
    const parts = ctx.multipart({ autoFields: true });
    let part;
    let files = {};
    let result;
    let fieldname;
    // parts() 返回 promise 对象
    while ((part = await parts()) != null) {
      if (part.length) {
        // 这是 busboy 的字段
      } else {
        if (!part.filename) {
          // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
          // 需要做出处理，例如给出错误提示消息
          // return
          break;
        }
        fieldname = part.fieldname; // 表单的key
        // 文件处理，上传到云存储等等
        try {
          result = await ctx.oss.put('dev/' + part.filename, part);
        } catch (err) {
          // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
          await sendToWormhole(part);
          throw err;
        }
      }
      files = Object.assign(files, {
        [fieldname]: result && result.url,
      });
    }
    await this.ctx.model.Banner.findByIdAndUpdate(parts.field._id, Object.assign(files, parts.field));
    await this.success('index');
  }
}

module.exports = UploadController;
