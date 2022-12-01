var express = require("express");
var router = express.Router(); 

const account_controller = require("../controllers/accountController");

// Create account
router.post("/", account_controller.account_create_post);

// Sign into account 
router.post("/signin", account_controller.signin_post);

// Lookup user 
router.post("/lookup", account_controller.lookup_user_post);

module.exports = router;