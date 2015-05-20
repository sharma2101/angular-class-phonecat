angular.module('phonecat', [
  'phonecat.phones.list',
  'phonecat.phones.detail',
  'phonecat.checkmark.filter'
]).config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/phones', {
    templateUrl: 'phones/list',
    controller: 'PhoneListController'
  }).when('/phones/:phoneId', {
    templateUrl: 'phones/detail',
    controller: 'PhoneDetailController'
  }).otherwise({
    redirectTo: '/phones'
  });
}]);
