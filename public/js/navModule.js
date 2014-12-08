var navModule = angular.module("HeaderModule", []);

navModule.directive("loginModal", ['$http','urlService', function($http, urlService){
  return{
    restrict:'E',
    templateUrl: urlService.getUrl('domain', 'login'),
    scope: {},
    controller: function($http,$scope, urlService){
      $scope.creds = {};
      $scope.errorMessage = '';
      $scope.didRecevieError = false;

      $scope.submit = function(){
        var url 
        $http.post(urlService.getUrl('api', 'login'), $scope.creds).
        success(function(data, status, headers, config){
          if(data.status === 100){
            document.location.reload();
          } else {
            $scope.errorMessage = data.message;
            $scope.didRecevieError = true;
          }
        });
      };

    }

  };
}]);

navModule.directive("signupModal", ['$http', function(){
  return{
    restrict:'E',
    templateUrl: "/account/signup",
    scope: {},
    controller: function($http,$scope){
      $scope.username = "";
      $scope.password = "";

      $scope.submit = function(){
        alert("Login form submitted");
      };
    }
  }
}]);

