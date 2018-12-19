'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const AdminSchema = new Schema({
    username: {
      type: String,
      required: true,
    },
    password: { type: String, required: true },
    mobile: { type: String },
    email: { type: String },
    status: { type: Number, default: 1 },
    role_id: { type: Schema.Types.ObjectId },
    add_time: {
      type: Date,
      default: Date.now,
    },
    is_super: { type: Number },
  });

  return mongoose.model('Admin', AdminSchema);
};
