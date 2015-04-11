//---------
//  Purpose: user controller takes care of displaying user's textbooks,
//           allowing users to delete their own book, or directing user to edit page
//---------
(function(){
  'use strict';
  angular.module('starter.controllers')

  .controller("userCtrl", ['$scope', '$state', '$firebase', 'FirebaseRoot', '$timeout', function($scope, $state, $firebase, FirebaseRoot, $timeout){

    var fireusers_root = new Firebase(FirebaseRoot);
    var fire_textbooks = $firebase(fireusers_root).$asArray();

    // show all the data in firebase
    var authData = fireusers_root.getAuth(); // get user information
    if(authData){
      $scope.userID = authData.facebook.id;
    }

    $scope.wantMoreList = [];
    $scope.userBooks = [];


    if(fireusers_root.getAuth()){
      var query = fireusers_root.orderByChild("userID").equalTo($scope.userID); // find user's books based on userID
      query.on("child_added", function(dataSnapshot) {
        // This will only be called for the last 100 messages
        var item = dataSnapshot.val();
        item.key = dataSnapshot.key();
        $scope.userBooks.push(item);
        $scope.wantMoreList.push(false);
      });

      query.on("child_changed", function(dataSnapshot){
        $timeout(function(){
          var item = dataSnapshot.val(); // each book's information
          item.key = dataSnapshot.key(); // each book's unique key/id
          findBookByTitleAndUpdate(item.key, item);
        });
      });
    }
    else{
      alert('Please Login First');
    }
    function findBookByTitleAndUpdate(key, obj){
      for(var i=0; i<$scope.userBooks.length; i++){
        if($scope.userBooks[i].key===key){
          // start updating book object
          for (var item in $scope.userBooks[i]) {
            var userBook = $scope.userBooks[i];
            userBook[item] = obj[item];
          }
        }
      }
      return 0;
    };


    //--------
    // Purpose: Go to edit page
    //--------
    $scope.toEdit = function(idx){
      var index = $scope.userBooks.length-1-idx;
      var key = $scope.userBooks[index].key;
      $state.go('app.edit',{data_key:key});
    };

    //--------
    // Purpose:Delete book
    //--------
    $scope.removeBook = function(idx){
      var index = $scope.userBooks.length-1 - idx; // use this to find the correct index because ng-repeat reverse the list
      var key = $scope.userBooks[index].key;
      var user_book_root = new Firebase(FirebaseRoot).child(key);
      var user_indi_book = $firebase(user_book_root).$asObject();
      user_indi_book.$loaded().then(function(data) {
        console.log(data.title);
        data.$remove().then(function(ref){
            var id = ref.key();
            console.log(id);
        });
        data.$save();
        // delete item in array
        $scope.userBooks.splice(index, 1);
        $scope.wantMoreList.splice(index, 1);
      });
    };

    //--------
    // Purpose: Show More Information
    //--------
    $scope.wantMore = function(idx){
      var index = $scope.userBooks.length-1 - idx; // use this to find the correct index because ng-repeat reverse the list
      $scope.wantMoreList[index] = !$scope.wantMoreList[index];
    };
    $scope.showMore = function(idx){
      var index = $scope.userBooks.length-1 - idx; // use this to find the correct index because ng-repeat reverse the list
      return $scope.wantMoreList[index];
    };

    console.log("user controller works"); // check whether user controller file accessed sucessfully or not
  }]);
})();
