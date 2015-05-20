describe('PhoneCat controllers', function() {

  beforeEach(module('phonecat.phones.snippet.controller'));

  describe('PhoneSnippetController', function(){
    var scope, ctrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('PhoneSnippetController', {$scope: scope});
    }));

    it('defaults to a small image', function(){
      scope.showBigImage.should.equal(false);
    });

    it('toggles image size', function(){
      scope.resize();
      scope.showBigImage.should.equal(true);
      scope.resize();
      scope.showBigImage.should.equal(false);
      scope.resize();
      scope.showBigImage.should.equal(true);
    });
  });
});
