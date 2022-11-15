var express = require("express");
var router = express.Router(); 

const game_controller = require("../controllers/gameController");

// CREATE GAME ROUTE //
router.post("/", roster_controller.game_create_post);

module.exports = router;
