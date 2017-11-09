var app= angular.module("login",[]);
app.controller("loginController", function($scope, $http){
  $scope.username = '';
  $scope.psw = "";
  $scope.submit = function(){
    var data = {username: $scope.username, password: $scope.psw};
    $http.post("localhost:3001/login", data)
    .then(function(data){
      console.log(data);
      console.log("Success");
      // window.location.href="cardsDeck.html";
    }).catch(function(err){
      console.log(err);
      console.log("Err");
      // window.location.href="cardsDeck.html";
    });
  }
});
