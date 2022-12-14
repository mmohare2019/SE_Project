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

        let newTeam = {};
        newTeam.team_name = req.body.team_name;
        newTeam.color = req.body.color;

       Team.findAndUpdate(req.body.coach, newTeam).then(function (result) {
            res.json(result);
       }).catch((error) => {
            res.status(400).json({error: error});
       });
        
    },
];

exports.find_team_of_coach_post = (req, res, next) => {
    // Extract validation errors from req
    const errors = validationResult(req);
        
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }
    
    Team.findTeam(req.body.coach).then(function (result) {
        res.json(result);
    }).catch((error) => {
        res.status(400).json({error: error});
    });
    
}

exports.add_player_post = (req, res, next) => {
    const errors = validationResult(req);
        
    if (!errors.isEmpty()) {
       return res.status(400).json({errors: errors.array()});
    }

    let coach = req.body.coach;
    let player = req.body.player;

    Team.findTeam(coach).then(function (result) {
        if (result.player1 == undefined) {
            console.log("p1 spot not filled");
            Team.addPlayer1(coach, player).then(function (result) {
                res.json(result);
            }).catch((error) => {
                res.status(400).json({error: error});
            });
            
        }
        else if (result.player2 == undefined)  {
            console.log("p2 spot not filled");
            Team.addPlayer2(coach, player).then(function (result) {
                res.json(result);
            }).catch((error) => {
                res.status(400).json({error: error});
            });
        }
        else if (result.player3 == undefined) {
            console.log("p3 spot not filled");
            Team.addPlayer3(coach, player).then(function (result) {
                res.json(result);
            }).catch((error) => {
                res.status(400).json({error: error});
            });
        }
        else if (result.player4 == undefined) {
            console.log("p4 spot not filled");
            Team.addPlayer4(coach, player).then(function (result) {
                res.json(result);
            }).catch((error) => {
                res.status(400).json({error: error});
            });
        }
        else if (result.player5 == undefined) {
            console.log("p5 spot not filled");
            Team.addPlayer5(coach, player).then(function (result) {
                res.json(result);
            }).catch((error) => {
                res.status(400).json({error: error});
            });
        }
        else if (result.player6 == undefined) {
            console.log("p6 spot not filled");
            Team.addPlayer6(coach, player).then(function (result) {
                res.json(result);
            }).catch((error) => {
                res.status(400).json({error: error});
            });
        }
        else {
            res.json("the team roster is full");
        }
        


    }).catch((error) => {
        res.status(400).json({error: error});
    })
}

exports.display_team_get = (req, res, next) => {
    const errors = validationResult(req);
        
    if (!errors.isEmpty()) {
       return res.status(400).json({errors: errors.array()});
    }

    Team.getAll().then(function (result) {
        res.json(result);
    }).catch((error) => {
        res.status(400).json({error: error.array()});
    });  
}

exports.teamCount = (req,res) =>
{
    const errors = validationResult(req);
        
    var teams = db.collection('');

        teams.find({}).toArray(function (errors, result) {
        if (errors) {
            res.send(errors);
        } else {
            size = result.size();
            res.send(JSON.stringify(size));
        }
    })
}

