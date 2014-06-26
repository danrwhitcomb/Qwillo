$('#categories').click(toggleCategoriesMenu);

function toggleCategoriesMenu(){
	var $categoriesDiv = $('.categories');

	if($categoriesDiv.height() === 0){
		$categoriesDiv.animate({
			height:'85px',
			paddingTop: '10px',
			paddingBottom: '7px'
		}, 200);
	} else {
		$categoriesDiv.animate({
			height:'0',
			paddingTop: '0',
			paddingBottom: '0'
		}, 200);
	}
}