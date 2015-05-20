angular.module('phonecat.phones.service.mock', [

]).value('PhoneListData', {
  '/api/phonecat/phones': [{name: 'Nexus S'}, {name: 'Motorola DROID'}],
  '/api/phonecat/phones/xyz': {
    name: 'phone xyz',
        images: ['image/url1.png', 'image/url2.png']
  }
})
.factory('PhoneListMock', function(PhoneListData){
  return function($httpBackend){
    for(var path in PhoneListData){
      $httpBackend.whenGET(path).respond(PhoneListData[path]);
    }
  };
})
;
