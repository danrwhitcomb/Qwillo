var app = angular.module("ContentModule", []);

app.controller('TopicController', ['$http', '$scope', function($http, $scope){

  //Post Handlers
  $scope.postData = [];
  $scope.postsErrorReceived = false;
  $scope.arePostsLoaded = [false, false, false];

  $scope.orderId = 0;
  $scope.order = ['', 'upvote - downvote', 'creationDate'];

  var topicId = $('.topic-content').attr('topic-id');

  $http.get('/topic/' + topicId + '/posts/top')
  .success(function(data, status, headers, config){
    if(data.status == 100){
      $scope.arePostsLoaded[0] = true;
      $scope.postData[0] = data.data;
    } else {
      $scope.postsErrorReceived = true;
    }
  })
  .error(function(data, status, headers, config) {
      alert("An unknown error occured, please try again in a few minutes");
  });

  $scope.loadPosts = function(type){

    if($scope.arePostsLoaded[type]) return;

    var url = "/topic/" + topicId + "/posts/";
    if(type = 0) url += "top";
    else if(type = 1) url += "hot";
    else if(type = 2) url += "new";

    $http.get(url).success(function(data, status, headers, config){
      if(data.status == 100){
        $scope.postData[type] = data.data;
      } else {
        $scope.postsErrorReceived = true;
      }
    });
  }

  //Voting Handlers
  $scope.upvote = function(post, $event){

    var upvoteData = {};
    upvoteData.post = post._id;
    $http.post('/post/upvote', upvoteData);

    if(post.isVote == 1) {
      post.upvote--;
      post.isVote = 0;
    } else if(post.isVote == -1){
      post.downvote--;
      post.upvote++;

      post.isVote = 1;
    } else {
      post.upvote++;
      post.isVote = 1;

    }
  };

   $scope.downvote = function(post, $event){

     var downvoteData = {};
     downvoteData.post = post._id;
     $http.post('/post/downvote', downvoteData);

    if(post.isVote == -1) {
      post.downvote--;
      post.isVote = 0;
    } else if(post.isVote == 1){
      post.upvote--;
      post.downvote++;
      post.isVote = -1;
    } else {
      post.downvote++;
      post.isVote = -1;
    }
  }

  //Label Handlers
  $scope.labelData = {};
  $scope.labelErrorReceived = false;
  $scope.createdLabel = false;
  $scope.labelData.topic = topicId;

  $scope.createLabel = function(){
    $http.post('/topics/labels/createrequest', $scope.labelData)
    .success(function(data, status, headers, config){
      if(data.status == 100){
        $scope.createdLabel = true;
        $('#label-modal').foundation('reveal', 'close');
      } else {
        $scope.labelErrorReceived = true;
      }
    })
    .error(function(data, status, headers, config) {
        $scope.didReceiveError = true;
        $scope.errorMessage = "An unknown error occured, please try again in a few minutes";
    });
  };

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

