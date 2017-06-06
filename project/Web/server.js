var express = require('express');
var cons = require('consolidate');
var _ = require('underscore');
var mongoose = require('mongoose');
var db = require('./server/db');
var session = require('express-session');
var bodyParser = require('body-parser')

//var r = require('rserve-client');
var app = express();
var http = require('http');
var auth = require('./server/auth');
var nodemailer = require('nodemailer');
var rscript = require('./server/r');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.engine('html', cons.underscore);

app.set('view engine', 'html');
app.use(express.static('./public'));

app.use('/rscript',rscript)

app.use(session({
	resave: false, // don't save session if unmodified
	saveUninitialized: false, // don't create session until something stored
	secret: 'keyboard cat'
}));

app.post('/', function(req, res){
	if (!req.session.login) {
		res.send({ID:''})
	} else res.send({ID : req.session.userId});
});



app.post('/login', auth.login_post);
app.post('/newAccount', auth.newAccount_post);
app.post('/updateAccount', auth.updateAccount_post);
app.post('/mypage', auth.mypage);
app.post('/result', auth.result);
app.post('/modify', auth.modify);
app.post('/getdb', auth.getdb);
app.post('/savedb', auth.savedb);
app.get('/logout', auth.logout);


app.post('/email', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var subject = req.body.subject;
	var message = req.body.message;
	
		
	// nodemailer
	res.send({name:name,email:email,subject:subject,message:message});
	var smtpTransport = nodemailer.createTransport("SMTP", {
		service: 'Gmail',
		auth: {
			user: 'smtj119',
			pass: 'rb3088^^'
		}
	});
	
	var mailOptions = {
		to: "guitarist-@nate.com",
		subject : subject,
		text: "Name : " + name + "\n Email : "+ email + "\n Subject : " + subject + "\n Message : " + message
	};

	smtpTransport.sendMail(mailOptions, function(error, response){

		if (error){
			console.log(error);
		} else {
			console.log("Message sent : " + response.message);
		}
		smtpTransport.close();
	});
});



/*
app.post('/api/getRText',function(req,res) {
	r.connect('sn4.jbnu.ac.kr', 6311, function(err, client) {			  
		client.evaluate(req.body.cmd, function(err, ans) {
			res.send(ans);
			client.end();
		});
	});	
});
*/

// socketServer.listen(server);
http.createServer(app).listen(80, function () {
    console.log('Server Running at http://127.0.0.1:80');
});