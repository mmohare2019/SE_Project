const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const StandingsSchema = new Schema ({
   team_wins : {type: Number, min: 0},
   team_losses : {type: Number, min: 0}
});

const standingsModel = mongoose.model("Standings", StandingsSchema);

exports.create = async function(newStandings) {
    const standings = new standingsModel(newStandings);
    const createdStandings = await standings.save(); 
    return createdStandings;
}
