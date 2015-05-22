angular.module('phonecat.authentication.controller', [ 'ngMessages',
  'phonecat.authentication.service',
  'phonecat.authentication.passwordValidationDirective'
]).controller('AuthenticationController', function ($scope, AuthenticationService) {

  $scope.username = "";
  $scope.password = "";
  $scope.errorLoggingIn = false;

  $scope.login = function () {

    if($scope.loginForm.$invalid){
      return;
    }
    $scope.errorLoggingIn = false;
    AuthenticationService.login(
      $scope.username, $scope.password
    ).error(function () {
      $scope.errorLoggingIn = true;
    });
  };
}).controller('LogoutController', function ($scope, AuthenticationService){
  $scope.logout = function () {
    AuthenticationService.logout();
};

$scope.isLoggedIn = function () {
  return AuthenticationService.isLoggedIn();
};


});
