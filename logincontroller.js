var app= angular.module("login",[]);
app.controller("loginController", function($scope, $http){
  $scope.username = '';
  $scope.psw = "";
  $scope.submit = function(){
    var data = {username: $scope.username, password: $scope.psw};
    $http.post("localhost:3000/login", data)
    .then(function(data){
      console.log(data);
      window.location.href="index.html";
    }).catch(function(err){
      console.log(err);
      window.location.href="index.html";
    });
  }
});
