$('.search-button').click(doMainSearch);

function doMainSearch(){
	if($('.search-bar>input').val() != ''){
		var baseUrl = '/search?q=';
		var text = $('.search-bar>input').val();

		var url = baseUrl + text.replace(/ /g, '+');
		document.location.href = url;
	}
}