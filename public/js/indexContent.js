var app = angular.module("ContentModule", []);

app.directive('categories', ['$http', function($http, $scope){
	return {
		restrict:"E",
		templateUrl: "/index/category",
		controller: function($http, $scope){

		}
	};
}]);