var getJsonCleaned = require('../');
var _ = require('lodash');
var fs = require('fs');

var docs = [{
  "id" : "SOME_ID",
  "title" : "SOME_TITLE",
  "description" : "SOME_DESCRIPTION",
  "customer" : {
    "role" : "SOME_ROLE",
    "contact" : {
      "name" : "SOME_NAME",
      "nickname" : "",
      "kind" : "1",
      "addresses" : [],
      "telephones" : null,
      "emails" : null,
      "webSites" : null,
      "documents" : { },
      "job" : "",
      "code" : "",
      "comment" : "",
      "birthDay" : "",
      "birthMonth" : "",
      "birthYear" : "",
      "maritalStatus" : "",
      "nationality" : "",
      "id" : "",
      "contact" : null,
      "fathersName" : "",
      "mothersName" : "",
      "homeland" : ""
    }
  },
  "createDate" : "2014-06-01 00:00:00.0",
  "amount" : 0.0,
  "observation" : ""
}];

var writer = function(data, path, fn) {
	fs.writeFile(`${path}.json`, JSON.stringify(data), 'utf-8', function(res, err) {
		if(fn)
			fn(res, err);
	});
}

writer(docs, 'input');
getJsonCleaned(docs, function(err, res) {
	console.log("\n\nDONE");
	writer(res, 'response');
});




