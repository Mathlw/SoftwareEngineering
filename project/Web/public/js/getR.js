$(function() {
	var sample_part = (document.title.toString());
	var disease = []
	var probability = []
	var info = []
	var good = []
	var bad = []
	$.post(
			'/', 
			{},
			function(data) {
				if(data.ID) {
					var ID = data.ID
					$.post(
						'/getdb', 
						{ID:ID,title:sample_part},
						function(data) {
							if(data) {
								var symptom = [];
								for(i=0;i<=data.data.length-1;i++){
									
									for(j=4;j<=14;j++){
										if(Object.values(data.data[i])[j]!=""){
											symptom.push(Object.values(data.data[i])[j]);
										}
									}
								}
								symptom = unique(symptom)
								for(i in symptom){
									
									$("#checkbox").append('<input type="checkbox" id="check'+i+'" name="test" class="col-xs-1" value="'+symptom[i]+'"><div style="font-size:17px;">'+symptom[i]+'<div><br></input>')
								}
								
								$('#showresult').click(function() {
									sendsymptom = [];
									$("input[name=test]:checked").each(function() {
										var value = $(this).val();
										sendsymptom.push(value);
									});
									if(sendsymptom.length==0){
										alert('문답을 체크해주세요')
									} else{
										$("#myModal").modal({backdrop: 'static', keyboard: false});
										$.post(
											'/rscript', 
											{ID:ID,sample_part:sample_part,symptom:sendsymptom},
											function(data) {
												if(data) {
													
													disease = data.disease
													probability = data.probability
													info = data.info
													good = data.good
													bad = data.bad
													
													for(i in disease){
														
														$('#con'+i+'').prepend('<div data-toggle="collapse" data-target="#demo'+i+'" id="disease'+i+'" style="font-weight: bold;font-size:1.5em;color:black;text-align:center;">'+disease[i]+'</div><br>')
														$('#con'+i+'').append('<br><div class="progress progress-striped" id="probability'+i+'"><div  class="progress-bar progress-bar-info" aria-valuemin="0" aria-valuemax="100" role="progressbar" aria-valuenow="'+probability[i]+'" style="width:'+probability[i]+'%;font-size:1em;">'+probability[i]+'%</div></div><br>')
														$('#demo'+i+'').append('<h4 class="bg-warning">질병 설명</h4><p>'+info[i]+'</p><h4 class="bg-warning">좋은 음식</h4><p>'+good[i]+'</p><h4 class="bg-warning">나쁜 음식</h4><p>'+bad[i]+'</p>')
													}

												}
												else alert('꺼져'); 
											},
											'json'
										);
									}
								});
								
								$('#savebutton').click(function() {
									$.post(
										'/savedb',
										{ID:ID,disease:disease,probability:probability,info:info,good:good,bad:bad},
										function(data){
											if(data){
												alert('저장 성공');
											}
										}
									)
								});
								$('#closebutton').click(function() {
									for(i in disease){
										$('#demo'+i+' h4').remove()
										$('#demo'+i+' p').remove()
										$('#demo'+i+' br').remove()
										$('#disease'+i+'').remove()
										$('#probability'+i+'').remove()
										$('#con'+i+' br').remove()
									}
									disease = [];
									probability = [];
								});
								$('#closebutton2').click(function() {
									for(i in disease){
										$('#demo'+i+' h4').remove()
										$('#demo'+i+' p').remove()
										$('#demo'+i+' br').remove()
										$('#disease'+i+'').remove()
										$('#probability'+i+'').remove()
										$('#con'+i+' br').remove()
									}
									disease = [];
									probability = [];
								});
								$('#resultButton').click(function() {
									location = '/mypage.html?result=T'
								});
								
							}
							else alert('DB Error'); 
						},
						'json'
					);
				} else{
					$("#checkbox").append('<h1>로그인 해주세요!</h1>')
				}
			},
			'json'
	);
})

function unique(array){
    return array.filter(function(el, index, arr) {
        return index === arr.indexOf(el);
    });
}