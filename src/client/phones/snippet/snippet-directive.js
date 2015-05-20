'use strict';

/* Directives */

angular.module('phonecat.phones.snippet.directive', [
  'phonecat.phones.snippet.controller',
  'phones.snippet.template'
]).directive('phoneSnippet', function(){
  return {
    restrict: 'A',
    scope: {
      phone: '=phoneSnippet'
    },
    templateUrl: 'phones/snippet',
    controller: 'PhoneSnippetController'
  };
});
