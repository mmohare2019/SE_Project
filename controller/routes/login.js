const express = require('express');
const router  = express.Router();
const accountController = require('../controllers/login');

router.get('/login', accountController.getLogin);
router.post('/login', accountController.postLogin);

module.exports = router;