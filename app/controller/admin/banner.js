'use strict';
const sendToWormhole = require('stream-wormhole');
const BaseController = require('./base');
class UploadController extends BaseController {
  async index() {
    const doc = await this.ctx.model.Banner.find() || [];
    console.log(doc);
    await this.ctx.render('/admin/banner/index',{
        doc
      }
    );
  } 
  async add() {
    await this.ctx.render('/admin/banner/add');
  }

  async doAdd() {
    const ctx = this.ctx;
    const parts = ctx.multipart();
    let part;
    let files = {};
    let result;
    let fieldname;
    // parts() 返回 promise 对象
    while ((part = await parts()) != null) {
      if (part.length) {
        // 这是 busboy 的字段
        // console.log('field: ' + part[0]);
        // console.log('value: ' + part[1]);
        // console.log('valueTruncated: ' + part[2]);
        // console.log('fieldnameTruncated: ' + part[3]);
      } else {
        if (!part.filename) {
          // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
          // 需要做出处理，例如给出错误提示消息
          return;
        }
        fieldname = part.fieldname;
        // console.log('field: ' + part.fieldname);
        // console.log('filename: ' + part.filename);
        // console.log('encoding: ' + part.encoding);
        // console.log('mime: ' + part.mime);
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
        [part[0]]: part[1],
        [fieldname]: result && result.url,
      });
    }
    const { undefined, _csrf, ...useful } = files;
    await this.ctx.model.Banner(useful).save();
    await this.success('index');
  }
}

module.exports = UploadController;
