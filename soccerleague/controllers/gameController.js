const Game = require("../models/gameDao");
const { body, validationResult } = require("express-validator");

// views live game
async function onViewLiveGame( ) {
  navigation.navigate('ViewScore');
}

exports.game_create_post = (req, res, next) => {
    // extract validation errors from req
    const errors = validationResult(req);
     
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
  
    // new game request for scores
    const newGame = {
      team1_score: req.body.team1_score,
      team2_score: req.body.team2_score
    };
  
    Game.create(newGame).then(function (result) {
        res.json(result);
      
    }).catch((error) => {
        res.status(400).json({error: error.array()});
    });  

};
