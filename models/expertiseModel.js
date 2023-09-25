const mongoose = require('mongoose');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanGetters = require('mongoose-lean-getters');

const expertiseSchema = new mongoose.Schema(
  {
    expertiseName: { type: String, required: false },
    urlSlug: { type: String },
    iconUrl: { type: String },
  },
  { timestamps: false }
);

expertiseSchema.add({
  seagulls: [{ type: mongoose.Schema.Types.ObjectId, ref: "Seagull" }],
});


expertiseSchema.plugin(mongooseLeanDefaults);
expertiseSchema.plugin(mongooseLeanVirtuals);
expertiseSchema.plugin(mongooseLeanGetters);

const Expertise = mongoose.model('Expertise', expertiseSchema);

module.exports = Expertise;
