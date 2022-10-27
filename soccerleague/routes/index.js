var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Greenville Soccer League' });
});

/*
router.get("/", function (req, res) {
  res.redirect("/account");
})
*/

module.exports = router;