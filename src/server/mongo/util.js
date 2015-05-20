/**
 * Copyright 2013 Ricard Aspeljung via crest
 */

function InvalidArgumentError(message){
  Error.call(this, message);
}

var config = {flavor: 'normal'};
module.exports.util = {
  /*
   * flavorize - Changes JSON based on flavor in configuration
   */
  flavorize: function (doc, direction) {
    if (direction === 'in') {
      if (config.flavor === 'normal') {
        delete doc.id;
      }
    } else {
      if (config.flavor === 'normal') {
        var id = doc._id.toHexString();
        delete doc._id;
        doc.id = id;
      } else {
        doc._id = doc._id.toHexString();
      }
    }
    return doc;
  },
  cleanParams: function (params) {
    var clean = JSON.parse(JSON.stringify(params));
    if (clean.id) {
      delete clean.id;
    }
    if (clean.db) {
      delete clean.db;
    }
    if (clean.collection) {
      delete clean.collection;
    }
    return clean;
  },
  parseJSON: function (data, next) {
    var json;
    try {
      json = JSON.parse(data);
    } catch (e) {
      return next(new InvalidArgumentError('Not valid JSON data.'));
    }
    return json;
  },
  connectionURL: function (dbName, config) {
    var auth = '';
    if (config.username && config.password) {
      auth = config.username + ':' + config.password + '@';
    }
    return 'mongodb://' + auth + config.host + ':' + config.port + '/' + dbName; // + '?maxPoolSize=20';
  }
};
