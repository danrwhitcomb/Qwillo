$('.login-link').click(toggleLoginModule);
$('.signup-button').click(goToSignup);
$('.login-button').click(doLogin);
$('.logout-button').click(doLogout);
$('.signup-box button.close').click(toggleLoginModule);

$('.login-form').bind('submit', function(event) {
     return false;
});

function toggleLoginModule(){
	$('.signup-box').appendTo('body');
	$('.signup-box .error-message').css('display', 'none');
	$('.signup-box').toggle();
}

function goToSignup(){
	document.location.href = '/register';
}

function doLogout(){
	$.ajax({
		url: "/account/logout",
		method: "POST"
	}).done(function(data){
		if(data.status == 100){
			location.reload();
		} else {
			displayError(data);
		}
	}).fail(function(err, err2){
		displayError(err2);
	});
}

function doLogin(){
	var send_data = $('.login-form').serialize();

	$.ajax({
		url: "/account/login",
		method: "POST",
		data: send_data
	}).done(function(data){
		if(data.status == 100){
			location.reload();
		} else {
			$('.signup-box .error-message').css('display', 'inherit');
		}
	});
}