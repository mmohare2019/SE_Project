const mongoose = require("mongoose");

const Schema = mongoose.Schema; 

const PlayerSchema = new Schema({
    first_name : {type: String, required: true, maxLength: 100},
    last_name : {type: String, required: true, maxLength: 100},
    email : { type: String, required: true},
    password : {type: String, required: true}
});

const playerModel = mongoose.model("Player", PlayerSchema); 

exports.create = async function(newPlayer) {
    const player = new playerModel(newPlayer);
    const createdPlayer = await player.save(); 
    return createdPlayer;
  }
