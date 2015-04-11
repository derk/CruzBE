//---------
//  Purpose: user edit controller let user to edit their book information individually
//---------
(function(){
  'use strict';
  angular.module('starter.controllers')

  .controller('editCtrl', ['$scope', '$firebase', 'FirebaseRoot', '$state', '$stateParams', function($scope, $firebase, FirebaseRoot, $state, $stateParams){
    $scope.data_key = $stateParams.data_key; //received the data from userbook when click on edit button
    var fireusers_root = new Firebase(FirebaseRoot).child($scope.data_key);
    var userBook = $firebase(fireusers_root).$asObject();
    // show all the data in firebase

    var authData = fireusers_root.getAuth(); // get user information
    if(authData){
      $scope.userID = authData.facebook.id;
    }

    // initialization
    $scope.new={};
    $scope.new.course="";
    $scope.new.title = "";
    $scope.new.author = "";
    $scope.new.selected = "Used-Good";
    $scope.new.description = "";
    $scope.new.price = "";
    $scope.new.email = "";
    $scope.new.userID = "";

    // load original book information to the form
    userBook.$loaded(function(data){
      $scope.new.course = data.course;
      $scope.new.title = data.title;
      $scope.new.author = data.author;
      $scope.new.condition = data.condition;
      $scope.new.description = data.description;
      $scope.new.price = data.price;
      $scope.new.email = data.email;
      $scope.new.userID = $scope.userID;
    });


    //---------
    //  Purpose: save user's book to the database
    //---------
    $scope.saveBook = function(){
      userBook.course = $scope.new.course;
      userBook.title = $scope.new.title;
      userBook.author = $scope.new.author;
      userBook.condition = $scope.new.condition;
      userBook.description = $scope.new.description;
      userBook.price = $scope.new.price;
      userBook.email = $scope.new.email;
      userBook.userID = $scope.new.userID;
      console.log("-----------");
      console.log($scope.course);
      console.log(userBook.course);
      console.log("-----------");
      userBook.$save().then(function(ref) {
        var id = ref.key();
        $scope.new.course = "";
        $scope.new.title = "";
        $scope.new.author = "";
        $scope.new.selected = "Used-Good";
        $scope.new.description = "";
        $scope.new.price = "";
        $scope.new.email = "";
        console.log('Save Successfully!');
        console.log(userBook);
      });
      $state.go('app.user');
    };

    //---------
    // Purpose: Cancel the edit process
    //---------
    $scope.cancel = function(){
      $state.go('app.user');
    };


    console.log("edit controller works"); // check whether user edit controller file is loaded sucessfully or not

  }]);
})();
