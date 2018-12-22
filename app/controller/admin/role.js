'use strict';

const BaseController = require('./base');

class RoleController extends BaseController {

  async index() {
    const doc = await this.ctx.model.Role.find({});
    await this.ctx.render('admin/role/index', {
      result: doc,
    });
  }

  async add() {
    await this.ctx.render('admin/role/add');
  }

  // doAdd
  async doAdd() {
    const result = await this.ctx.request.body;
    const { title, description } = result;
    await this.ctx.model.Role({
      title,
      description,
    }).save();
    await this.success('/admin/role/index');
  }

  async edit() {
    const { _id } = this.ctx.request.query;
    const result = await this.ctx.model.Role.findOne({ _id });
    console.log(result);
    await this.ctx.render('admin/role/edit', {
      result,
    });
  }
  async doEdit() {
    const { _id } = this.ctx.request.query;
    console.log(_id);
    const doc = await this.ctx.request.body;
    const { title, description } = doc;
    await this.ctx.model.Role.updateOne({ _id }, {
      title,
      description,
    });
    await this.success('index');
  }

  async auth() {
    const { _id } = this.ctx.request.query;
    console.log(_id);
    // RoleAccess
    const docRole = await this.ctx.model.RoleAccess.find({
      role_id: _id,
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
    console.log(doc);
    await this.ctx.render('admin/role/auth', {
      doc,
      _id,
    });
  }

  async doAuth() {
    const { _id } = this.ctx.request.query;
    // 1删除
    await this.ctx.model.RoleAccess.deleteMany({ role_id: _id });
    // 2 添加
    const { access_node } = this.ctx.request.body;
    for (let index = 0; index < access_node.length; index++) {
      await this.ctx.model.RoleAccess({
        role_id: _id,
        access_id: access_node[index],
      }).save();
    }
    await this.success('auth?_id=' + _id);
  }
}

module.exports = RoleController;
