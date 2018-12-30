'use strict';

const BaseController = require('./base');

class AccessController extends BaseController {
  async index() {
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
    await this.ctx.render('admin/access/index', {
      doc,
    }
    );
  }

  async add() {
    const doc = await this.ctx.model.Access.find({ module_id: '0' }) || [];
    await this.ctx.render('admin/access/add', {
      doc,
    });
  }

  async doAdd() {
    const doc = this.ctx.request.body;
    console.log(doc);
    if (doc.module_id !== '0') {
      doc.module_id = this.app.mongoose.Types.ObjectId(doc.module_id);
    }
    await this.ctx.model.Access(doc).save();
    await this.success('index');
  }

  async edit() {
    const _id = this.ctx.request.query._id;
    const queryDoc = await this.ctx.model.Access.find({ _id });
    // 为0的模块
    const doc = await this.ctx.model.Access.find({ module_id: '0' }) || [];
    await this.ctx.render('admin/access/edit', {
      doc,
      queryDoc,
    });
  }

  async doEdit() {
    const _id = this.ctx.request.query._id;
    const doc = this.ctx.request.body;
    if (doc.module_id) {
      doc.module_id = this.app.mongoose.Types.ObjectId(doc.module_id);
    }
    await this.ctx.model.Access.updateOne({ _id }, doc);
    await this.success('index');
  }
}

module.exports = AccessController;
