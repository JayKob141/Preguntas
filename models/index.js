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

module.exports.User = sequelize.define('Usuarios', {
  idUsuario: Sequelize.INTEGER,
  nickname: Sequelize.STRING,
  password: Sequelize.STRING,
  fecha_registro: Sequelize.DATEONLY
});
