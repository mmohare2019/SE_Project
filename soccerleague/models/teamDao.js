const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const TeamSchema = new Schema ({
    team_name : {type: String, required: true, maxLength: 100},
    color : {type: String, required: true, maxLength: 100},
    coach : {type: Schema.Types.ObjectId, ref: "User", required: true},
    player : {type: Schema.Types.ObjectId, ref: "User", required: true}
});

const teamModel = mongoose.model("Team", TeamSchema);

exports.create = async function(newTeam) {
    const team = new teamModel(newTeam);
    const createdTeam = await team.save(); 
    return createdTeam;
}

exports.findAll = async function() {
    let teams = await userModel.find();
    return teams;
}