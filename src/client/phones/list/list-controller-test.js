describe('PhoneCat controllers', function() {
  describe('PhoneListController', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(module('phonecat.phones.list.controller'));
    beforeEach(module('phonecat.phones.service.mock'));
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, PhoneListMock) {
      $httpBackend = _$httpBackend_;
      new PhoneListMock($httpBackend);

      scope = $rootScope.$new();
      ctrl = $controller('PhoneListController', {$scope: scope});
    }));

    it('should create "phones" model with 2 phones fetched from xhr', function() {
      scope.phones.should.equalData([]);
      $httpBackend.flush();
      scope.phones.should.equalData( [{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
    });

    it('should set the default value of orderProp model', function() {
      scope.orderProp.should.equal('age');
    });
  });
});
