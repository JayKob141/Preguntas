require('dotenv').config();
var test = require('tape')
var User = require('../models').User;

test('Test de prueba', function(t) {
	User.findAll({
  		attributes: ['nickname'],
			raw : true
	}).then( function(nicknames) {
		console.log(nicknames);
	});

	t.end();
});
