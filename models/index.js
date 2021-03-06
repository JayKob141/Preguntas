var Sequelize = require('sequelize');
var sequelize = new Sequelize( process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS,  {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  looging:false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

//TODO: Autoincrement idUsuario
var User = sequelize.define('Usuarios', {
  idUsuario: { type: Sequelize.INTEGER, primaryKey: true },
  nickname: Sequelize.STRING,
  password: Sequelize.STRING,
  fecha_registro: Sequelize.INTEGER, //TODO: CAMBIAR A TIMESTAM
},{
  timestamps: false,
  freezeTableName: true,
  tableName: 'Usuarios',
});


var Pregunta = sequelize.define('Preguntas', {
	idPregunta: { type: Sequelize.INTEGER, primaryKey: true ,autoIncrement: true},
  pregunta: Sequelize.STRING,
  fecha: Sequelize.INTEGER, //TODO: CAMBIAR A TIMESTAMP
  userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuarios',
          key: 'idUsuario'
        }
      }
},{
  timestamps: false,
  freezeTableName: true,
  tableName: 'Preguntas',
});

var OpcionPregunta = sequelize.define('OpcionesPreguntas', {
	idOpcion: { type: Sequelize.INTEGER, primaryKey: true , autoIncrement: true},
  descripcion: Sequelize.STRING,
  esCorrecta: Sequelize.INTEGER,
  preguntaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Pregunta',
          key: 'idPregunta'
        }
      }
},{
  timestamps: false,
  freezeTableName: true,
  tableName: 'OpcionesPreguntas',
});

Pregunta.belongsTo(User, {foreignKey:'userId'});
User.hasMany(Pregunta, {foreignKey:'userId'});
OpcionPregunta.belongsTo(Pregunta,{foreignKey:'preguntaId'});
Pregunta.hasMany(OpcionPregunta,{foreignKey:'preguntaId'});

module.exports.User = User;
module.exports.Pregunta = Pregunta;
module.exports.OpcionPregunta = OpcionPregunta;
module.exports.sequelize = sequelize;
