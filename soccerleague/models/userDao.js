const mongoose = require("mongoose");

const Schema = mongoose.Schema; 

const UserSchema = new Schema({
    first_name : {type: String, required: true, maxLength: 100},
    last_name : {type: String, required: true, maxLength: 100},
    account_type : {type: String, required: true},
    email : { type: String, required: true},
    password : {type: String, required: true}
});

const userModel = mongoose.model("User", UserSchema);

exports.create = async function(newUser) {
  const user = new userModel(newUser);
  const createdUser = await user.save(); 
  return createdUser;
}

exports.login = async function(email, pswd) {
  let user = await userModel.findOne({email: email, password: pswd});
  return user;
}

exports.deleteAll = async function() {
  await userModel.deleteMany(); 
}