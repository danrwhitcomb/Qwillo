var app = angular.module('NavModule');

app.controller('LoginController', ['$http', '$scope', function($http,$scope){
	$scope.username = "";
	$scope.password = "";

	$scope.submit = function(){
		alert("Login form submitted");
	};
}]);
