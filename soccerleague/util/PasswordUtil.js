import bcrypt from 'react-native-bcrypt'

export default class PasswordUtil{
  static hash(strPsw){
    return bcrypt.hashSync(strPsw,8);
  }
  
  static compare(strPsw, hashedPsw){
    return bcrypt.compareSync(strPsw,hashedPsw);
  }
}
