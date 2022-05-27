const mongoose = require("mongoose");
const schema = mongoose.Schema({
  name: { type: String },
  password: { type: String },
  phone: { type: Number },
  
});

module.exports =  mongoose.model("user", schema);
