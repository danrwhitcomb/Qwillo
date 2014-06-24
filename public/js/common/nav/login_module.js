$('.login-link').click(toggleLoginModule);

function toggleLoginModule(){
	var $login = $('.login');
	var $loginLink = $('.login-link');

	if($login.css('display') == 'none'){
		$login.css('display', 'inherit');
		$login.css('left', $loginLink.offset().left);
	} else {
		$login.css('display', 'none');
	}
}