var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session.email == undefined){
		var data = {
			title:'Not logged in',
			content:'未ログイン',
			logout:''
		}
	}else{
		var data ={
			title:'Logged in',
			content:'ようこそ'+req.session.email+'さん',
			logout:"<form method='get' action='/users/logout'>" +
					"<input type='submit' value='ログアウト'></form>"
		}
	}
	res.render('index', data);
});


module.exports = router;
