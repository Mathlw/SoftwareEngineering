var mongoose = require('mongoose');

exports.login_get = function(req, res){
	if (req.session.login) {
		res.redirect('/');
	} else res.render('login');
};

exports.login_post = function (req, res) {
    var ID = req.body.ID;
    var password = req.body.password;

	var Account = mongoose.model('Account');
	Account.findOne({_id:ID},function(err,account){ 
		if(err) {
			res.send({error:err});
		} else {	
			if(account) {	//기존에 id가 존재한다면,
				//비밀번호 적합성 검사, 맞다면 session부여, client로 true값 전송
				if(account.password==password){
					req.session.login = true;
					req.session.userId = ID;
					res.send({validInfo:true,userId:ID});
				} else {
					res.send({validInfo:false});					
				}	
			} else {	//id가 존재하지 않는다면,
				res.send({validInfo:false});
			}
		}
	});
};

exports.newAccount_post = function (req, res) {
	var Account = mongoose.model('Account');
    var ID = req.body.ID;
    var password = req.body.password;	
    var birth = req.body.birth;	
    var Email = req.body.Email;	
    //var job = req.body.job;	
	var newAccount = new Account({
		_id : ID,
		password: password,
		birth: birth,
		Email: Email,
		//job: job
	});	
	newAccount.save(function(err){
		
		if(err) res.send(false); 
		else res.send(true);
		
	});//save
}

exports.updateAccount_post = function (req, res) {
	var Account = mongoose.model('Account');
    var ID = req.body.ID;
    var password = req.body.password;	
    var birth = req.body.birth;	
    var Email = req.body.Email;	
    //var job = req.body.job;	
	var newAccount = new Account({
		_id : ID,
		password: password,
		birth: birth,
		Email: Email,
		//job: job
	});	
	Account.update({_id:ID},newAccount,function(err){
		
		if(err) res.send(false); 
		else res.send(true);
		
	});//save
}


exports.logout = function(req, res) {
	req.session.destroy(function(err) {
		res.redirect('/index.html');
	});
};

exports.mypage = function(req, res) {
	var ID = req.body.ID;
	
	var Account = mongoose.model('Account');
	Account.findOne({_id:ID},function(err,account){ 
		if(err) {
			res.send({error:err});
		} else {	
			if(account) {	
				res.send({ID:account._id,Email:account.Email,birth:account.birth,created:account.createOn,password:account.password});
				
			} else {	//id가 존재하지 않는다면,
				res.send({validInfo:false});
			}
		}
	});
};

exports.result = function(req, res) {
	var ID = req.body.ID;
	
	var Result = mongoose.model('result');
	Result.find({ID:ID},function(err,result){ 
		if(err) {
			res.send({error:err});
		} else {	
			if(result) {	
				var disease = [];
				var info = [];
				var good = [];
				var bad = [];
				var probability = [];
				var createOn = [];
				
				for(i=0;i<result.length;i++){
					disease[i] = result[i].disease
					probability[i] = result[i].probability
					info[i] = result[i].info
					good[i] = result[i].good
					bad[i] = result[i].bad
					createOn[i] = result[i].createOn
				}
				
				res.send({disease:disease,probability:probability,info:info,good:good,bad:bad,createOn:createOn});
				
			} else {	//id가 존재하지 않는다면,
				res.send({data:false});
			}
		}
	});
};

exports.modify = function(req, res) {
	var ID = req.body.ID;
	
	var Account = mongoose.model('Account');
	Account.findOne({_id:ID},function(err,account){ 
		if(err) {
			res.send({error:err});
		} else {	
			if(account) {
				res.send({ID:account._id,Email:account.Email,birth:account.birth,password:account.password});
				
			} else {	//id가 존재하지 않는다면,
				res.send({validInfo:false});
			}
		}
	});
};

exports.getdb = function(req, res) {
	var ID = req.body.ID;
	var title = req.body.title;
	var data = mongoose.model(''+title+'');
	
	data.find({},function(err,getdata){ 
		if(err) {
			res.send({error:err});
		} else {	
			if(getdata) {	
				res.send({ID:ID,data:getdata});
				
			} else {	//id가 존재하지 않는다면,
				res.send({data:false});
			}
		}
	});
};


exports.savedb = function(req, res) {
	
	var result = mongoose.model('result');
	var allData = mongoose.model('All');
	var ID = req.body.ID;
	var disease = req.body.disease;		
	var probability = req.body.probability;
	var info = req.body.info;
	var good = req.body.good;
	var bad = req.body.bad;
	
	var newResult = new result({
		ID : ID,
		disease : disease,
		probability : probability,
		info : info,
		good : good,
		bad : bad
	});	
	newResult.save(function(err){
		
		if(err) res.send(false); 
		else res.send(true);
		
	});//save
	
};