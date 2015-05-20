'use strict';

describe('PhoneCat controllers', function() {

  beforeEach(module('phonecat.phones.snippet.controller'));

  describe('PhoneSnippetController', function(){
    var scope, ctrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('PhoneSnippetController', {$scope: scope});
    }));

    it('defaults to a small image', function(){
      expect(scope.showBigImage).toBe(false);
    });

    it('toggles image size', function(){
      scope.resize();
      expect(scope.showBigImage).toBe(true);
      scope.resize();
      expect(scope.showBigImage).toBe(false);
      scope.resize();
      expect(scope.showBigImage).toBe(true);
    });
  });
});
