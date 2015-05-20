'use strict';

PhoneDetailController.$inject = [
  '$scope',
  '$routeParams',
  'Phone'
];
function PhoneDetailController($scope, $routeParams, Phone) {
  $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
    $scope.mainImageUrl = phone.images[0];

    var search = phone.name.split(' ')[0];
    Phone.query(function(phones){
        $scope.related = phones.filter(function(p){
          return p.name.indexOf(search) == 0;
        });
    });
  });

  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
  }
}

angular.module('phonecat.phones.detail.controller', [
  'ngRoute',
  'phonecat.phones.service'
]).controller('PhoneDetailController', PhoneDetailController);
