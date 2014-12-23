var app = angular.module("IndexModule", []);

app.controller('FeaturedController', ['$http', '$scope', 'urlService', function($http, $scope, urlService){

	$http.get(urlService.getUrl('getFeatured')).
	success(function(data, status, headers, config){
		$scope.categories = data.data;
	});

	$scope.currentCategory = null;

	$scope.setCurrentCategory = function(category){
		$scope.currentCategory = category;
	}

	$scope.submit = function(topic){
		var data = {topic: $('.typeahead').typeahead('val'), category: $scope.currentCategory};

		$http.post(urlService.getUrl('setFeatured'), data)
		.success(function(data, status, headers, config){
			if(data.status == 100) document.location.reload();
			else alert(data.message)
		});
	};

	$scope.removeFeatured = function(topic, category){
		var data = {topic: topic, category: category};

		$http.post(urlService.getUrl('removeFeatured'), data)
		.success(function(data, status, headers, config){
			if(data.status == 100) document.location.reload();
			else alert(data.message)
		});
	}

}]);

app.directive('category', ['$http', function(){
	return {
		restrict:"E",
		scope: {},
		controller: function($http, $scope){
			$scope.category;

			
		}
	};
}]);

