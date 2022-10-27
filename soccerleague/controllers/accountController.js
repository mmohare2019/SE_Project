const Admin = require("../models/admin");
const Player = require("../models/player");
const Coach = require("../models/coach");
const Parent = require("../models/parent");

const { body, validationResult } = require("express-validator");

var async = require("async");

exports.account_create_get = (req, res, next) => {
    res.render("account", {title: "Create account"});
};

exports.account_create_post = [
    // Validate and clean the fields 
    body("first_name", "First name required").trim().isLength({min: 1}).escape(),
    body("last_name", "Last name required").trim().isLength({min: 1}).escape(),
    body("email", "Email is required").trim().isLength({min: 1}).escape(),
    body("password", "Password is required").trim().isLength({min: 6}).escape(),

    // Process request
    (req, res, next) => {
        // Extract validation errors from req
        const errors = validationResult(req);

        // Render body just for checking if post work (remove for production)
        /*
        res.render("account", {title: "Create account",
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
        });  
        */

        // Make admin account 
        const admin = new Admin ({
            first_name: req.body.first_name, 
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
        });

        // Check to see if email is already used 
        Admin.findOne({email: req.body.email}).exec(function (err, found_email) {
            if (err) {
                return next(err);
            }

            // If the email exists already, then prompt user to sign in 
            if (found_email) {
                res.render("signin", {title: "Sign into account"});
            } 

            else {
                // Save user to DB
                admin.save(function(err, result) {
                    if (err) {
                        return next(err);
                    }

                    // Prompt user to sign into their account y
                    else {
                        console.log(result);
                        res.render("signin", {title: "Sign into account"});
                    }
                 });
            }
        });

    },
];

exports.signin_get = (req, res)  => {
    res.render("signin", {title: "Sign into account"});
};

exports.signin_post =  [
    // Validate and clean fields 
    body("email", "Email is required").trim().isLength({min: 1}).escape(),
    body("password", "Password is required").trim().isLength({min: 6}).escape(),

    // Process request
    (req, res) => {
        res.render("user_home", {title: "User home page"});
        /*
        res.render("signin", {title: "Sign into account",
            email: req.body.email,
            password: req.body.password,
        });
        */

        // Extract validation errors from req
        const errors = validationResult(req);

        
    },
];