var express = require("express");
var router = express.Router(); 

const account_controller = require("../controllers/accountController");

// ACCOUNT ROUTES //
router.get("/", account_controller.account_create_get);

router.post("/", account_controller.account_create_post);

// SIGN IN ROUTES //
router.get("/signin", account_controller.signin_get);

router.post("/signin", account_controller.signin_post);

module.exports = router;