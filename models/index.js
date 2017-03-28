var Sequelize = require('sequelize');
var sequelize = new Sequelize( process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS,  {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var User = sequelize.define('Usuarios', {
  idUsuario: { type: Sequelize.INTEGER, primaryKey: true },
  nickname: Sequelize.STRING,
  password: Sequelize.STRING,
  fecha_registro: Sequelize.DATEONLY
},{
  timestamps: false,
  freezeTableName: true,
  tableName: 'Usuarios',
});


var Pregunta = sequelize.define('Preguntas', {
  idPregunta: { type: Sequelize.INTEGER, primaryKey: true },
  pregunta: Sequelize.STRING,
  fecha: Sequelize.DATEONLY,
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

Pregunta.belongsTo(User, {foreignKey:'userId'});
User.hasMany(Pregunta, {foreignKey:'userId'});

module.exports.User = User;
module.exports.Pregunta = Pregunta;
