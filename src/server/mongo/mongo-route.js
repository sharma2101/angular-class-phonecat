/**
 * Copyright 2013 Ricard Aspeljung via crest
 */

var mongo = require('mongodb'),
  MongoClient = mongo.MongoClient,
  ObjectID = mongo.ObjectID,
  // BSON = mongo.BSONPure,
  debug = require('debug')('phonecat:mongo'),
  util = require('./util').util;

debug('rest.js is loaded');


/**
 * Query
 */

module.exports = function(server, config){

  var mongo_root_path = config.find('mongo.rest.path', '/api');


  server.all(mongo_root_path + '/*', function (request, response, next) {
    if(request.cookies.session === '1234')
    {
      next();
    } else{
      response.status(403).send({notLoggedIn:1});
    }
  });

  // how express works- li vs session in angular
  var connection = {
    username: config.find('mongo.username', 'MONGO_USERNAME', ''),
    password: config.find('mongo.username', 'MONGO_PASSWORD', ''),
    host: config.find('mongo.username', 'MONGO_HOST', config.find('hostname')),
    port: config.find('mongo.username', 'MONGO_PORT', 27017)
  };

  function handleGet(req, res, next) {
    debug('GET-request recieved');
    var db = req.params.db || 'phonecat';
    var collection = req.params.collection || 'phones';
    var query;

    // Providing an id overwrites giving a query in the URL
    if (req.params.id) {
      query = {
        '_id': new ObjectID(req.params.id)
      };
    } else {
      query = req.query.query ? util.parseJSON(req.query.query, next) : {};
    }

    var options = req.params.options || {};

    var test = ['limit', 'sort', 'fields', 'skip', 'hint', 'explain', 'snapshot', 'timeout'];

    var v;
    for (v in req.query) {
      if (test.indexOf(v) !== -1) {
        options[v] = req.query[v];
      }
    }

    if (req.body.length && req.body.length > 0 && req.body.split) {
      var body = req.body.split(',');
      if (body[0]) {
        query = util.parseJSON(body[0], next);
      }
      if (body[1]) {
        options = util.parseJSON(body[1], next);
      }
    }

    debug('Query is ' + JSON.stringify(query));

    MongoClient.connect(util.connectionURL(db, connection), function (err, db) {
      if(err){return next(err);}
      db.collection(collection, function (err, collection) {
        if(err){return next(err);}
        collection.find(query, options, function (err, cursor) {
          if(err){return next(err);}
          cursor.toArray(function (err, docs) {
            if(err){return next(err);}
            var result = [];
            res.set('content-type', 'application/json; charset=utf-8');
            if (req.params.id) {
              if (docs.length > 0) {
                result = util.flavorize(docs[0], 'out');
                res.send(result);
              } else {
                res.status(404).send('');
              }
            } else {
              if(docs.length === 1){
                res.send(util.flavorize(docs[0], 'out'));
              } else {
                docs.forEach(function (doc) {
                  result.push(util.flavorize(doc, 'out'));
                });
                res.send(result);
              }
            }
            db.close();
          });
        });
      });
    });
  }

  server.get(mongo_root_path + '/:db/:collection/:id?', handleGet);
  server.get(mongo_root_path + '/:db/:collection', handleGet);

  /**
   * Insert
   */
  server.post(mongo_root_path + '/:db/:collection', function (req, res, next) {
    debug('POST-request recieved');
    if (req.params) {
      MongoClient.connect(util.connectionURL(req.params.db, connection), function (err, db) {
        if(err){return next(err);}
        var collection = db.collection(req.params.collection);
        // We only support inserting one document at a time
        collection.insert(req.body, function (err, docs) {
          res.header('Location', '/' + req.params.db + '/' + req.params.collection + '/' + docs.ops[0]._id.toHexString());
          res.set('content-type', 'application/json; charset=utf-8');
          res.status(201).json({'ok': 1});
          db.close();
        });
      });
    } else {
      res.set('content-type', 'application/json; charset=utf-8');
      res.json(200, {'ok': 0});
    }
  });

  /**
   * Update
   */
  server.put(mongo_root_path + '/:db/:collection/:id', function (req, res, next) {
    debug('PUT-request recieved');
    var spec = {
      '_id': new ObjectID(req.params.id)
    };
    MongoClient.connect(util.connectionURL(req.params.db, connection), function (err, db) {
      if(err){return next(err);}
      db.collection(req.params.collection, function (err, collection) {
        if(err){return next(err);}
        collection.update(spec, req.body, true, function (err) {
          if(err){return next(err);}
          res.set('content-type', 'application/json; charset=utf-8');
          res.json({'ok': 1});
        });
      });
    });
  });

  /**
   * Delete
   */
  server.delete(mongo_root_path + '/:db/:collection/:id', function (req, res, next) {
    debug('DELETE-request recieved');
    var spec = {
      '_id': new ObjectID(req.params.id)
    };
    MongoClient.connect(util.connectionURL(req.params.db, connection), function (err, db) {
      if(err){return next(err);}
      db.collection(req.params.collection, function (err, collection) {
        collection.remove(spec, function (err) {
          if(err){return next(err);}
          res.set('content-type', 'application/json; charset=utf-8');
          res.json({'ok': 1});
          db.close();
        });
      });
    });
  });
};
