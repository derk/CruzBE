//---------------------------------------------------------------------------------
//  Purpose: App Controller takes care of FB Login/logout, and shortcut to Add Book
//---------------------------------------------------------------------------------

angular.module('starter.controllers', [])
.filter('reverse', function(){
  return function(array){
    var rev = new Array;
    for(var i = array.length-1; i>=0; i--) {
      rev.push(array[i]);
    }
    return rev
  }
})
.controller('AppCtrl', ['$scope', '$firebase', 'FirebaseRoot', '$state', '$ionicModal', '$timeout', '$window',
                        function($scope, $firebase, FirebaseRoot, $state, $ionicModal, $timeout,$window) {
  // Form data for the login modal
  $scope.loginData = {};
  var fireusers_root = new Firebase(FirebaseRoot);
  var fire_textbooks = $firebase(fireusers_root).$asArray();

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  //---------
  //  Purpose: Direct user to Add Book page to add new book
  //---------
  $scope.goToAddBook = function(){
    $state.go("app.addBook");
  };

  //---------
  //  Purpose: Login Form Popup
  //  Functions: closeLogin(), login(), doLogin()
  //---------

  //  closeLogin(): Triggered in the login model to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
  //  login(): Open the login model
  $scope.login = function() {
    $scope.modal.show();
  };
  //  doLogin(): Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  //---------
  //  Purpose: Facebook Login
  //  Functions:  fbLogin(), fbLogout(), isLogin()
  //---------

  // Getting the status of user account. Display user name and logout button when user is logged in
  var authData = fireusers_root.getAuth();
  if(authData){
    $scope.userName = authData.facebook.displayName;
    $scope.login_logout = "Logout"
  }
  else{
    $scope.login_logout = "Login"
  }
  //  fbLogin(): Attempt to login to user's FB account. Activate when click login button on login page
  //    Case1-> Failed if error of loading data/ getting authorization
  //    Case2-> Login if get authData successfully
  $scope.fbLogin = function() {
    $scope.closeLogin();
    fireusers_root.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        authData = fireusers_root.getAuth();
        console.log("-----------------");
        console.log(authData);
        $scope.userName = authData.facebook.displayName;
        $state.go('app.user',{}, {reload:false});
        $window.location.reload(true);
        $scope.$apply();
      }
    }, {
      remember: "sessionOnly",
      scope: "email, user_likes"
    });
  };
  //  fbLogout(): Logout from user's FB account. Activate when click logout button on login page
  $scope.fbLogout = function(){
    fireusers_root.unauth();
    $window.location.reload(true);
    $state.go('app.home');
  };
  //  isLogin(): Check whether the user is loged in to the account ro not.
  $scope.isLogin = function(){
    return fireusers_root.getAuth();
  };

  console.log("app controller works");  // checking whether app controller file is loaded sucessfully or not
}]);
