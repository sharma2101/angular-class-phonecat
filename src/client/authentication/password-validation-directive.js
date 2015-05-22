angular.module('phonecat.authentication.passwordValidationDirective', [

]).directive('passwordValidate', function(){
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function (value) {

          ngModel.$setValidity('passwordValid', value === "password" );
          return value;
      });
    }
  }
});
