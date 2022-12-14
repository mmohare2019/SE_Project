const User = require("../models/userDao");
//const passwordUtil = require("../util/PasswordUtil");
const { body, validationResult } = require("express-validator");
var async = require("async");

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
     
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // @To Do hash the password before putting into newUser after tested
        // var password = passwordUtil.hashPswd(req.body.password);
        // newUser.password = password
        
        const newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            account_type: req.body.account_type,
            password: req.body.password,
            email: req.body.email
        };
             
        User.create(newUser).then(function (result) {
            res.json(result);

        }).catch((error) => {
            res.status(400).json({error: error.array()});
        }); 
    },
];

exports.signin_post =  [
    // Validate and clean fields 
    body("email", "Email is required").trim().isLength({min: 1}).escape(),
    body("password", "Password is required").trim().isLength({min: 6}).escape(),

    // Process request
    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        
        User.login(req.body.email, req.body.password).then(function (result) {
            res.json(result);
        }).catch((error) => {
            res.status(400).json({error: error.array()});
        }); 

    },
];

exports.lookup_user_post = (req, res, next) => {
    const errors = validationResult(req);
        
    if (!errors.isEmpty()) {
       return res.status(400).json({errors: errors.array()});
    }

    // array of user ids is passed 
    let user_ids = req.body.user_ids;

    User.returnUsers(user_ids).then(function (result) {
        res.json(result);
    }).catch((error) => {
        res.status(400).json({error: error.array()});
    })
    
}