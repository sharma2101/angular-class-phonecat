PhoneSnippetController.$inject = [
  '$scope'
];
function PhoneSnippetController($scope){
  $scope.showBigImage = false;
  $scope.resize = function(){
    $scope.showBigImage = !$scope.showBigImage;
  };
}

angular.module('phonecat.phones.snippet.controller', [

]).controller('PhoneSnippetController', PhoneSnippetController);
