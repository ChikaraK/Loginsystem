var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session.email == undefined){
		var data ={
			title:'Users/login(ログイン)',
			form:{email:'',password:''},
			content:'メールアドレスとパスワードを入力してください。'
			}
		res.render('users/login',data);
	}else{
		var data ={
			title:'Logged in',
			content:'ようこそ'+req.session.email+'さん',
			logout:"<form method='get' action='/users/logout'>" +
					"<input type='submit' value='ログアウト'></form>"
		}
		res.render('index', data);
	}

});


module.exports = router;
