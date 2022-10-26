const express = require('express');
const router  = express.Router();
const accountController = require('../controllers/account');

router.get('/account', accountController.getAccount);
router.post('/account', accountController.getAccount);

module.exports = router;