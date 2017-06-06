$(function() {
	if(document.location.href.split("=")[1]=="T"){
		$('#mypage1').removeClass('active');
		$('#mypage2').attr({class:"active"});
		$('#registerform').removeClass('active');
		$('#resultform').attr({class:"tab-pane active"});
	}
	
	
	$.post(
			'/', 
			{},
			function(data) {
				if(data) {
					$.post(
						'/mypage',
						{ID:data.ID},
						function(data){
							
							$('#myId').text(data.ID);
							$('#myEmail').text(data.Email);
							
							var date = data.birth
							var year = date.substring(0,4);
							var month = date.substring(5,7);
							var day = date.substring(8,10);							
							$('#myBirth').text(year + ". " + month + ". " + day);
							
							var date = data.created
							var year = date.substring(0,4);
							var month = date.substring(5,7);
							var day = date.substring(8,10);
							$('#myCreated').text(year + ". " + month + ". " + day);
							$('#modifyButton').click(function() {
								var rePassword = $('#rePassword').val();
								if(data.password == rePassword){									
									location="modify.html"
								} else{
									alert("비밀번호가 다릅니다.");
								}
							});
						}
					)
					$.post(
						'/result',
						{ID:data.ID},
						function(data){
							
							
							disease = data.disease
							probability = data.probability
							info = data.info
							good = data.good
							bad = data.bad

							var createOn = [];
							
							for(i in disease){
								var date = data.createOn[i];
								var year = date.substring(0,4);
								var month = date.substring(5,7);
								var day = date.substring(8,10);
								var hour = date.substring(11,13);							
								
								createOn[i] = year + ". " + month + ". " +day;
								$('#resultbody').append('<h4>'+createOn[i]+'</h4>')
									
								for(j in disease[0]){
									$('#resultbody').append('<div id="con'+i+''+j+'"><div id="demo'+i+''+j+'" class="collapse"></div></div>')
									$('#con'+i+''+j+'').prepend('<div data-toggle="collapse" data-target="#demo'+i+''+j+'" id="disease'+i+'" style="font-weight: bold;font-size:1.5em;color:black;text-align:center;">'+disease[i][j]+'</div>')
									$('#con'+i+''+j+'').append('<br><div class="progress progress-striped"><div class="progress-bar progress-bar-info" aria-valuemin="0" aria-valuemax="100" role="progressbar" aria-valuenow="'+probability[i][j]+'" style="width:'+probability[i][j]+'%;font-size:1em;">'+probability[i][j]+'%</div></div>')
									$('#demo'+i+''+j+'').append('<h4 class="bg-warning">질병 설명</h4><p>'+info[i][j]+'</p><h4 class="bg-warning">좋은 음식</h4><p>'+good[i][j]+'</p><h4 class="bg-warning">나쁜 음식</h4><p>'+bad[i][j]+'</p><br>')
								}
								
							}
						}
					)
				}
			},
		'json'
	);
});