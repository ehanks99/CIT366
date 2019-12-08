var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
  messageId: {type: String, required: true},
  subject: {type: String},
  msgText: {type: String, required: true},
  // sender: {type: Schema.Types.ObjectId, ref: "Contact"}
  sender: {type: String, required: true}
});

module.exports = mongoose.model("Message", schema);