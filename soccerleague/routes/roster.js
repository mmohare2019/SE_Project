var express = require("express");
var router = express.Router(); 

const roster_controller = require("../controllers/rosterController");

// CREATE ROSTER ROUTE //
router.post("/", roster_controller.roster_create_post);

module.exports = router;