const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const schema = new Schema({
  contactId: {type: String, required: true},
  name: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: String},
  imageUrl: {type: String},
  group: [{type: Schema.Types.ObjectId, ref: "Contact"}]
});

module.exports = mongoose.model("Contact", schema);