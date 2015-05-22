PhoneDetailController.$inject = [
  '$scope',
  '$routeParams',
  'Phone'
];
function PhoneDetailController($scope, $routeParams, Phone) {
  $scope.phone = Phone.get(
    {query: {"phoneId": $routeParams.phoneId}}, function(phone) {
    $scope.mainImageUrl = phone.images[0];

    var search = phone.name.split(' ')[0];

    $scope.related = Phone.query({
      query: {"$text": {"$search": search}}
    });
  });

  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
  };
}

angular.module('phonecat.phones.detail.controller', [
  'ngRoute',
  'phonecat.phones.service'
]).controller('PhoneDetailController', PhoneDetailController);
