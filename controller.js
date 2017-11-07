var app = angular.module("cardOFdeck", ['ui.sortable']);
app.controller("deckController", function($scope){
  $scope.name = "name";
  $scope.clubCards = [], $scope.heartCards = [], $scope.diamondCards = [], $scope.spadeCards = [];
  $scope.houseConstants = {
    "CLUB" : "Club",
    "HEART" : "Heart",
    "DIAMOND" : "Diamond",
    "SPADE" : "Spade",
  }
  var tmpList = [];
  $scope.list = tmpList;
  $scope.sortingLog = [];


  var Cards = function(id, index, house){
    this.id = id;
    this.index = index;
    this.house = house;
  }

  var createDate = function(){

    $scope.clubCards.push(new Cards("Real"+$scope.houseConstants.CLUB, 0,   $scope.houseConstants.CLUB));
    $scope.heartCards.push(new Cards("Real"+$scope.houseConstants.HEART, 0,   $scope.houseConstants.HEART));
    $scope.diamondCards.push(new Cards("Real"+$scope.houseConstants.DIAMOND, 0,   $scope.houseConstants.DIAMOND));
    $scope.spadeCards.push(new Cards("Real"+$scope.houseConstants.SPADE, 0,   $scope.houseConstants.SPADE));

    $scope.allCards = {};
    for(var key in $scope.houseConstants){
      var house = $scope.houseConstants[key];
      for(var i=1; i<=13; i++){
        var card = new Cards(i+house, i, house);
        $scope.allCards[i+house] = card;
      }
    }
  }
  createDate();

  for (var i = 1; i <= 6; i++){
    tmpList.push({
      text: 'Item ' + i,
      value: i
    });
  }

  $scope.drag = function(ev) {
    console.log(ev.target.id);
    ev.dataTransfer.setData("text", ev.target.id);
  }

  $scope.allowDrop = function(ev) {
    ev.preventDefault();
  }

  $scope.drop = function(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }

  var droppedItemId = "";

  $scope.sortableOptions = {
    activate: function() {
        console.log("activate");
    },
    beforeStop: function() {
        console.log("beforeStop");
    },
    change: function() {
        console.log("change");
    },
    create: function() {
        console.log("create");
    },
    deactivate: function() {
        console.log("deactivate");
    },
    out: function() {
        console.log("out");
    },
    over: function() {
        console.log("over");
    },
    receive: function() {
        console.log("receive");
    },
    remove: function() {
        console.log("remove");
    },
    sort: function() {
        console.log("sort");
    },
    start: function() {
        console.log("start");
    },
    update: function(e, ui) {
      console.log("update");
      console.log(e);
      console.log(ui);
      var logEntry = tmpList.map(function(i){
        return i.value;
      }).join(', ');
      $scope.sortingLog.push('Update: ' + logEntry);
    },
    stop: function(e, ui) {
      console.log("stop");
      console.log(e);
      console.log(ui);

      var item = $scope.allCards[ui.item[0].id];
      if(item.house == "Club"){
        var stackIndex = $scope.clubCards[$scope.clubCards.length-1].index;
        if(item.index == (stackIndex+1)){
          $scope.clubCards.push(item);
          delete $scope.allCards[ui.item[0].id];
        }
      }else if (item.house == "Heart") {
        var stackIndex = $scope.heartCards[$scope.heartCards.length-1].index;
        if(item.index == (stackIndex+1)){
          $scope.heartCards.push(item);
          delete $scope.allCards[ui.item[0].id];
        }
      }else if (item.house == "Diamond") {
        var stackIndex = $scope.diamondCards[$scope.diamondCards.length-1].index;
        if(item.index == (stackIndex+1)){
          $scope.diamondCards.push(item);
          delete $scope.allCards[ui.item[0].id];
        }
      }else if (item.house == "Spade") {
        var stackIndex = $scope.spadeCards[$scope.spadeCards.length-1].index;
        if(item.index == (stackIndex+1)){
          $scope.spadeCards.push(item);
          delete $scope.allCards[ui.item[0].id];
        }
      }
      // this callback has the changed model
      // var logEntry = tmpList.map(function(i){
      //   return i.value;
      // }).join(', ');
      // $scope.sortingLog.push('Stop: ' + logEntry);
      $scope.$apply();
    }
  };

  $scope.drag = function(){
    alert("Jelo");
  }

  $scope.restartPlay = function(){
    $scope.clubCards = [], $scope.heartCards = [], $scope.diamondCards = [], $scope.spadeCards = [];
    createDate();
  }

});
