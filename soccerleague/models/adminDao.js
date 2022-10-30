const mongoose = require("mongoose");
const passwordUtil = require("../util/PasswordUtil");

const Schema = mongoose.Schema; 

const AdminSchema = new Schema({
    first_name : {type: String, required: true, maxLength: 100},
    last_name : {type: String, required: true, maxLength: 100},
    email : { type: String, required: true},
    password : {type: String, required: true}
});

const adminModel = mongoose.model("Admin", AdminSchema)

exports.readAll = async function() {
  let users = await adminModel.find();
  return users;
}

exports.create = async function(newAdmin) {
  const admin = new adminModel(newAdmin);
  await admin.save(); 
  return user;
}

exports.findMe = async function(admin, email) {
  const myAdmin = new adminModel(admin);
  return myAdmin.findOne({email: email});
}

exports.deleteAll = async function() {
  await adminModel.deleteMany(); 
}