'use strict';
const BaseController = require('./base');
class GoodsTypeAttributeController extends BaseController {
  async index() {
    const { _id } = this.ctx.request.query;
    const doc = await this.ctx.model.GoodsTypeAttribute.aggregate([
      {
        $lookup: {
          from: 'goodstypes',
          localField: 'cate_id',
          foreignField: '_id',
          as: 'goods_type',
        },
      },
      // 匹配到这个数据库下的和_id 相同的
      {
        $match: {
          cate_id: this.app.mongoose.Types.ObjectId(_id),
        },
      },
    ]);
    await this.ctx.render('/admin/goodsTypeAttribute/index', {
      doc,
    });
  }
  async add() {
    const { _id } = this.ctx.request.query;
    console.log('_id :', _id);
    const doc = await this.ctx.model.GoodsType.find() || [];
    await this.ctx.render('/admin/goodsTypeAttribute/add', {
      doc,
    });
  }
  async doAdd() {
    const doc = this.ctx.request.body;
    await this.ctx.model.GoodsTypeAttribute(doc).save();
    await this.success('index');
  }

  async edit() {
    const { _id } = this.ctx.request.query;
    const docType = await this.ctx.model.GoodsTypeAttribute.find({ _id });
    const docAttr = await this.ctx.model.GoodsType.find() || [];
    console.log('docType, docAttr :', docType);
    await this.ctx.render('/admin/goodsTypeAttribute/edit', {
      docType,
      docAttr,
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
