var mongoose = require('mongoose');

//db server에 접속
var db = mongoose.connect('mongodb://localhost/software');
var Schema = mongoose.Schema ,ObjectId = Schema.ObjectId; 

//계정정보
var accountSchema = new Schema({
	_id : String,
	password : String,
	Email : String,
	birth : { type: Date}, 
	createOn : { type: Date, default: Date.now }
});

//data

var Allschema = new Schema({
	_id: String,
	부위 : String,
	한글 : String,
	질병 : String,
	증상1 : String,
	증상2 : String,
	증상3 : String,
	증상4 : String,
	증상5 : String,
	증상6 : String,
	증상7 : String,
	증상8 : String,
	증상9 : String,
	증상10 : String,
	증상11 : String,
	간단한설명 : String,
	좋은음식 : String,
	꺼려야할음식 : String,
});


//진단결과
var resultSchema = new Schema({
	ID : String,
	disease : [],
	probability : [],
	info : [],
	good : [],
	bad : [],
	createOn : { type: Date, default: Date.now }
});

mongoose.model('Account', accountSchema);

mongoose.model('All', Allschema);
mongoose.model('Head/Neck', Allschema);
mongoose.model('Upper', Allschema);
mongoose.model('Lower', Allschema);
mongoose.model('Whole', Allschema);

mongoose.model('result', resultSchema);



// var svgDataSchema = new Schema({
	// tagName:String,
	// attrs:Object,
	// transform:String
// });

// var saveDataSchema = new Schema({
	// _id : String,
	// password:String,
	// createOn : { type: Date, default: Date.now },
	// svgData: [svgDataSchema]
// });

// mongoose.model('saveData', saveDataSchema);