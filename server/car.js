const Sequelize = require('sequelize');
const db  = require('./db_connection');


const Car = db.define('car', {
    mark: {
        type: Sequelize.STRING
    },
    model: {
        type: Sequelize.STRING
    },
    year: {
        type: Sequelize.STRING
    }
});

Car.sync();

module.exports = Car;