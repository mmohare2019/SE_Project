const User = require("../models/userDao");
//const passwordUtil = require("../util/PasswordUtil");
const { body, validationResult } = require("express-validator");
var async = require("async");

exports.account_create_get = (req, res, next) => {
    res.render("account", {title: "Create account"}); 
};

exports.account_create_post = [
    // Validate and clean the fields 
    body("first_name", "First name required").trim().isLength({min: 1}).escape(),
    body("last_name", "Last name required").trim().isLength({min: 1}).escape(),
    body("account_type", "Account type required").trim().isLength({min: 1}).escape(),
    body("email", "Email is required").trim().isLength({min: 1}).escape(),
    body("password", "Password is required").trim().isLength({min: 6}).escape(),

    // Process request
    (req, res, next) => {
        // Extract validation errors from req
        const errors = validationResult(req);

        let newUser = {};
        newUser.first_name = req.body.first_name;
        newUser.last_name = req.body.last_name;
        newUser.account_type = req.body.account_type;
        
        // @To Do hash the password before putting into newUser after tested
        // var password = passwordUtil.hashPswd(req.body.password);
        // newUser.password = password;

        newUser.password = req.body.password;
        newUser.email = req.body.email;
        
        User.create(newUser).then(function (result) {
            res.json(result);
        });
    },
];

exports.signin_get = (req, res)  => {
    res.render("signin", { title: "Sign into account"});
};

exports.signin_post =  [
    // Validate and clean fields 
    body("email", "Email is required").trim().isLength({min: 1}).escape(),
    body("password", "Password is required").trim().isLength({min: 6}).escape(),

    // Process request
    (req, res) => {

        // Extract validation errors from req
        const errors = validationResult(req);
        
        // Check credentials 
        User.login(req.body.email, req.body.password).then(function (result) {
            res.json(result);
        });

    },
];