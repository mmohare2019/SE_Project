//import bcrypt from 'react-native-bcrypt'
require('dotenv').config(); //use env constants
const bcrypt = require('bcrypt');

const saltRounds = 10; 

exports.hashPswd = function(password) {
  let hashPswd = bcrypt.hashSync(password, process.env.SALT);
  return hashPswd;
}

exports.createSalt = function() {
  return bcrypt.genSaltSync(saltRounds);
}