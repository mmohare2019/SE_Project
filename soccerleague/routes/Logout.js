var router = express.Router();

router.get('/logout', function(req, res, next) {
	req.logout();
	req.session = null;
	res.redirect('/'); //Redirection to home page
});

module.exports = router;
