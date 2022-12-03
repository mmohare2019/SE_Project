const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const TeamSchema = new Schema ({
    team_name : {type: String, maxLength: 100},
    color : {type: String, maxLength: 100},
    coach : {type: Schema.Types.ObjectId, ref: "User"},
    player1 : {type: Schema.Types.ObjectId, ref: "User"},
    player2: {type: Schema.Types.ObjectId, ref: "User"},
    player3: {type: Schema.Types.ObjectId, ref: "User"},
    player4: {type: Schema.Types.ObjectId, ref: "User"},
    player5: {type: Schema.Types.ObjectId, ref: "User"},
    player6: {type: Schema.Types.ObjectId, ref: "User"},
    //roster : {type: Schema.Types.ObjectId, ref: "Roster"}
});

const teamModel = mongoose.model("Team", TeamSchema);

exports.create = async function(newTeam) {
    const team = new teamModel(newTeam);
    const createdTeam = await team.save(); 
    return createdTeam;
}

// Find team based on coach ID
exports.findTeam = async function(coach) {
    let team = await teamModel.findOne({coach: coach});
    return team;
}

// Find team based on coach ID and update team details 
exports.findAndUpdate = async function(coach, update) {
    let team = await teamModel.findOneAndUpdate({coach: coach}, update);
    return team; 
}

exports.deleteAll = async function() {
    await teamModel.deleteMany(); 
}

// display all teams 
exports.getAll = async function() {
    let teams = await teamModel.find();
    return teams; 
}

exports.addPlayer = async function(coach, player) {
    let team = await teamModel.findOneAndUpdate({coach: coach}, {player1: player});
    return team;
}
