var app = angular.module("IndexModule", ['HeaderModule', 'ContentModule']);

app.directive('skeleton', ['$http', 'urlService', function($http, urlService){
	return {
		restrict: 'E',
		templateUrl: urlService.getUrl('skeleton'),
	}
}])