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

	request.done(function(){
		document.location.href = '/';
	});

	request.fail(function(jqXHR, textStatus){
		alert(textStatus);
	});

}

function signupSuccess(){
	document.location.href = '/';

}

function signupError(err, textStatus){
	alert(textStatus);
}