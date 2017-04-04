require('dotenv').config();
var test = require('tape')
var models = require('../../models');
var User = models.User;
var Pregunta = models.Pregunta;
var OpcionPregunta = models.OpcionPregunta;

var nicknameUser = 'john';

test('Inserta un usuario', function(t) {
  var newUser = User.build(
    {
    nickname: nicknameUser,
    password: nicknameUser,
    fecha_registro: new Date()
    }
  );

  newUser.save().then(function() {
      t.end();
  }).catch(function(error) {
      t.end(err);
  });

});

test('Busca un usuario por nickname y lo borra', function(t) {
	User.findOne({
		  where:{nickname:nicknameUser},
	}).then( function(user) {
    user.destroy().then(function() {
        t.end();
    }).catch(function(error) {
        t.end(err);
    });
	}).catch(function(err){
		 t.end(err);
	});
});
