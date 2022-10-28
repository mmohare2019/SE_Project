//import bcrypt from 'react-native-bcrypt'
require('dotenv').config(); //use env constants
const bcrypt = require('bcrypt');

/*
export default class PasswordUtil{
  static hash(strPsw){
    return bcrypt.hashSync(strPsw,8);
  }
  
  static compare(strPsw, hashedPsw){
    return bcrypt.compareSync(strPsw,hashedPsw);
  }
}
*/
