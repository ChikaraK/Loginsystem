var express = require('express');
var router = express.Router();
var mysql = require('mysql');
//squelizeのモデル読み込み
var models = require("../models");
var User = models.User;
/* GET users listing. */
router.get('/add',(req, res, next) => {
  var data={
  	title:'Users/Add(新規登録)',
  	form:{email:'',password:''},
  	content:'※登録するメールアドレス・パスワードを入力してください。'
  }
  res.render('users/add',data);
});

router.post('/add',(req,res,next)=>{
	var request = req;
	var response = res;
	//今回は、入社テスト用のため、利便性を考えメールアドレス用のバリデーションはしいていません。
	req.check('email','メールアドレスは必ず入力してください。').notEmpty();
	req.check('password','パスワードは必ず入力してください。').notEmpty();
	req.getValidationResult().then((result)=>{
		if(!result.isEmpty()){
			var content = '<ul class="error">';
			var result_arr = result.array();
			for(var n in result_arr){
				content += '<li>' + result_arr[n].msg + '</li>';
			}
			content += '</ul>'
			var data = {
				title: 'User/add（新規登録）',
				content: content,
				form: req.body
			}
			response.render('users/add',data);
		} else {
			request.session.login = null;
			var data ={
			title:'Users/login(ログイン)',
			form:{email:'',password:''},
			content:'メールアドレスとパスワードを入力してください。'
			}
			User.create({
				email:req.body.email,
				password:req.body.password
			}).then((result)=>{res.render('users/login',data);
				});
		}
	});
});

router.get('/',(req,res,next)=>{
	var data ={
		title:'Users/login(ログイン)',
		form:{email:'',password:''},
		content:'メールアドレスとパスワードを入力してください。'
	}
	res.render('users/login',data);
});

router.post('/',(req,res,next) => {
	var request = req;
	var response = res;
	req.check('email','メールアドレスは必ず入力してください。').notEmpty();
	req.check('password','パスワードは必ず入力してください。').notEmpty();
	req.getValidationResult().then((result)=>{
		if(!result.isEmpty()){
			var content = '<ul class="error">';
			var result_arr = result.array();
			for(var n in result_arr){
				content += '<li>' + result_arr[n].msg + '</li>';
			}
			content += '</ul>'
			var data = {
				title: 'User/login（ログイン）',
				content: content,
				form: req.body
			}
			response.render('users/login',data);
		}else{
			var ml = req.body.email;
			var pw = req.body.password;
			User.findOne({
				where: {
					email:ml,
					password: pw
				}
			})
			.then((user)=>{
				if(user == null ){
					var data = {
						title:'再入力',
						content:'<p class="error">名前、またはパスワードが違います。</p>',
						form:req.body
					}
					response.render('users/login',data);
				}else{
					req.session.email = ml;
					var data ={
						title:'Logged in',
						content:'ようこそ' + req.session.email +'さん。',
						logout:"<form method='get' action='/users/logout'>" +
						"<input type='submit' value='ログアウト'></form>"
					}
					response.render('index',data);
				}
			});
		}
	});
});

router.get('/logout',(req,res,next)=>{
	req.session.destroy();
	var data ={
		title:'Users/login(ログイン)',
		form:{email:'',password:''},
		content:'メールアドレスとパスワードを入力してください。'
	}
	res.render('users/login',data);
});

module.exports = router;
