const mongoose = require("mongoose");
const validateInteger = require('mongoose-integer');
const Schema = mongoose.Schema; 

const StandingsSchema = new Schema ({
   team : {type: Schema.Types.ObjectId, ref: "TeamSchema"},
   team_wins : {type: Number, required: true},
   team_losses : {type: Number, required: true}
});
QuestionSchema.plugin(validateInteger);

const standingsModel = mongoose.model("Standings", StandingsSchema);

// creation function
exports.create = async function(newStandings) {
    const standings = new standingsModel(newStandings);
    const createdStandings = await standings.save(); 
    return createdStandings;
}

// get all retrieval function
exports.getAll = async function(req, res) {
    res.status(200);
    res.send(await standingsModel.readAll());
    res.end(); 
}
