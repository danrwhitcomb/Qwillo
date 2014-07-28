function displayError(message){
	var $errorNode = $('.errorNode');
	$('.errorNode p').text(message);
	$errorNode.show();
}