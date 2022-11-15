const mongoose = require("mongoose");
const validateInteger = require('mongoose-integer');
const Schema = mongoose.Schema; 

const GameSchema = new Schema ({
    team1 : {type: Schema.Types.ObjectId, ref: "TeamSchema"},
    team1_score : {type: Number, required: true},
    team2 : {type: Schema.Types.ObjectId, ref: "TeamSchema"},
    team2_score : {type: Number, required: true}
});
QuestionSchema.plugin(validateInteger);

const gameModel = mongoose.model("Game", GameSchema);

exports.create = async function(newGame) {
    const game = new gameModel(newGame);
    const createdGame = await game.save(); 
    return createdGame;
}

exports.deleteAll = async function() {
    await gameModel.deleteMany(); 
}

exports.getAll = async function(req, res) {
    res.status(200);
    res.send(await gameModel.readAll());
    res.end(); 
}
                               
