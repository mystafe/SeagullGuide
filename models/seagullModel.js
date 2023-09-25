const mongoose = require('mongoose');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanGetters = require('mongoose-lean-getters');

const seagullSchema = new mongoose.Schema(
  {
    seagullName: { type: String, required: false },
    urlSlug: { type: String },
    imageUrl: { type: String, required: false },
    isFavorite: { type: Boolean, required: false, default: false },
    isAlive: { type: Boolean, required: false, default: false },
  },
  { timestamps: true }
);

seagullSchema.add({
  expertises: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expertise" }],
});

seagullSchema.plugin(mongooseLeanDefaults);
seagullSchema.plugin(mongooseLeanVirtuals);
seagullSchema.plugin(mongooseLeanGetters);

const Seagull = mongoose.model("Seagull", seagullSchema);
module.exports =  Seagull;
