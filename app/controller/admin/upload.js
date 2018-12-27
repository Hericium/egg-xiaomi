'use strict';
const Controller = require('egg').Controller;
const fs = require('mz/fs');
const path = require('path');
class UploadController extends Controller {
  async upload() {
    await this.ctx.render('/admin/upload/add', {

    });
  }
  async doUpload() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    const name = 'egg-multipart-test/' + path.basename(file.filename);
    let result;
    try {
      // 处理文件，比如上传到云端
      console.log(name, file.filepath);
      result = await ctx.oss.put(name, file.filepath);
    } finally {
      // 需要删除临时文件
      await fs.unlink(file.filepath);
    }

    ctx.body = {
      url: result.url,
      // 获取所有的字段值
      requestBody: ctx.request.body,
    };
  }
}

module.exports = UploadController;
