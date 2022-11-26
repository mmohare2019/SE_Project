var express = require("express");
var router = express.Router(); 

const team_controller = require("../controllers/teamController");

// Create team
router.post("/update", team_controller.update_team_details_post);

// Update team post 
router.post("/initialize", team_controller.initialize_team_post);

module.exports = router;