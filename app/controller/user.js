'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 添加
  async add() {
    const user = await new this.ctx.model.User({
      userName: 'zhangsan',
      password: '123',
    });
    await user.save();

  }
  // 获取
  async index() {
    const user = await this.ctx.model.User.find({});
    console.log(user);
  }
  // 修改
  async update() {
    await this.ctx.model.User.updateOne({ _id: '5bfe3209e7147e9743f2a422' }, {
      userName: 'zhangsan',
      password: '1234',
    }, (err, doc) => {
      if (err) {
        return;
      }
      console.log(doc);
    });
  }
  // 删除
  async remove() {
    const user = await this.ctx.model.User.deleteOne({ _id: '5bfe3209e7147e9743f2a422' });
  }
}

module.exports = UserController;
