var express = require("express");
var router = express.Router(); 

const team_controller = require("../controllers/teamController");

// Create team
router.post("/update", team_controller.update_team_details_post);

// Update team post 
router.post("/initialize", team_controller.initialize_team_post);

// Display all teams
router.get("/display", team_controller.display_team_get);

module.exports = router;