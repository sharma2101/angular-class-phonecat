/* global chai */

if(chai && chai.Assertion){
  chai.Assertion.addMethod('equalData', function(expected){
    this.assert(angular.equals(this._obj, expected));
  });
}
