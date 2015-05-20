PhoneListController.$inject = ['$scope', 'Phone'];
function PhoneListController($scope, Phone) {
  $scope.phones = Phone.query();
  $scope.orderProp = 'age';
}

angular.module('phonecat.phones.list.controller', [
  'phonecat.phones.service'
]).controller('PhoneListController', PhoneListController);
