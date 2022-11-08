const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const TeamSchema = new Schema ({
    team_name : {type: String, required: true, maxLength: 100},
    color : {type: String, required: true, maxLength: 100},
    coach : {type: Schema.Types.ObjectId, ref: "User"},
    player : {type: Schema.Types.ObjectId, ref: "User"}
});

const teamModel = mongoose.model("Team", TeamSchema);

exports.create = async function(newTeam) {
    const team = new teamModel(newTeam);
    const createdTeam = await team.save(); 
    return createdTeam;
}

exports.findMyTeam = async function(player) {
    const team = await teamModel.findOne({player: player});
    return team;
}

exports.deleteAll = async function() {
    await teamModel.deleteMany(); 
  }