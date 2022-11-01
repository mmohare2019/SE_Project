const mongoose = require("mongoose");

const Schema = mongoose.Schema; 

const AdminSchema = new Schema({
    first_name : {type: String, required: true, maxLength: 100},
    last_name : {type: String, required: true, maxLength: 100},
    email : { type: String, required: true},
    password : {type: String, required: true}
});

const adminModel = mongoose.model("Admin", AdminSchema);

exports.create = async function(newAdmin) {
  const admin = new adminModel(newAdmin);
  const createdAdmin = await admin.save(); 
  return createdAdmin;
}