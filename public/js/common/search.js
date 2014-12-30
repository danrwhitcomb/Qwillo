var app = angular.module('SearchModule', []);

app.controller('SearchController', ['$http', '$scope', function($http, $scope){
	typeAheadSetup(); 
}])

function typeAheadSetup(){
	var topics = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'), 
		queryTokenizer: Bloodhound.tokenizers.whitespace, 
		remote: '/topic/query/%QUERY'
	}); 

	topics.initialize(); 

	$('.search-box.typeahead').typeahead(null, {
		name: 'topics', 
		displayKey: 'title', 
		source: topics.ttAdapter(), 
		templates: {
			suggestion: function(data){ 
				return "<a href='/topic/" + data.title + "'><p>"+ data.title +"</p></a>"; 
			}
		}
	});
}