$('.login-link').click(toggleLoginModule);
$('.signup-button').click(goToSignup);
$('.logout-button').click(doLogout);
$('.signup-box button.close').click(toggleLoginModule);

function toggleLoginModule(){
	$('.signup-box').appendTo('body');
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
	$.ajax({
		url: "/account/login",
		method: "POST"
	}).done(function(data){
		if(data.status == 100){
			location.reload();
		} else {
			$('.signup-box .error-message').css('display', 'inherit');
		}
	});
}