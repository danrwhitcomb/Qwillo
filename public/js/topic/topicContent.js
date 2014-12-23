var app = angular.module("ContentModule", []);

app.directive('sidebar', ['$http', 'urlService', function($http, urlService, $scope){
  return {
    restrict: 'E',
    templateUrl: urlService.getUrl('topicSidebar') + '/' + document.location.pathname.replace('/topic/', ''),
  }
}]);

app.directive('content', ['$http', 'urlService', function($http, urlService, $scope){
  return {
    restrict:"E",
    templateUrl: urlService.getUrl('topicContent'),
  };
}]);