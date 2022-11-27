const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const TeamSchema = new Schema ({
    team_name : {type: String, maxLength: 100},
    color : {type: String, maxLength: 100},
    coach : {type: Schema.Types.ObjectId, ref: "User"},
    roster : {type: Schema.Types.ObjectId, ref: "Roster"}
});

const teamModel = mongoose.model("Team", TeamSchema);

exports.create = async function(newTeam) {
    const team = new teamModel(newTeam);
    const createdTeam = await team.save(); 
    return createdTeam;
}

// Find team based on coach ID
exports.find = async function(coach) {
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

/*
exports.getAll = async function(req, res) {
    res.status(200);
    res.send(await rosterModel.readAll());
    res.end(); 
}
*/