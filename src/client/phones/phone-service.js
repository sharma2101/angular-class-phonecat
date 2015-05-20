'use strict';

PhoneService.$inject = ['$resource'];
function PhoneService($resource){
  return $resource('phones/:phoneId.json', {}, {
    query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
  });
}

angular.module('phonecat.phones.service', [
  'ngResource'
]).factory('Phone', PhoneService);
