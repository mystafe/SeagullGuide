const mongoose = require('mongoose');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanGetters = require('mongoose-lean-getters');

const storySchema = new mongoose.Schema(
  {
    content: { type: String, require: false },
    imageUrl: { type: String, require: false },
  },
  { timestamps: true, updatedAt: false }
);

storySchema.plugin(mongooseLeanDefaults);
storySchema.plugin(mongooseLeanVirtuals);
storySchema.plugin(mongooseLeanGetters);

const Story = mongoose.model('Story', storySchema);

module.exports =  Story;
