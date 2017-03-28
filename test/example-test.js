require('dotenv').config();
var test = require('tape')
var models = require('../models');
var User = models.User;
var Pregunta = models.Pregunta;

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
			include: [User]
	}).then( function(preguntas) {
		//for(var p in preguntas)
			//console.log(p.getDataValue('pregunta'));
			preguntas.forEach(function(item){
				console.log(item.get({plain:true}));
			});
		//console.log(preguntas);
		t.end();
	}).catch(function(err){
		t.end(err);
	});

});
