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
       
        let newUser = {};
        newUser.first_name = req.body.first_name;
        newUser.last_name = req.body.last_name;
        newUser.password = req.body.password;
        newUser.email = req.body.email;

        switch(req.body.accout_type) {
            case "admin":
                Admin.create(newUser);
                break;

            case "parent":
                Parent.create(newUser);
                break;

            case "player":
                Player.create(newUser);
                break;

            case "coach":
                Coach.create(newUser);
                break;
        }
        console.log("New user created");
        //Admin.create(newAdmin);
        //res.redirect("signin", { title: "Sign into account"});

        /*
        switch(req.body.account_type) {
            
        
                // Does the account already exist?
                var ret = Admin.findMe(req.body.email);
                if (!ret) {
                    Admin.create(admin);
                }
                else {
                    res.render("signin", {title: "Sign into your account"});
                }

        }
        */
        
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