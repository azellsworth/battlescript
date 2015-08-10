angular.module('battlescript.services', [])

// Main Factory
.factory('Main',function ($http){
  return {}
})

// Auth factory
.factory('Auth', function ($http, $location, $window) {
  
  // signs users in
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      $window.localStorage.setItem('username', resp.config.data.username);
      return resp.data.token;
    });
  };

  // signs users up
  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      $window.localStorage.setItem('username', resp.config.data.username);
      return resp.data.token;
    });
  };

  // helper to check if users are authorized
  var isAuth = function () {
    return !!$window.localStorage.getItem('battlepro');
  };

  // signs out users
  var signout = function () {
    window.username = undefined;
    $window.localStorage.removeItem('battlepro');
    $location.path('/signin');
  };

  // return all funcs as an obj
  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
})

// The duels factory
.factory('Duel', function($http) {

  // gets a duel
  var getDuel = function() {
    return $http({
      method: 'GET',
      url: '/api/duels/getduel',
    }).then(function(res) {
      return res.data;
    });
  };

  // return all funcs as an obj
  return {
    getDuel: getDuel
  }
})

// The search factory (if we need it)
.factory('Search', function ($http){
  
  // gets results
  var getResults = function(searchData, callback){
    $http({
      method: 'POST',
      url: '/api/search',
      data: searchData
    })
    .then(function(resp){
      console.log("got respons");
      callback(resp.data);
    });
  };

  // return all funcs as an obj
  return {
    getResults: getResults
  }

})

// The preference factory (if we need it)
.factory('Preference', function ($http){
  
  // save preferences
  var save = function(preferences, callback){
    $http({
      method: 'POST',
      url: '/api/search/preferences',
      data: preferences
    })
    .then(function(resp){
      console.log("GOT RESPONSE FROM SERVER!")
      callback(resp.data);
    });
  };

  return {
    save: save
  }

});
