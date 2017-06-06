var express = require('express');
var router = express.Router();
var child_process = require('child_process');
var exec = child_process.exec;
var mongoose = require('mongoose');


router.post('/',(req,res) => {
	var ID = req.body.ID;
	var sample_part = req.body.sample_part;
	var symptom = req.body.symptom;
	
	var cmd = 'Rscript ./public/rscript/clust_function2.r ' + 
		sample_part.toString();
		
	for(i=0;i<symptom.length;i++){
		cmd = cmd + " " + symptom[i].toString();
	}
	
	exec(cmd,({encoding:'utf-8'}), (error,stdout,stderr) => {
		if(error){
			console.error(error);
			return;
		} else{
			var splitdata = stdout.split('"')
			var disease = [];
			var probability = [];
			
			
			disease.push(splitdata[1])
			disease.push(splitdata[5])
			disease.push(splitdata[9])
			disease.push(splitdata[13])
			disease.push(splitdata[17])
			
			probability.push(splitdata[3])
			probability.push(splitdata[7])
			probability.push(splitdata[11])
			probability.push(splitdata[15])
			probability.push(splitdata[19])
			
			var search = mongoose.model('All');
			
			search.find({$or:[ {'질병':disease[0]}, {'질병':disease[1]},
				{'질병':disease[2]},{'질병':disease[3]},{'질병':disease[4]}]},function(err,searchResult){
				if(err) {
					
				} else {	
					var disease2 = [];
					var info = [];
					var good = [];
					var bad = [];
					for(i=0;i<searchResult.length;i++){
						for(j=0;j<searchResult.length;j++){
							if(disease[i]==searchResult[j].질병){
								disease2[i] = searchResult[j].한글
								info[i] = searchResult[j].간단한설명
								good[i] = searchResult[j].좋은음식
								bad[i] = searchResult[j].꺼려야할음식
							}
						}
					}
					res.send({disease:disease2,probability:probability,sample_part:sample_part,symptom:symptom,info:info,good:good,bad:bad})
				}
			})	
		}
		
	})
})

module.exports = router;