$(function() {
	var selectYear = '';
	for(var i = 1910; i<new Date().getFullYear(); i++){
		selectYear+='<option>'+i+'</option>'
	}
	$('#year').append(selectYear);
	var selectMonth = '';
	for(var i = 1; i<13; i++){
		selectMonth+='<option>'+i+'</option>'
	}
	$('#month').append(selectMonth);
	var selectDate = '';
	for(var i = 1; i<31; i++){
		selectDate+='<option>'+i+'</option>'
	}
	$('#day').append(selectDate);
	
	$.post(
			'/', 
			{},
			function(data) {
				if(data) {
					$.post(
						'/modify',
						{ID:data.ID},
						function(data){
							console.log(data);
							
							var date = data.birth
							var year = date.substring(0,4);
							var month = date.substring(5,7);
							if(parseInt(month)<10){
								month = month.substring(1,2)
							}
							var day = date.substring(8,10);							
							
							$("#mId").attr({'value':data.ID})
							$("#mEmail").attr({'value':data.Email})
							$("#year").val(year).attr("selected", "selected");
							$("#month").val(month).attr("selected", "selected");
							$("#day").val(day).attr("selected", "selected");
							
							$("#modifySubmit").click(function(){
								var newID = $('#mId').val();
								var newPassword = $('#mPassword').val();		
								var checkPassword = $('#mPassword2').val();		
								var year = $('#year').val();	
								//1월은 0, 따라서 1빼줌.
								var month = parseInt($('#month').val())-1;
								//날짜 계산 기준이달라서 1더해줘야함
								var day = parseInt($('#day').val())+1;		
								var Email = $('#mEmail').val();		
								//var job = $('#jobOption').val();	
								//유효검사
								var pattSpace = new RegExp(" ");
								if(!newID) alert('Input your ID please');
								else if(pattSpace.test(newID)) alert('" " is not valid!!')
								else if(!newPassword) alert('Input your password please')
								else if(newPassword!=checkPassword) alert('Password and retpyed one must be same!!')
								else if(newPassword==data.password) alert('same password!')
								else if(pattSpace.test(Email)) alert('" " is not valid!!')
								else if(!validEmail(Email)) alert('Please check your Email')
								//else if(job=='check please') alert('Please check your job')
								//db에 내용 저장
								else{
									$.post(
										'/updateAccount', 
										{ID:newID,password:newPassword,
										birth:new Date(year,month,day),Email:Email,//job:job
										},
										function(data) {
											if(data) {
												alert('Your account is updated successfully')
												location = 'mypage.html'
											}
											else alert('Sorry Fail to create... \ncheck your ID'); 
											
										},
										'json'
									);			
								}
							})
						}
					)
				}
			},
			'json'
	);
	
});


function validEmail(Email) {
	if(Email==""){
		return true;
	}
	var EmailPatt = /[\b^@..]/i;
	
	var splitArray = Email.split(EmailPatt);
	if(splitArray.length == 3 || splitArray.length == 4) return true;
	/*
	for(var i in splitArray) {
		if(!splitArray[i]) return false; 
	}
	*/
	return false;
}