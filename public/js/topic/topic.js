var app = angular.module("ContentModule", []);

app.controller('TopicController', ['$http', '$scope', function($http, $scope){

  $scope.posts = [];
  $scope.errorReceived = false;

  $scope.orderId = 0;
  $scope.order = ['', 'upvote - downvote', 'creationDate'];

  var topicId = $('.topic-content').attr('topic-id');

  $http.get('/topic/' + topicId + '/posts')
  .success(function(data, status, headers, config){
    if(data.status == 100){
      $scope.posts = data.data;
    } else {
      $scope.errorReceived = true;
    }
  })
  .error(function(data, status, headers, config) {
      alert("An unknown error occured, please try again in a few minutes");
  });

}]);

app.controller('SubmitController', ['$http', '$scope', function($http, $scope){
  $scope.data = {};
  $scope.data.topicId = $('.topic-content').attr('topic-id');
  $scope.didReceiveError = false;
  $scope.errorMessage = "";

  $scope.submit = function(){
    $http.post('/post/submit', $scope.data)
    .success(function(data, status, headers, config) {
      if(data.status == 100){
        document.location.reload();
      } else {
        $scope.didReceiveError = true;
        $scope.errorMessage = data.message;
      }
    }).
    error(function(data, status, headers, config) {
        $scope.didReceiveError = true;
        $scope.errorMessage = "An unknown error occured, please try again in a few minutes";
    });
  };


}]);

