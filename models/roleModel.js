const mongoose = require('mongoose');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanGetters = require('mongoose-lean-getters');


const roleSchema = new mongoose.Schema(
  {
    rolename: { type: String, required: false },
  },
  { timestamps: false }
);

roleSchema.plugin(mongooseLeanDefaults);
roleSchema.plugin(mongooseLeanVirtuals);
roleSchema.plugin(mongooseLeanGetters);

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
