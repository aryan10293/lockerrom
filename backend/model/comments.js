const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: { type: String, unique: true , required: true},
  date: {type: Date, required: true, default: Date.now()},
  userId: {type: String, required: true},
  name: {type:String, required: true},
  featId: {type: String, required: true}
});


module.exports = mongoose.model("Comment", commentSchema);