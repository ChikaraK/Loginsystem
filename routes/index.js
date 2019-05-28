var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var data = {
		title:'Not logged in',
		content:'未ログイン'
	}
	res.render('index', data);
});

module.exports = router;
