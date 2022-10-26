const { body, validationResult } = require("express-validator");

const Admin = require("../models/admin");
const Player = require("../models/player");
const Coach = require("../models/coach");
const Parent = require("../models/parent");

exports.account_create_get = (req, res) => {
    res.send("account_form", {title: "Create account"});
}

exports.account_create_post = (req, res, next) => {
    // Create account 
    switch (req.body.account_type)
    {
        case "admin":
            const admin = new Admin({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
            });

            admin.save((err) => {
                if (err) {
                    return next(err);
                }

                res.redirect(admin.url);
            });

            break;

        case "coach":
            const coach = new Coach ({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
            });

            coach.save((err) => {
                if (err) {
                    return next(err);
                }
                res.redirect(coach.url);
            });

            break;

        case "parent":
            const parent = new Parent({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
            });

            parent.save((err) => {
                if (err) {
                    return next(err);
                }
                res.redirect(parent.url);
            });

            break;

        case "player":
            const player = new Player({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
            });

            player.save((err) => {
                if (err) {
                    return next(err);
                }
                res.redirect(player.url);
            })

            break;
    }  
};

exports.signin_get = (req, res)  => {
    res.send("NOT IMPLEMENTED: Sign in GET");
}

exports.signin_post = (req, res) => {
    res.send("NOT IMPLEMENTED: Sign in POST");
}
