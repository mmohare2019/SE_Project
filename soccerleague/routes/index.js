var express = require('express');
var router = express.Router();

/* GET home page. */

// Simulating the home page 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Greenville Soccer League' });
});

module.exports = router;