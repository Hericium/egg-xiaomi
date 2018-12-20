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
    console.log(doc);
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
    if (doc.module_id) {
      doc.module_id = this.app.mongoose.Types.ObjectId(doc.module_id);
    }
    await this.ctx.model.Access(doc).save();
    await this.success('index');
  }

  async edit() {
    await this.ctx.render('admin/access/edit');
  }

  async doEdit() {
    await this.ctx.render('admin/access/edit');
  }
}

module.exports = AccessController;
