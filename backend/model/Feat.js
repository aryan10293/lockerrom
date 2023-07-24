const mongoose = require("mongoose");

const featSchema = new mongoose.Schema({
  text: { type: String, required: true},
  date: {type: Date, required: true, default: Date.now},
  likes: {type: Array, required: true, default: []},
  reFeats: {type: Array, required: true, default: []},
  userId: {type: String, required: true},
  img: {type: String},
  profileImg: {type: String, required: true},
  userName: {type:String, required: true},
  comments: {type: Array, required: true, default: []}
});


module.exports = mongoose.model("Feat", featSchema);