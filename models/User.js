// models/User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String },
    password: { type: String },
    job: { type: String }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
