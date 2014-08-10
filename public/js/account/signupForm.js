$('.submit-signup').click(doSignup);
$('.signup-form').bind('submit', function(event) {
     return false;
});

function doSignup(){
	
	var data = $('.signup-form').serializeArray();

	var request = $.ajax({
		url: '/register',
		data: data,
		type: 'POST',
	});

	request.done(function(response){
		if(response.status != 100){
			setMessage(response.status.userMessage);
		} else {
			document.location.href = '/';
		}
	});

	request.fail(function(jqXHR, textStatus){
		displayError(textStatus);
	});

}

function setMessage(message){
	var errorBox = $('.error-box');
	errorBox.show();
	errorBox.text(message);
}we