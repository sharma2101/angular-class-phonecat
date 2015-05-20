PhoneService.$inject = ['$resource'];
function PhoneService($resource){
  return $resource('/api/phonecat/phones/:phoneId');
}

angular.module('phonecat.phones.service', [
  'ngResource'
])
.factory('Phone', PhoneService)
;
