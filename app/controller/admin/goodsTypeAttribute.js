'use strict';
const BaseController = require('./base');
class GoodsTypeAttributeController extends BaseController {
  async index() {
    const doc = await this.ctx.model.GoodsTypeAttribute.find() || [];
    await this.ctx.render('/admin/goodsTypeAttribute/index', {
      doc,
    }
    );
  }
  async add() {
    await this.ctx.render('/admin/goodsTypeAttribute/add');
  }
  async doAdd() {
    const doc = this.ctx.request.body;
    console.log('doc :', doc);
    await this.ctx.model.GoodsTypeAttribute(doc).save();
    await this.success('index');
  }

  async edit() {
    const { _id } = this.ctx.request.query;
    const doc = await this.ctx.model.GoodsTypeAttribute.find({ _id });
    await this.ctx.render('/admin/goodsTypeAttribute/edit', {
      doc,
    });
  }
  async doEdit() {
    const { _id } = this.ctx.request.query;
    const doc = this.ctx.request.body;
    await this.ctx.model.GoodsTypeAttribute.findByIdAndUpdate({ _id }, doc);
    await this.success('index');
  }
}

module.exports = GoodsTypeAttributeController;
