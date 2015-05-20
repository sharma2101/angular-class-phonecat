'use strict';

describe('Phonecat directives', function() {
  describe('phoneSnippet directive', function(){
    beforeEach(module('phonecat.phones.snippet.directive'));

    it('renders a phone snippet view', inject(function(
      $compile, $rootScope, $httpBackend
    ){
      $httpBackend.expectGET('partials/phone-snippet.html')
      .respond('<img ng-src="{{phone.imageUrl}}" >');

      // Set up - declaring data
      var $scope = $rootScope.$new();
      var MOCK_DATA = { imageUrl: 'images/xyz.jpg' };
      $scope.P = MOCK_DATA;

      var template = '<div phone-snippet="P" />';

      // Act - compile the directive
      var $element = angular.element(template);
      $compile($element)($scope);
      $httpBackend.flush();
      $scope.$digest();

      // Assert - test the element
      expect($element.find('img').attr('src')).toBe(MOCK_DATA.imageUrl);
    }));
  })
});
