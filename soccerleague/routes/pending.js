var express = require("express");
var router = express.Router(); 

const pending_controller = require("../controllers/pendingController");

// Create team
router.post("/new", pending_controller.new_pending_post);

// List pending players 
router.post("/list", pending_controller.list_pending_post);

module.exports = router;