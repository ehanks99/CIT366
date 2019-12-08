var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
  documentId: {type: String, required: true},
  name: {type: String, required: true},
  description: {type: String},
  url: {type: String, required: true}
  // ,
  // children: [{type: Schema.Types.ObjectId, ref: "Document"}]
});

module.exports = mongoose.model("Document", schema);