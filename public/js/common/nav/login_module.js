$('.login-link').click(toggleLoginModule);
$('.signup-button').click(goToSignup);

function toggleLoginModule(){
	var $login = $('.login');
	var $loginLink = $('.login-link');

	if($login.css('display') == 'none'){
		$login.css('display', 'inherit');
		$login.css('left', $loginLink.offset().left + $loginLink.width() - $login.width());
	} else {
		$login.css('display', 'none');
	}
}

function goToSignup(){
	document.location.href = '/register';
}