const Sequelize = require("sequelize");

const connection = new Sequelize('cars', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

module.exports = connection;

