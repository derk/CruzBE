//------------------------------------------------------------
//  Purpose: addBook Controller let user add book to sell book
//------------------------------------------------------------

(function(){
  'use strict';
  angular.module('starter.controllers')

  .controller('addBookCtrl', ['$scope', '$state', '$firebase', 'FirebaseRoot', function($scope, $state, $firebase, FirebaseRoot){

    // Initialization
    var fireusers_root = new Firebase(FirebaseRoot);
    var fire_textbooks = $firebase(fireusers_root).$asArray();
    $scope.new={};
    $scope.new.course="";
    $scope.new.title = "";
    $scope.new.author = "";
    $scope.new.selected = "Used-Good";
    $scope.new.description = "";
    $scope.new.price = "";
    $scope.new.email = "";
    $scope.new.userID = "";

    //---------
    //  Purpose: get data in the addBook's form and save it to database
    //---------
    $scope.save_book = function(){
      // save new book into firebase
      var authData = fireusers_root.getAuth(); // get user information
      if(authData){
        $scope.new.userID = authData.facebook.id;
        var book = {
          course: $scope.new.course,
          title: $scope.new.title,
          author: $scope.new.author,
          condition: $scope.new.selected,
          description: $scope.new.description,
          price: $scope.new.price,
          email: $scope.new.email,
          userID: $scope.new.userID // user's facebook id
        };
        fire_textbooks.$add(book).then(function(ref) {
          var id = ref.key();
          $scope.new.course="";
          $scope.new.title = "";
          $scope.new.author = "";
          $scope.new.selected = "Used-Good";
          $scope.new.description = "";
          $scope.new.price = "";
          $scope.new.email = "";
          $scope.new.userID = "";
        });
        $state.go('app.user');  //  Go to user page
      }
      else{
        //  If user hasn't login yet, tell user to login and go back to home page
        alert("Please Login First");
        $state.go('app.home');
      }
    };
    //---------
    //  Purpose: Cancel the process of creating textbook into selling list
    //---------
    $scope.cancel = function(){
      $state.go('app.home');
    }

    console.log("Add book controller works"); // check whether add book controller file is loaded sucessfully or not
  }]);
})();
