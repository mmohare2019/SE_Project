const Team = require("../models/teamDao");
const { body, validationResult } = require("express-validator");
var async = require("async");

// coach sets name and team colors 
exports.create_team_post = [
    body("team_name", "Team name required").trim().isLength({min: 1}).escape(),
    body("color", "Color required").trim().isLength({min: 1}).escape(),

    (req, res, next) => { 
        // Extract validation errors from req
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()});
        }

        let newTeam = {};
        newTeam.team_name = req.body.team_name;
        newTeam.color = req.body.color;

        Team.create(newTeam).then(function(result) {
            res.json(result);
        });

    },
];