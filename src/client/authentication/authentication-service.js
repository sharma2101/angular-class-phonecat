angular.module('phonecat.authentication.service',[ 'ngCookies'

]).factory('AuthenticationService', function ($http, $location, $cookies) {
  return {
    login: function (un, pw) {
      console.log('Authentication as %s', un);
      return $http.post('/login', {username: un, password: pw})
      .success(function () {
        $location.url('/');
      });
    },
    logout: function () {
    return  $http.post('/logout').success(function () {
        $location.url('/login');
      })
    },
    isLoggedIn: function () {
      return $cookies['li'] === '1';
      }
    }

});
