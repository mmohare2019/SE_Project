const mongoose = require("mongoose");

const Schema = mongoose.Schema; 

const CoachSchema = new Schema({
    first_name : {type: String, required: true, maxLength: 100},
    last_name : {type: String, required: true, maxLength: 100},
    email : { type: String, required: true},
    password : {type: String, required: true}
});

exports.create = async function(newCoach) {
    const coach = new adminModel(newCoach);
    await coach.save(); 
    return coach;
  }

