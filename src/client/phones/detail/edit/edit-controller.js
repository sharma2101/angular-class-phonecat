angular.module('phonecat.phones.detail.edit.controller',[
  'ngRoute',
  'phonecat.phones.service',

]).controller('PhoneEditController',function ($scope, Phone, $routeParams) {
  $scope.phone = Phone.get({query: {"phoneId": $routeParams.phoneId}});

  $scope.savePhone = function () {
    $scope.phone.$save();
  };
});
