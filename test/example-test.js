require('dotenv').config();
var test = require('tape')
var models = require('../models');
var User = models.User;
var Pregunta = models.Pregunta;
var OpcionPregunta = models.OpcionPregunta;

test('Todos los usuarios junto con sus preguntas', function(t) {
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

Pregunta.findAll({
test('Todas las Preguntas con su usuario y sus opciones', function(t) {
  		attributes: ['pregunta'],
			include: [{model:User}, {model:OpcionPregunta}]
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
