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
	
	//join.html submit버튼 이벤트
	$('#submitButton').click(function() {
		var newID = $('#uId').val();
		var newPassword = $('#uPassword').val();		
		var checkPassword = $('#uPassword2').val();		
		var year = $('#year').val();	
		//1월은 0, 따라서 1빼줌.
		var month = parseInt($('#month').val())-1;
		//날짜 계산 기준이달라서 1더해줘야함
		var day = parseInt($('#day').val())+1;		
		var Email = $('#uEmail').val();		
		//var job = $('#jobOption').val();	
		//유효검사
		var pattSpace = new RegExp(" ");
		if(!newID) alert('Input your ID please');
		else if(pattSpace.test(newID)) alert('" " is not valid!!')
		else if(!newPassword) alert('Input your password please')
		else if(newPassword!=checkPassword) alert('Password and retpyed one must be same!!')
		else if(pattSpace.test(Email)) alert('" " is not valid!!')
		else if(!validEmail(Email)) alert('Please check your Email')
		//else if(job=='check please') alert('Please check your job')
		//db에 내용 저장
		else{
			$.post(
				'/newAccount', 
				{ID:newID,password:newPassword,
				birth:new Date(year,month,day),Email:Email,//job:job
				},
				function(data) {
					if(data) {
						alert('Your account is created successfully')
						location = '/login.html'
					}
					else alert('Sorry Fail to create... \ncheck your ID'); 
					
				},
				'json'
			);			
		}
	});
})


function validEmail(Email) {
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