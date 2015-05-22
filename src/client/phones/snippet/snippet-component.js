function PhoneSnippetController() {
  this.showBigImage  = false;

}

PhoneSnippetController.prototype = Object.create({
  resize: function () {
    this.showBigImage = !this.showBigImage;
  }
});

function PhoneSnippet() {
  return {
    restrict: 'A',
    scope: {
      phone: '=phoneSnippet'
    },
    templateUrl: 'phones/snippet',
    controller: 'PhoneSnippetController'
    controllerAs: 'state',
    bindToController: true
  };
}

angular.module('phonecat.phones.snippet.component',[
  'phones.snippet.template'
]).directive('phoneSnippet', PhoneSnippet);


//component = composable template + data
