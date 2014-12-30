var app = angular.module("IndexModule", []);

app.controller('TopicsController', ['$http', '$scope', 'urlService', function($http, $scope, urlService){

	$scope.topic = {};

	$scope.getTopic = function(topicName){
		$http.get(urlService.getUrlWithVars('topicData'), [topicName])
		.success(function(data, status, headers, config){
			if(data.status == 100){
				$scope.topic = data.data;
			}
		});
	};


	$scope.setTopic = function(){
		$http.post(urlService.getUrl('topicDataSave'), $scope.topic)
		.success(function(data, status, headers, config){
			if(data.status == 100){
				alert('Data submitted successfully');
			} else {
				alert('An error occured');
			}
		})
	}

}]);