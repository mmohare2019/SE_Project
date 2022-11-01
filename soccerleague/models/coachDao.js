const mongoose = require("mongoose");

const Schema = mongoose.Schema; 

const CoachSchema = new Schema({
    first_name : {type: String, required: true, maxLength: 100},
    last_name : {type: String, required: true, maxLength: 100},
    email : { type: String, required: true},
    password : {type: String, required: true}
});

const coachModel = mongoose.model("Coach", CoachSchema);

exports.create = async function(newCoach) {
    const coach = new coachModel(newCoach);
    const createdCoach = await coach.save(); 
    return createdCoach;
  }

exports.login = async function(email, pswd) {
    let user = await coachModel.findOne({email: email, password: pswd});
    return user;
}