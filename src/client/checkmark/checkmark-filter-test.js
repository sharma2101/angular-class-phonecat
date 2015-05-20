'use strict';

describe('Phonecat filters', function() {

  beforeEach(module('phonecat.checkmark.filter'));

  describe('checkmark', function() {
    it('should convert boolean values to unicode checkmark or cross',
        inject(function($filter) {
      expect($filter('checkmark')(true)).toBe('\u2713');
      expect($filter('checkmark')(false)).toBe('\u2718');
    }));
  });
});
