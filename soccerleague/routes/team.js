var express = require("express");
var router = express.Router(); 

const team_controller = require("../controllers/teamController");

// Create team
router.post("/", team_controller.create_team_post);

// Update team post 

module.exports = router;