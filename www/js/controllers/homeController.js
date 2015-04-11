//---------
//  Purpose: home controller display entire database of textbooks from different users
//  Default: Display Course, Book Title, and Price
//  More:  Display Author, Condition, Description, Contact
//---------

(function(){
  'use strict';
  angular.module('starter.controllers')

  .controller("homeCtrl", ['$scope', '$firebase', 'FirebaseRoot', '$ionicBackdrop', '$timeout', '$ionicPopup',
                          function($scope, $firebase, FirebaseRoot, $ionicBackdrop, $timeout, $ionicPopup) {
    var fireusers_root = new Firebase(FirebaseRoot);
    var fire_textbooks = $firebase(fireusers_root).$asArray();
    // show all the data in firebase
    $scope.allbooks = fire_textbooks;
    $scope.wantMoreList = [];

    // instantiate wantMoreList as false for all data
    fire_textbooks.$loaded().then(function(data) {
      for(var i = 0; i<fire_textbooks.length; i++){
        $scope.wantMoreList.push(false);
      };
    });

    //--------
    // Purpose: Show More Information about a textbook. Activate when blue more button is clicked
    // Included Information: Display Author, Condition, Description, Contact
    //--------
    $scope.wantMore = function(idx){
      var index = $scope.allbooks.length-1 - idx; // use this to find the correct index because ng-repeat reverse the list
      $scope.wantMoreList[index] = !$scope.wantMoreList[index];
    };
    $scope.showMore = function(idx){
      var index = $scope.allbooks.length-1 - idx; // use this to find the correct index because ng-repeat reverse the list
      return $scope.wantMoreList[index];
    };
    console.log("home controller works"); // check whether home controller file is loaded successfully or not
  }]);
})();
