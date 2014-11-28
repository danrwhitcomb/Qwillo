$('.submit-topic-form').bind('submit', function(event){
	return false;
});
$('.submit-topic-form button').click(submitTopic);
typeAhead();


function typeAhead(){
	var topics = new Bloodhound({
	datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
	queryTokenizer: Bloodhound.tokenizers.whitespace,
	remote: '/topic/query/%QUERY'
	});
	 
	topics.initialize();

	$('#remote .typeahead').typeahead(null, {
		name: 'topics',
		displayKey: 'title',
		source: topics.ttAdapter()
	});
}


function submitTopic(){
	/* TODO: verify inputted data
	if(!validateForm()){
		setMessage("Please enter a value in each ");
	}
	*/

	var send_data = $('.submit-topic-form').serializeArray();

	$.ajax({
		url: '/topic/submit',
		type: 'POST',
		data: send_data

	}).done(function(response){
		if(response.status == 100){
			document.location.href = '/topic/' + send_data[0].value;
		} else {
			$('#topic-error').show();
		}
	}).fail(function(jqXHR, textStatus){
		displayError(textStatus);
	});
}

function validateForm(){
	if('submit-topic-form input')

	if($('.submit-topic-form').val() == null)
		return false;

	return true;
}


function setMessage(message){
	var errorBox = $('.error-box');
	errorBox.show();
	errorBox.text(message);
}