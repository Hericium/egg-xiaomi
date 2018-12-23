'use strict';
const Service = require('egg').Service;
const url = require('url');

class AccessService extends Service {
  async authAccess() {
    // 1.忽略
    const ignoreUrl = [ '/admin/captcha', '/admin/doLogin', 'admin/login' ];
    const pathname = url.parse(this.ctx.request.url).pathname;
    // 2.超级管理员
    const { is_super } = this.ctx.locals.userinfo;
    if (ignoreUrl.includes(pathname) || is_super === 1) {
      return true;
    }
    // 3.判断
    const { role_id } = this.ctx.locals.userinfo;
    // RoleAccess
    const docRole = await this.ctx.model.RoleAccess.find({
      role_id,
    });

    // 权限Accessid集合
    const access_ids = [];
    docRole.forEach(item => {
      access_ids.push(item.access_id.toString());
    });

    // Access  判断
    const doc = await this.ctx.model.Access.find({ url: pathname });
    if (access_ids.includes(doc[0]._id.toString())) {
      return true;
    }
    return false;
  }

  async meum() {
    const { role_id } = this.ctx.locals.userinfo;
    // RoleAccess
    const docRole = await this.ctx.model.RoleAccess.find({
      role_id,
    });
    const access_ids = [];
    docRole.forEach(item => {
      access_ids.push(item.access_id.toString());
    });
    // Access  判断
    const doc = await this.ctx.model.Access.aggregate([
      {
        $lookup: {
          from: 'accesses',
          localField: '_id',
          foreignField: 'module_id',
          as: 'items',
        },
      },
      {
        $match: {
          module_id: '0',
        },
      },
    ]);
    doc.forEach(item => {
      if (access_ids.includes(item._id.toString())) {
        item.checked = true;
      }
      item.items.forEach(item1 => {
        if (access_ids.includes(item1._id.toString())) {
          item1.checked = true;
        }
      });
    });
    return doc;
  }

}

module.exports = AccessService;
