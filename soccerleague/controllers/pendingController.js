const Pending = require("../models/pendingDao");
const { body, validationResult } = require("express-validator");
var async = require("async");

exports.new_pending_post = (req, res, next) => {
    const errors = validationResult(req);
        
    if (!errors.isEmpty()) {
       return res.status(400).json({errors: errors.array()});
    }

    let newPending = {
        player: req.body.player,
        team: req.body.team
    };

    Pending.create(newPending).then(function (result) {
        res.json(result);
    }).catch((error) => {
        res.status(400).json({error: error.array()});
    });  
}

exports.list_pending_post = (req, res, next) => {
    const errors = validationResult(req);
        
    if (!errors.isEmpty()) {
       return res.status(400).json({errors: errors.array()});
    }

    let team = req.body.team;

    
    Pending.findPending(team).then(function (result) {
        res.json(result);
    }).catch((error) => {
        res.status(400).json({error: error.array()});
    });
    
}