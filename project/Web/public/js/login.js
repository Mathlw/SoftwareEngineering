//http://www.w3schools.com/bootstrap/bootstrap_alerts.asp 알람바꾸기
//http://www.w3schools.com/bootstrap/bootstrap_forms_inputs2.asp 에러 페이지
//http://www.w3schools.com/bootstrap/bootstrap_forms_sizing.asp 인풋 사이즈
$(function() {
	$.post(
			'/', 
			{},
			function(data) {
				if(data.ID) {
					$('.login').text("Sign out");
					$('.login').attr({'href':'/logout'})
					
					$('.join').text("MyPage");
					$('.join').attr({'href':'/mypage.html'});
				}
			},
			'json'
	);
	
	//login.html ok버튼
	$('#okButton').click(function() {
		var ID = $('#uId').val();
		var password = $('#uPassword').val();
		
		$.post(
			'/login', 
			{ID:ID,password:password},
			function(data) {
				if(data.validInfo) {
					//$('.login').text('Logout');
					location = '/index.html'
				}
				else alert('Plese check your ID or Password!');
			},
			'json'
		);
	});
	//로그인 페이지 Register 버튼
	$('#login_register_btn').click(function() {
		location = "/join.html"
	})
	
});
