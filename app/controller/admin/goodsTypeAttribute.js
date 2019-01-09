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
    const doc = await this.ctx.model.GoodsType.find() || [];
    console.log('doc :', doc);
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
          _id: this.app.mongoose.Types.ObjectId(_id),
        },
      },
    ]);
    console.log('doc :', doc);
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
