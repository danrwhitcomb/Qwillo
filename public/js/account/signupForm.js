$('.submit-signup').click(doSignup);
$('.signup-form').bind('submit', function(event) {
     return false;
});

function doSignup(){
	
	var data = $('.signup-form').serializeArray();
	var sendData = {};
	for (obj in data){
		sendData[obj.name] = obj.value;
	}

	var request = $.ajax({
		url: '/account/create',
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
		alert(textStatus);
	});

}

function setMessage(message){
	var errorBox = $('error-box');
	errorBox.text(message);
}