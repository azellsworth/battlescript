// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('battlescript.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token, username) {
        $window.localStorage.setItem('battlepro', token);
        $location.path('/');
      })
      .catch(function (error) {
        $scope.message = "Invalid Username or Password";
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token, username) {
        $window.localStorage.setItem('battlepro', token);
        $location.path('/');
      })
      .catch(function (error) {
        $scope.message = "Username Already Taken";
        console.error(error);
      });
  };

  $scope.logout = function() {
    $window.localStorage.removeItem('battlepro');
    $location.path('/signin');
  }
});
