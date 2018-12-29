'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const BannerSchema = new Schema({
    title: { type: String },
    type: { type: Number }, // 1.网站 2.app 3.小程序
    focus_img: { type: String },
    link: { type: String }, // 跳转地址
    sort: { type: Number },
    status: { type: Number, default: 1 },
    add_time: {
      type: Date,
      default: Date.now,
    },
  });

  return mongoose.model('Banner', BannerSchema);
};
