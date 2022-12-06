const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const StandingsSchema = new Schema ({
  // numwins
  //num losses
   // team_name : {type: String, maxLength: 100},
   // color : {type: String, maxLength: 100},
    //coach : {type: Schema.Types.ObjectId, ref: "User"},
    //player1 : {type: Schema.Types.ObjectId, ref: "User"},
    //player2: {type: Schema.Types.ObjectId, ref: "User"},
    //player3: {type: Schema.Types.ObjectId, ref: "User"},
    //player4: {type: Schema.Types.ObjectId, ref: "User"},
    //player5: {type: Schema.Types.ObjectId, ref: "User"},
    //player6: {type: Schema.Types.ObjectId, ref: "User"},
    //roster : {type: Schema.Types.ObjectId, ref: "Roster"}
});

const standingsModel = mongoose.model("Standings", StandingsSchema);

exports.create = async function(newStandings) {
    const standings = new standingsModel(newStandings);
    const createdStandings = await standings.save(); 
    return createdStandings;
}
