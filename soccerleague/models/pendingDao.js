const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const PendingSchema = new Schema ({
    player : {type: Schema.Types.ObjectId, ref: "User"},
    team : {type: Schema.Types.ObjectId, ref: "Team"}
});

const pendingModel = mongoose.model("Pending", PendingSchema);

exports.create = async function(pendingPlayer) {
    const pending = new pendingModel(pendingPlayer);
    const createdPending = await pending.save(); 
    return createdPending;
}

exports.findPending = async function(team) {
    let players = await pendingModel.find({team: team}).exec();
    return players;
}

exports.deletePending = async function(player) {
    await pendingModel.deleteOne({player: player});
}