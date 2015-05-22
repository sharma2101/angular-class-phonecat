angular.module('phonecat', [
  'phonecat.phones.list',
  'phonecat.phones.detail',
  'phonecat.checkmark.filter',
  'phonecat.phones.detail.edit',
  'phonecat.authentication'
]).config(['$routeProvider', function($routeProvider){
  var loginResolve = {
    isLoggedIn: function (AuthenticationService, $q) {
      return $q(function (resolve, reject) {
        if( AuthenticationService.isLoggedIn()){
          resolve(true);
        }else{
          reject('Not Authenticated');
        }
      });

    }
  };

  $routeProvider.when('/phones', {
    templateUrl: 'phones/list',
    controller: 'PhoneListController',
    resolve: loginResolve
  }).when('/phones/:phoneId', {
    templateUrl: 'phones/detail',
    controller: 'PhoneDetailController',
    resolve: loginResolve
  }).when('/phones/:phoneId/edit',{
    templateUrl: 'phones/detail/edit',
    controller: 'PhoneEditController',
    resolve: loginResolve
  }).when('/login',{
    templateUrl: 'authentication',
    controller: 'AuthenticationController'
  })
  .otherwise({
    redirectTo: '/phones'
  });
}])
.run(function ($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function () {
    $location.url('/login');
  });
});
