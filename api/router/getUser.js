var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({extended: true});
var db = require('../dbhelper.js');

exports.getUser = function(app) {
	
	app.get('/test', function(request, response){
		db.getData('user',function(res){
			response.send({status:true, msg:'根据商品name获取信息', data:res});
		})
	})

	app.get('/login', function(request, response){
		db.getData('user', function(res){
			response.send({status:true, msg:'获取测试数据', data:res})
		})
	})
}