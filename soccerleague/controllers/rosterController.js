const Roster = require("../models/rosterDao");
const { body, validationResult } = require("express-validator");
var async = require("async");

exports.roster_create_post = (req, res, next) => {
    // Extract validation errors from req
    const errors = validationResult(req);
     
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const newRoster = {
        coach: req.body._id
    };

    Roster.create(newRoster).then(function (result) {
        res.json(result);
    }).catch((error) => {
        res.status(400).json({error: error.array()});
    });  
    
};