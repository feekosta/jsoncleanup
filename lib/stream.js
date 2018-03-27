var es = require('event-stream');
var _ = require('lodash');

module.exports = function parse() {

  const documents = [];

  var getType = function(value) {
    var T;
    if (_.has(value, '_bsontype')) {
      T = value._bsontype;
    } else {
      T = Object.prototype.toString.call(value).replace(/\[object (\w+)\]/, '$1');
    }
    if (T === 'Object') {
      T = 'Document';
    }
    return T;
  };

  var workOnValue = function(path, value, obj) {
    
    var typeName = getType(value);

    if (typeName === 'Null' || typeName === 'Undefined') {
      
      delete obj[path];

    } else if (typeName === 'Array') {
      
      value.forEach((item) => {
        workOnValue(path, item, value);
      })

      if(value.length === 0)
        delete obj[path];

    } else if (typeName === 'Document') {
      
      Object.keys(value).forEach((key) => {
        workOnField(key, value[key], value);
      });

      if (Object.keys(value).length === 0)
        delete obj[path]

    } else if (typeName === 'String' && value.replace(/ /g, "").length === 0){
      delete obj[path];
    }

  };

  var workOnField = function(path, value, obj) {
    workOnValue(path, value, obj);
  };

  var parser = es.through(function write(obj) {
    Object.keys(obj).forEach((key) => {
      workOnField(key, obj[key], obj);
    });
    documents.push(obj);
    this.emit('progress', obj);
  }, function end() {
    this.emit('data', documents);
    this.emit('end');
  });

  parser.on('close', function() {
    this.destroy();
  });

  return parser;
};
