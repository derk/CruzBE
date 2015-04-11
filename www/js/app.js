// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

//---------
//  Purpose: Define each state of this application.
//  States: app, home, addbook, user, edit
//  Details: Each state has a template and a controller
//---------
angular.module('starter', ['ionic', 'starter.controllers', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: "AppCtrl"
  })


  // Home Page
  .state('app.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: "templates/home/home.html",
        controller: "homeCtrl"
      }
    }
  })

  // Add Page
  .state('app.addBook', {
    url: "/addBook",
    views: {
      'menuContent': {
        templateUrl: "templates/add/addBook.html",
        controller: "addBookCtrl"
      }
    }
  })

  // User Page
  .state('app.user', {
    url: "/user",
    views: {
      'menuContent': {
        templateUrl: "templates/user/user.html",
        controller: "userCtrl"
      }
    }
  })

  // User Page - edit
  .state('app.edit', {
    url: "/edit/:data_key",
    views: {
      'menuContent': {
        templateUrl: "templates/edit/edit.html",
        controller: "editCtrl"
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
})
.constant('FirebaseRoot', 'https://textbooktest.firebaseio.com/');
