const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const RosterSchema = new Schema ({
    player1 : {type: Schema.Types.ObjectId, ref: "User"},
    player2 : {type: Schema.Types.ObjectId, ref: "User"},
    player3 : {type: Schema.Types.ObjectId, ref: "User"},
    player4 : {type: Schema.Types.ObjectId, ref: "User"},
    player5 : {type: Schema.Types.ObjectId, ref: "User"},
    player6 : {type: Schema.Types.ObjectId, ref: "User"},
});

const rosterModel = mongoose.model("Roster", RosterSchema);

exports.create = async function(newRoster) {
    const roster = new rosterModel(newRoster);
    const createdRoster = await roster.save(); 
    return createdRoster;
}

exports.deleteAll = async function() {
    await rosterModel.deleteMany(); 
}

/*
exports.getAll = async function(req, res) {
    res.status(200);
    res.send(await rosterModel.readAll());
    res.end(); 
}
*/