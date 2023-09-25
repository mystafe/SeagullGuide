const mongoose = require('mongoose');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanGetters = require('mongoose-lean-getters');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: false },
    fullname: { type: String, required: false },
    email: { type: String, required: false },
    isverified: { type: Boolean, defaultValue: false },
    passwordhash: { type: String },
    passwordtoken: { type: String },
    tokenexpiresin: { type: Date },
  },
  { timestamps: true }
);

userSchema.plugin(mongooseLeanDefaults);
userSchema.plugin(mongooseLeanVirtuals);
userSchema.plugin(mongooseLeanGetters);

const User = mongoose.model('User', userSchema);

module.exports = User;
