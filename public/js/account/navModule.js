var navModule = angular.module("AccountModule", []);

navModule.controller('AccountController', ['$http', '$scope', 'urlService', function($http, $scope, urlService){
      $scope.userSelect = false;

      $scope.selectUsername = function(){
        $scope.userSelect = !$scope.userSelect;
      };

      $scope.logout = function(){
        $http.post(urlService.getUrl('doLogout'), null)
        .success(function(data, status, headers, config){
          document.location.reload();
        });
      }
}]);

navModule.directive("loginModal", ['$http','urlService', function($http, urlService){
  return{
    restrict:'E',
    templateUrl: urlService.getUrl('loginHTML'),
    scope: {},
    controller: function($http, $scope, urlService){
      $scope.creds = {};
      $scope.errorMessage = '';
      $scope.didReceiveError = false;

      $scope.submit = function(){
        $http.post(urlService.getUrl('doLogin'), $scope.creds).
        success(function(data, status, headers, config){
          if(data.status === 100){
            document.location.reload();
          } else {
            $scope.errorMessage = data.message;
            $scope.didReceiveError = true;
          }
        });
      };

    }

  };
}]);

navModule.directive("signupModal", ['$http', 'urlService', function($http, urlService){
  return{
    restrict:'E',
    templateUrl: urlService.getUrl('signupHTML'),
    scope: {},
    controller: function($http,$scope, urlService){
      $scope.creds = {};
      $scope.confirmPassword = '';
      $scope.errorMessage = '';
      $scope.didRecevieError = false;

      $scope.submit = function(){
        if($scope.confirmPassword === $scope.creds.password){

           $http.post(urlService.getUrl('doSignup'), $scope.creds)
           .success(function(data, status, headers, config){
              if(data.status === 100){
                document.location.reload();
              } else {
                $scope.errorMessage = data.message;
                $scope.didRecevieError = true;
              }
            });
        }
      };
    }
  }
}]);

navModule.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
