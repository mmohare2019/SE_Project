const Team = require("../models/teamDao");
const { body, validationResult } = require("express-validator");
var async = require("async");

// Initialize a team with a coach 
exports.initialize_team_post = (req, res, next) => {
    const errors = validationResult(req);
        
    if (!errors.isEmpty()) {
       return res.status(400).json({errors: errors.array()});
    }

    let newTeam = {
        coach: req.body._id
    };

    Team.create(newTeam).then(function (result) {
        res.json(result);
    }).catch((error) => {
        res.status(400).json({error: error.array()});
    });  
    
}

// coach sets name and team colors 
exports.update_team_details_post = [
    body("team_name", "Team name required").trim().isLength({min: 1}).escape(),
    body("color", "Color required").trim().isLength({min: 1}).escape(),

    (req, res) => { 
        // Extract validation errors from req
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()});
        }

        console.log("Controller");
        console.log(req.body.coach);

        Team.find(req.body.coach).then(function (result) {
            res.json(result);

        }).catch((error) => {
            res.status(400).json({error: error});
        });
    
        

        /*
        let newTeam = {};
        newTeam.team_name = req.body.team_name;
        newTeam.color = req.body.color;

        Team.create(newTeam).then(function(result) {
            res.json(result);
        });
        */

        
    },
];