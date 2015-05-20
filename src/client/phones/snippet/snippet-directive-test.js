describe('Phonecat directives', function() {
  describe('phoneSnippet directive', function(){
    beforeEach(module('phonecat.phones.snippet.directive'));

    it('renders a phone snippet view', inject(function( $compile, $rootScope ){
      // Set up - declaring data
      var $scope = $rootScope.$new();
      var MOCK_DATA = { imageUrl: 'images/xyz.jpg' };
      $scope.P = MOCK_DATA;

      var template = '<div phone-snippet="P" />';

      // Act - compile the directive
      var $element = angular.element(template);
      $compile($element)($scope);
      $scope.$digest();

      // Assert - test the element
      $element.find('img').attr('src').should.equal(MOCK_DATA.imageUrl);
    }));
  });
});
