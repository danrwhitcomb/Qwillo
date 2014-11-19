
function votingButtons(upButton, downButton, postId){
	upButton.click(function(){
		toggleButtons(upButton, downButton);
		var data = {
			postId: postId,
		};

		$.ajax({
			data: data,
			url: '/post/up',
			type: 'POST'
		});
	});

	downButton.click(function(){
		toggleButtons(downButton, upButton);
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

function toggleButtons(buttonClicked, otherButton){
	buttonClicked.addClass('active');
	otherButton.removeClass('active');
}

