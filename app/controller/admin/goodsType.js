'use strict';
const BaseController = require('./base');
class GoodsTypeController extends BaseController {
  async index() {
    const doc = await this.ctx.model.GoodsType.find() || [];
    await this.ctx.render('/admin/goodsType/index', {
      doc,
    }
    );
  }
  async add() {
    await this.ctx.render('/admin/goodsType/add');
  }
  async doAdd() {
    const doc = this.ctx.request.body;
    console.log('doc :', doc);
    await this.ctx.model.GoodsType(doc).save();
    await this.success('index');
  }

  async edit() {
    const { _id } = this.ctx.request.query;
    const doc = await this.ctx.model.GoodsType.find({ _id });
    await this.ctx.render('/admin/goodsType/edit', {
      doc,
    });
  }
  async doEdit() {
    const { _id } = this.ctx.request.query;
    const doc = this.ctx.request.body;
    await this.ctx.model.GoodsType.findByIdAndUpdate({ _id }, doc);
    await this.success('index');
  }
}

module.exports = GoodsTypeController;
