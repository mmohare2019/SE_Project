var express = require("express");
var router = express.Router(); 

const team_controller = require("../controllers/teamController");

// Create team
router.post("/update", team_controller.update_team_details_post);

// Update team post 
router.post("/initialize", team_controller.initialize_team_post);

// find coach's teaam
router.post("/find", team_controller.find_team_of_coach_post);

// temp make pending 
router.post("/")

// Display all teams
router.get("/display", team_controller.display_team_get);

// Add player to team
router.post("/add", team_controller.add_player_post);

module.exports = router;