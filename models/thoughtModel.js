const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thoughtsSchema = new Schema({
  prompt: {type: String},
});

const thoughts = mongoose.model("thoughts", thoughtsSchema);

module.exports = thoughts;