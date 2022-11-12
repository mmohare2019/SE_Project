var express = require("express");
var router = express.Router(); 

const usersControllers = require("../controllers/usersController");

// Redirects to user account home pages 
router.get("/coach");
router.get("/parent");
router.get("/player");
router.get("/admin");

module.exports = router;