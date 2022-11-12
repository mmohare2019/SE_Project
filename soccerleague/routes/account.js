var express = require("express");
var router = express.Router(); 

const account_controller = require("../controllers/accountController");

// ACCOUNT ROUTES //
router.post("/", account_controller.account_create_post);

// SIGN IN ROUTES //
router.post("/signin", account_controller.signin_post);

module.exports = router;