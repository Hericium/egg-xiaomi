'use strict';

const BaseController = require('./base');

class ManagerController extends BaseController {

  async index() {
    const manageDoc = await this.ctx.model.Admin.aggregate([{
      $lookup: {
        from: 'roles',
        localField: 'role_id',
        foreignField: '_id',
        as: 'role',
      },
    }]);
    await this.ctx.render('admin/manager/index', {
      doc: manageDoc,
    });
  }

  async add() {
    const roleData = await this.ctx.model.Role.find({}) || [];
    await this.ctx.render('admin/manager/add', {
      roleData,
    });
  }

  async doAdd() {
    const queryData = this.ctx.request.body;
    queryData.password = await this.ctx.service.utils.md5(queryData.password);
    await this.ctx.model.Admin(queryData).save();
    await this.success('index');
  }

  async edit() {
    const _id = this.ctx.request.query._id;
    const doc = await this.ctx.model.Admin.find({ _id });
    const roleData = await this.ctx.model.Role.find();
    await this.ctx.render('admin/manager/edit', {
      doc,
      roleData,
    });
  }

  async doEdit() {
    const _id = this.ctx.request.query._id;
    const doc = this.ctx.request.body;
    if (doc.password) {
      doc.password = await this.service.utils.md5(doc.password);
      await this.ctx.model.Admin.updateOne({ _id }, doc);
    } else {
      console.log(doc);
      await this.ctx.model.Admin.updateOne({ _id }, doc);
    }
    await this.success('index');
  }
}

module.exports = ManagerController;
