$('.submit-post-form').bind('submit', function(event){
	return false;
});
$('.submit-post-button').click(submitPost);

function submitPost(){

	if(!validateForm()){
		setMessage("Please enter a value in each ");
	}


	var send_data = $('.submit-post-form').serializeArray();

	$.ajax({
		url: '/post/submit',
		type: 'POST',
		data: send_data

	}).done(function(response){
		if(response.status == 100){
			document.location.href = '/post/link/' + response.linkId;
		} else {
			displayError(response.status);
		}
	}).fail(function(jqXHR, textStatus){
		displayError(textStatus);
	});
}

function validateForm(){
	if($('.submit-post-form select').val() !== "-- Please Select --")
		return false;

	if($('.submit-post-form').val() == null)
		return false;

	return true;
}

function setMessage(message){
	var errorBox = $('.error-box');
	errorBox.show();
	errorBox.text(message);
}