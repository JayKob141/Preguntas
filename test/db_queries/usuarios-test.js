require('dotenv').config();
var test = require('tape')
var models = require('../../models');
var User = models.User;
var Pregunta = models.Pregunta;
var OpcionPregunta = models.OpcionPregunta;

test('Busca un usuario por id junto con sus preguntas', function(t) {
	User.findOne({
		  where:{idUsuario:1},
			include: [Pregunta]
	}).then( function(nicknames) {
		console.log(JSON.stringify(nicknames));
		t.end();
	}).catch(function(err){
		 t.end(err);
	});
});
