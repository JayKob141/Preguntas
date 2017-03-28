require('dotenv').config();
var test = require('tape')
var User = require('../models').User;
var Pregunta = require('../models').Pregunta;

test('De todos los usuarios: Sus preguntas', function(t) {
	User.findAll({
  		attributes: ['nickname'],
			include: [Pregunta]
	}).then( function(nicknames) {
		console.log(JSON.stringify(nicknames));
		t.end();
	}).catch(function(err){
		 t.end(err);
	});

});

test('Todas las Preguntas con usuario', function(t) {
	Pregunta.findAll({
  		attributes: ['pregunta'],
			include: [User],
			raw : true
	}).then( function(preguntas) {
		console.log(preguntas);
		t.end();
	}).catch(function(err){
		t.end(err);
	});;

});
