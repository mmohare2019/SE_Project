const mongoose = require("mongoose");

const Schema = mongoose.Schema; 

const ParentSchema = new Schema({
    first_name : {type: String, required: true, maxLength: 100},
    last_name : {type: String, required: true, maxLength: 100},
    email : { type: String, required: true},
    password : {type: String, required: true}
});

const parentModel = mongoose.model("Parent", ParentSchema);

exports.create = async function(newParent) {
    const parent = new parentModel(newParent);
    const createdParent = await parent.save(); 
    return createdParent;
  }

