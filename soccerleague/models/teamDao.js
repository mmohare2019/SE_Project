const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const TeamSchema = new Schema ({
    team_name : {type: String, required: true, maxLength: 100},
    color : {type: String, required: true, maxLength: 100},
    roster : {type: Schema.Types.ObjectId, ref: "Roster"}
});

const teamModel = mongoose.model("Team", TeamSchema);

exports.create = async function(newTeam) {
    const team = new teamModel(newTeam);
    const createdTeam = await team.save(); 
    return createdTeam;
}

exports.deleteAll = async function() {
    await teamModel.deleteMany(); 
}

exports.getAll = async function(req, res) {
    res.status(200);
    res.send(await rosterModel.readAll());
    res.end(); 
}