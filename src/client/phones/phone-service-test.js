'use strict';

describe('Phonecat Services', function() {

  describe('Phone service', function(){
    // load modules
    beforeEach(module('phonecat.phones.service'));

    // Test service availability
    it('check the existence of Phone factory', inject(function(Phone) {
      expect(Phone).toBeDefined();
    }));
  });
});
