describe('PhoneCat controllers', function() {
  beforeEach(module('phonecat.phones.detail.controller'));
  beforeEach(module('phonecat.phones.service.mock'));

  describe('PhoneDetailCtrl', function(){
    var scope, $httpBackend, ctrl;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $routeParams, PhoneListMock) {
      $httpBackend = _$httpBackend_;
      new PhoneListMock($httpBackend);

      $routeParams.phoneId = 'xyz';
      scope = $rootScope.$new();
      ctrl = $controller('PhoneDetailController', {$scope: scope});
    }));


    it('should fetch phone detail', function() {
      scope.phone.should.equalData({});
      $httpBackend.flush();

      scope.phone.should.equalData({
        name: 'phone xyz',
            images: ['image/url1.png', 'image/url2.png']
      });
    });
  });
});
