const Admin = require("../models/adminDao");
const Player = require("../models/playerDao");
const Coach = require("../models/coachDao");
const Parent = require("../models/parentDao");

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

        // Render body just for checking if post work (remove for production)
        /*
        res.render("account", {title: "Create account",
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
        });  
        */      

        switch(req.body.account_type) {
            case "admin":
                const admin = new Admin ({
                    first_name: req.body.first_name, 
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: req.body.password,
                });
        
                // Does the account already exist?
                var ret = Admin.findMe(req.body.email);
                if (!ret) {
                    Admin.create(admin);
                }
                else {
                    res.render("signin", {title: "Sign into your account"});
                }

            case "player":
                const player = new Player ({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: req.body.password,
                });

                Player.create(player);

            case "parent":
                const parent = new Parent ({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: req.body.password,
                });

                Parent.create(parent);

            case "coach":
                const coach = new Coach ({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password:req.body.password,
                })

                Coach.create(coach);
        }
        
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