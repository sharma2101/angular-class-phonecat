var assert = require('assert');

var objectId;

describe('Testing crest', function () {
  var request;

  beforeEach(function(){
    request = superroute(require('./mongo-route'));
  });

  it('Should create a simple document', function (done) {
    request
      .post('/api/tests/tests')
      .type('application/json')
      .send({'test' : 'create'})
      .expect(201)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        assert.deepEqual(res.body, {'ok': 1});
        var location = res.header.location.split('/').slice(1);
        assert.equal(location[0], 'tests');
        assert.equal(location[1], 'tests');
        assert.equal(location[2].length, 24);
        objectId = location[2];
        done();
      });
  });

  it('Should check that document exists', function (done) {
    request
      .get('/api/tests/tests/' + objectId)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        assert.deepEqual(res.body, {
          'test': 'create',
          'id': objectId
        });
        done();
      });
  });

  it('Should update a document', function (done) {
    request
      .put('/api/tests/tests/' + objectId)
      .type('application/json')
      .send({'test' : 'updated'})
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        assert.deepEqual(res.body, {'ok': 1});
        done();
      });
  });

  it('Should check that document is updated', function (done) {
    request
      .get('/api/tests/tests/' + objectId)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        assert.deepEqual(res.body, {
          'test': 'updated',
          'id': objectId
        });
        done();
      });
  });

  it('Should delete a document', function (done) {
    request
      .del('/api/tests/tests/' + objectId)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        assert.deepEqual(res.body, {'ok': 1});
        done();
      });
  });

  it('Should check that document is deleted', function (done) {
    request
      .get('/api/tests/tests/' + objectId)
      .expect(404, done);
  });

});
