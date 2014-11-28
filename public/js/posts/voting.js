
function votingButtons(upButton, downButton, postId){

}

function sendUpvote(upButton, postId){
	upButton.click(function(){
		toggleButtons(upButton);
		var data = {
			postId: postId,
		};

		$.ajax({
			data: data,
			url: '/post/up',
			type: 'POST'
		});
	});
}

function sendDownvote(downButton, postId){
	downButton.click(function(){
		toggleButtons(downButton);
		var data = {
			postId: postId,
		};

		$.ajax({
			data: data,
			url: '/post/up',
			type: 'POST'
		});
	});
}

function toggleButtons($buttonClicked){
	var $actionBox = $buttonClicked.parent();
	$actionBox.children('button').each(function(button){
			if(button == $buttonClicked){
				button.addClass('active');
			} else {
				button.removeClass('active');
			}
	});
}


