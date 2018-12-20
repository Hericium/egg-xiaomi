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
    const _id = this.ctx.request.query;
    // 显示access 的数据
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
    await this.ctx.render('admin/role/auth', {
      doc,
      _id,
    });
  }
  async doAuth() {
    const _id = this.ctx.request.query;
    const access_node = this.ctx.request.body;
    console.log(access_node);
  }

}

module.exports = RoleController;
