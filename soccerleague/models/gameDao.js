const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const GameSchema = new Schema ({
    team1 : {type: Schema.Types.ObjectId, ref: "TeamSchema"}
    team2 : {type: Schema.Types.ObjectId, ref: "TeamSchema"}
});
                               
