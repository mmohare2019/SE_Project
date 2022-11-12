const User = require("../models/userDao");
const { body, validationResult } = require("express-validator");
var async = require("async");

/*
exports.users_coach_get() = (req, res, next) => {
    res.redirect('/coach');
};
*/